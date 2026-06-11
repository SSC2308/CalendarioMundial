import { useState, useEffect, useRef } from 'react';
import { COUNTRIES, SPANISH_COUNTRIES, ENGLISH_COUNTRIES } from '../data/broadcasts';
import { getFlagUrl } from '../data/flags';
import ReminderDropdown from './ReminderDropdown';
import { getTeamName } from '../data/teamNames';

const STATUS_LABEL = {
  SCHEDULED: null, TIMED: null,
  IN_PLAY: 'EN VIVO', PAUSED: 'DESCANSO',
  FINISHED: 'Final', POSTPONED: 'Pospuesto', CANCELLED: 'Cancelado',
};


export default function MatchCard({ match, timezone, selectedCountry, autoExpand, reminders }) {
  const [expanded, setExpanded] = useState(autoExpand ?? false);
  const [showReminderMenu, setShowReminderMenu] = useState(false);
  const [notifStatus, setNotifStatus] = useState(() => {
    try { return (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported'; }
    catch { return 'unsupported'; }
  });
  const cardRef = useRef(null);
  const bellRef = useRef(null);

  const { homeTeam, awayTeam, utcDate, status, score, stage, group, venue, referees } = match;
  const isPast = new Date(utcDate) < new Date();

  // Auto-scroll to this card when opened via notification
  useEffect(() => {
    if (autoExpand && cardRef.current) {
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [autoExpand]);

  const date = new Date(utcDate);
  const timeStr = date.toLocaleTimeString('es', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: true });
  const isLive = status === 'IN_PLAY' || status === 'PAUSED';
  const isFinished = status === 'FINISHED';
  const statusLabel = STATUS_LABEL[status];
  const homeScore = score?.fullTime?.home;
  const awayScore = score?.fullTime?.away;
  const myChannels = selectedCountry ? (COUNTRIES[selectedCountry]?.channels ?? []) : [];
  const stageLabel = group ? `Grupo ${group.replace('GROUP_', '')}` : formatStage(stage);

  const hasReminder = reminders?.hasReminder(match.id) ?? false;
  const currentReminder = reminders?.getReminder(match.id);

  async function requestAndSchedule(minutesBefore) {
    setShowReminderMenu(false);
    if (typeof Notification === 'undefined') return;

    let perm = Notification.permission;
    if (perm === 'default') {
      perm = await Notification.requestPermission();
      setNotifStatus(perm);
    }
    if (perm !== 'granted') return;

    reminders.setReminder(match, minutesBefore);
  }

  function cancelReminder(e) {
    e.stopPropagation();
    reminders?.removeReminder(match.id);
  }

  return (
    <div
      ref={cardRef}
      style={{
        borderRadius: 18,
        background: isLive ? 'rgba(52,199,89,0.08)' : 'rgba(255,255,255,0.05)',
        border: autoExpand
          ? '1px solid rgba(212,175,55,0.5)'
          : isLive
            ? '1px solid rgba(52,199,89,0.25)'
            : '0.5px solid rgba(255,255,255,0.08)',
        boxShadow: expanded
          ? '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 2px 12px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* Clickable card body */}
      <div
        style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer' }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Top row: stage | time + bell + chevron */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            {stageLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Bell — left of the time */}
            {!isPast && !isLive && (
              <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                {hasReminder ? (
                  <button
                    ref={bellRef}
                    onClick={cancelReminder}
                    title="Cancelar recordatorio"
                    style={{ padding: '2px 7px', borderRadius: 20, border: 'none', cursor: 'pointer', background: 'rgba(212,175,55,0.18)', color: 'var(--gold)', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    🔔 {currentReminder?.minutesBefore === 0 ? 'inicio' : `${currentReminder?.minutesBefore}m`}
                  </button>
                ) : (
                  <button
                    ref={bellRef}
                    onClick={() => setShowReminderMenu((v) => !v)}
                    title="Recordarme"
                    style={{ width: 24, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    🔔
                  </button>
                )}

                {showReminderMenu && (
                  <ReminderDropdown
                    anchorRef={bellRef}
                    blocked={notifStatus === 'denied'}
                    onSelect={requestAndSchedule}
                    onClose={() => setShowReminderMenu(false)}
                  />
                )}
              </div>
            )}

            {isLive ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: '#34c759' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', boxShadow: '0 0 6px #34c759', animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
                EN VIVO
              </span>
            ) : statusLabel ? (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{statusLabel}</span>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', letterSpacing: -0.2 }}>{timeStr}</span>
            )}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* Teams + Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <TeamSide name={getTeamName(homeTeam?.name)} crest={homeTeam?.crest} align="left" />
          <div style={{ textAlign: 'center', minWidth: 60, flexShrink: 0 }}>
            {isFinished || isLive ? (
              <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--gold)', letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>
                {homeScore ?? 0}–{awayScore ?? 0}
              </span>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.2)' }}>vs</span>
            )}
          </div>
          <TeamSide name={getTeamName(awayTeam?.name)} crest={awayTeam?.crest} align="right" />
        </div>

        {/* My channels */}
        {myChannels.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop: 10, borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
            {myChannels.map((ch) => (
              <span key={ch} style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, background: 'rgba(212,175,55,0.12)', border: '0.5px solid rgba(212,175,55,0.35)', color: 'var(--gold)' }}>
                {ch}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expanded drawer */}
      {expanded && (
        <div
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16, background: 'rgba(0,0,0,0.25)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {(venue || referees?.length > 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
              {venue && <span>📍 {venue}</span>}
              {referees?.[0] && <span>🟨 {referees[0].name}</span>}
            </div>
          )}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', margin: '0 0 10px' }}>
              Canales por país
            </p>
            <ChannelGroup label="🌎 Español" countries={SPANISH_COUNTRIES} selected={selectedCountry} />
            <div style={{ height: 12 }} />
            <ChannelGroup label="🌍 English" countries={ENGLISH_COUNTRIES} selected={selectedCountry} />
          </div>
        </div>
      )}
    </div>
  );
}

function ChannelGroup({ label, countries, selected }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', margin: '0 0 6px', letterSpacing: 0.3 }}>{label}</p>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.07)' }}>
        {countries.map((country, i) => {
          const channels = COUNTRIES[country]?.channels ?? [];
          const isSelected = country === selected;
          return (
            <div key={country} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px',
              background: isSelected ? 'rgba(212,175,55,0.08)' : i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
            }}>
              <span style={{ fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--gold)' : 'rgba(255,255,255,0.35)', minWidth: 110, flexShrink: 0, paddingTop: 1 }}>
                {country}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {channels.map((ch) => (
                  <span key={ch} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 6, background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)', color: isSelected ? 'var(--gold-light)' : 'rgba(255,255,255,0.4)' }}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamSide({ name, crest, align }) {
  const isRight = align === 'right';
  const flagUrl = getFlagUrl(name);
  const [useFallback, setUseFallback] = useState(false);

  const showFlag = flagUrl && !useFallback;
  const imgSrc = showFlag ? flagUrl : (!useFallback && crest ? crest : null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isRight ? 'flex-end' : 'flex-start', gap: 6, minWidth: 0 }}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
          onError={() => setUseFallback(true)}
          style={{
            width: showFlag ? 44 : 36,
            height: showFlag ? 30 : 36,
            objectFit: 'contain',
            borderRadius: showFlag ? 4 : 0,
            boxShadow: showFlag ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
          }}
        />
      ) : (
        <div style={{ width: 44, height: 30, borderRadius: 4, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏳️</div>
      )}
      <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textAlign: isRight ? 'right' : 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%', letterSpacing: -0.2 }}>
        {name ?? 'TBD'}
      </span>
    </div>
  );
}

function formatStage(stage) {
  const map = { GROUP_STAGE: 'Fase de Grupos', ROUND_OF_16: 'Octavos', QUARTER_FINALS: 'Cuartos', SEMI_FINALS: 'Semifinales', THIRD_PLACE: '3er Puesto', FINAL: 'Final' };
  return map[stage] ?? stage ?? '';
}
