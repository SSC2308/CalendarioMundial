import { useBracket } from '../hooks/useBracket';
import { getTeamName } from '../data/teamNames';
import { getFlagUrl } from '../data/flags';

const FLAG_BASE = 'https://play.fifa.com/media/image/bracket_predictor/flags/world_cup_2026';

const ROUND_LABEL = {
  'Last 32': 'Ronda de 32',
  'Last 16': 'Octavos',
  'Quarter-finals': 'Cuartos',
  'Semi-finals': 'Semifinales',
};

// Convierte el placeholder de la BBC en una etiqueta legible en español
function humanizePlaceholder(ph) {
  if (!ph) return 'Por definir';
  let m;
  if ((m = ph.match(/^([A-L])([12])$/)))      return `${m[2]}º Grupo ${m[1]}`;
  if ((m = ph.match(/^([A-L]{2,})3$/)))        return `3º (${m[1].split('').join('/')})`;
  if ((m = ph.match(/^W-32-(\d+)$/)))          return `Ganador R32 · ${m[1]}`;
  if ((m = ph.match(/^W-16-(\d+)$/)))          return `Ganador 8vos · ${m[1]}`;
  if ((m = ph.match(/^W-QF(\d+)$/)))           return `Ganador Cuartos · ${m[1]}`;
  if ((m = ph.match(/^W-SF(\d+)$/)))           return `Ganador Semi · ${m[1]}`;
  if ((m = ph.match(/^L-SF(\d+)$/)))           return `Perdedor Semi · ${m[1]}`;
  return ph;
}

function flagFor(team) {
  const code = team?.name?.code;
  // Código FIFA real (3 letras mayúsculas); los placeholders nunca lo son
  if (code && /^[A-Z]{3}$/.test(code)) return `${FLAG_BASE}/${code}.svg`;
  return getFlagUrl(team?.name?.fullName);
}

function TeamRow({ team }) {
  const ph = team?.knockoutGroupPlaceholder;
  const fullName = team?.name?.fullName;
  const resolved = fullName && fullName !== ph;
  const score = team?.fulltimeScore;
  const pens = team?.penaltyShootoutScore;

  if (!resolved) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '7px 10px' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
          {humanizePlaceholder(ph)}
        </span>
      </div>
    );
  }

  const flag = flagFor(team);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px' }}>
      {flag && <img src={flag} alt="" style={{ width: 20, height: 14, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />}
      <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {getTeamName(fullName)}
      </span>
      {score != null && (
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>
          {score}{pens != null ? ` (${pens})` : ''}
        </span>
      )}
    </div>
  );
}

function MatchCard({ match, timezone }) {
  const ev = match?.event;
  if (!ev) return null;
  const [home, away] = ev.teams ?? [];
  const iso = ev.date?.iso;
  const dateStr = iso
    ? new Date(iso).toLocaleDateString('es', { timeZone: timezone, day: 'numeric', month: 'short' })
    : null;
  const timeStr = iso
    ? new Date(iso).toLocaleTimeString('es', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: true })
    : null;
  const asItStands = ev.statusComment?.value === 'As it stands';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
        color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
        padding: '5px 10px 0', display: 'flex', justifyContent: 'space-between', gap: 6,
      }}>
        <span>{dateStr ? `${dateStr} · ${timeStr}` : ''}</span>
        {asItStands && <span style={{ color: 'rgba(212,175,55,0.5)' }}>proyección</span>}
      </div>
      <TeamRow team={home} />
      <div style={{ height: 0.5, background: 'rgba(255,255,255,0.06)', margin: '0 10px' }} />
      <TeamRow team={away} />
    </div>
  );
}

function Round({ label, matches, timezone }) {
  if (!matches?.length) return null;
  return (
    <section>
      <div style={{
        fontSize: 13, fontWeight: 700, letterSpacing: 0.3,
        color: 'var(--gold)', textTransform: 'uppercase',
        marginBottom: 10, paddingLeft: 4,
      }}>
        {label}
      </div>
      <div className="bracket-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 10,
      }}>
        {matches.map((m, i) => <MatchCard key={m.event?.id ?? i} match={m} timezone={timezone} />)}
      </div>
    </section>
  );
}

export default function Bracket({ timezone }) {
  const { knockout, loading, error } = useBracket();

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Cargando cruces…</p>;
  }
  if (error || !knockout) {
    return <p style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,107,107,0.7)', margin: 0 }}>No se pudieron cargar los cruces.</p>;
  }

  const finalsMatches = [knockout.thirdPlacePlayoff?.match, knockout.final?.match].filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{
        fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0,
        padding: '10px 12px', borderRadius: 10,
        background: 'rgba(212,175,55,0.06)', border: '0.5px solid rgba(212,175,55,0.15)',
      }}>
        ⚡ Cuadro en vivo (BBC). Los cruces marcados como "proyección" se actualizan según cómo va la tabla; se confirman al terminar cada fase.
      </p>

      {(knockout.preFinalRounds ?? []).map((round) => (
        <Round key={round.roundName} label={ROUND_LABEL[round.roundName] ?? round.roundName} matches={round.matches} timezone={timezone} />
      ))}

      <Round label="Final y 3er puesto" matches={finalsMatches} timezone={timezone} />
    </div>
  );
}
