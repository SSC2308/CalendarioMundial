import { useMemo, useState } from 'react';
import MatchCard from './MatchCard';
import GroupStandings from './GroupStandings';

const STAGES = [
  { key: 'all',           label: 'Todos'     },
  { key: 'tabla',         label: 'Tabla'     },
  { key: 'ROUND_OF_32',   label: 'Ronda 32'  },
  { key: 'ROUND_OF_16',   label: 'Octavos'   },
  { key: 'QUARTER_FINALS',label: 'Cuartos'   },
  { key: 'SEMI_FINALS',   label: 'Semis'     },
  { key: 'FINAL',         label: 'Final'     },
];

export default function Calendar({ matches, timezone, selectedCountry, autoExpandId, reminders }) {
  const [stageFilter, setStageFilter] = useState('all');

  const grouped = useMemo(() => {
    if (stageFilter === 'tabla') return {};
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Tab bar — scrollable horizontally on mobile */}
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
      ) : (
        <>
          {days.length === 0 && (
            <p style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
              No hay partidos en esta fase.
            </p>
          )}

          {days.map(([day, dayMatches]) => (
            <section key={day}>
              <div style={{
                fontSize: 13, fontWeight: 600, letterSpacing: 0.1,
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: 10,
                paddingLeft: 4,
              }}>
                {day}
              </div>
              <div style={{
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
    </div>
  );
}
