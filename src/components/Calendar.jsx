import { useMemo, useState } from 'react';
import MatchCard from './MatchCard';
import GroupStandings from './GroupStandings';
import Bracket from './Bracket';

const STAGES = [
  { key: 'all',           label: 'Todos'     },
  { key: 'tabla',         label: 'Tabla'     },
  { key: 'cruces',        label: 'Cruces'    },
  { key: 'ROUND_OF_32',   label: 'Ronda 32'  },
  { key: 'ROUND_OF_16',   label: 'Octavos'   },
  { key: 'QUARTER_FINALS',label: 'Cuartos'   },
  { key: 'SEMI_FINALS',   label: 'Semis'     },
  { key: 'FINAL',         label: 'Final'     },
];

function todayId(timezone) {
  return new Date().toLocaleDateString('es', {
    timeZone: timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function Calendar({ matches, timezone, selectedCountry, autoExpandId, reminders }) {
  const [stageFilter, setStageFilter] = useState('all');

  const grouped = useMemo(() => {
    if (stageFilter === 'tabla' || stageFilter === 'cruces') return {};
    const filtered = stageFilter === 'all'
      ? matches
      : matches.filter((m) => m.stage === stageFilter);
    return filtered.reduce((acc, match) => {
      const dayKey = new Date(match.utcDate).toLocaleDateString('es', {
        timeZone: timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
      if (!acc[dayKey]) acc[dayKey] = [];
      acc[dayKey].push(match);
      return acc;
    }, {});
  }, [matches, stageFilter, timezone]);

  const days = Object.entries(grouped);
  const today = todayId(timezone);
  const hasToday = days.some(([day]) => day === today);

  function scrollToToday() {
    if (stageFilter !== 'all') setStageFilter('all');
    // pequeño delay para que React re-renderice si cambió el filtro
    setTimeout(() => {
      const el = document.getElementById(`day-${today}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: 3,
        gap: 2,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {STAGES.map((s) => {
          const active = stageFilter === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setStageFilter(s.key)}
              style={{
                flexShrink: 0,
                padding: '6px 10px',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: active ? 600 : 400,
                letterSpacing: -0.1,
                background: active ? 'var(--gold)' : 'transparent',
                color: active ? '#000' : 'rgba(255,255,255,0.45)',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {stageFilter === 'tabla' ? (
        <GroupStandings matches={matches} />
      ) : stageFilter === 'cruces' ? (
        <Bracket timezone={timezone} />
      ) : (
        <>
          {days.length === 0 && (
            <p style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
              No hay partidos en esta fase.
            </p>
          )}

          {days.map(([day, dayMatches]) => (
            <section key={day} id={`day-${day}`}>
              <div style={{
                fontSize: 13, fontWeight: 600, letterSpacing: 0.1,
                color: day === today ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: 10,
                paddingLeft: 4,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {day}
                {day === today && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 7px',
                    borderRadius: 20, background: 'var(--gold)', color: '#000',
                    letterSpacing: 0.5,
                  }}>
                    HOY
                  </span>
                )}
              </div>
              <div className="matches-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 10,
                alignItems: 'start',
              }}>
                {dayMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    timezone={timezone}
                    selectedCountry={selectedCountry}
                    autoExpand={match.id === autoExpandId}
                    reminders={reminders}
                  />
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* Floating "Hoy" button */}
      {hasToday && (
        <button
          className="btn-hoy"
          onClick={scrollToToday}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 20,
            zIndex: 100,
            padding: '10px 18px',
            borderRadius: 40,
            border: '0.5px solid rgba(212,175,55,0.4)',
            background: 'rgba(10,8,0,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: 'var(--gold)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 12px rgba(212,175,55,0.15)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.7), 0 0 16px rgba(212,175,55,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6), 0 0 12px rgba(212,175,55,0.15)';
          }}
        >
          ◎ Hoy
        </button>
      )}
    </div>
  );
}
