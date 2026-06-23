import { useMemo } from 'react';
import { getTeamName } from '../data/teamNames';
import { getFlagUrl } from '../data/flags';
import { standingsByLetter, groupStageComplete, thirdPlaceRanking, finishedGroupMatches } from '../data/standings';
import { ROUNDS, assignThirdPlaces } from '../data/bracket';

// Resuelve una referencia de slot a { team, label }
function resolveSlot(ref, ctx) {
  // Ganador / Perdedor de un partido
  if (ref[0] === 'W' || ref[0] === 'L') {
    const verb = ref[0] === 'W' ? 'Ganador' : 'Perdedor';
    return { team: null, label: `${verb} ${ref.slice(1)}` };
  }
  // Mejor tercero entre varios grupos
  if (ref.startsWith('3:')) {
    const letter = ctx.thirdAssignment?.[ctx.matchNo];
    if (letter && ctx.byLetter[letter]?.length >= 3) {
      return { team: ctx.byLetter[letter][2], label: `3º Grupo ${letter}` };
    }
    return { team: null, label: `3º (${ref.slice(2)})` };
  }
  // 1º o 2º de un grupo
  const pos = Number(ref[0]);
  const letter = ref.slice(1);
  const teams = ctx.byLetter[letter];
  const sub = `${pos}º Grupo ${letter}`;
  if (teams && teams.length >= pos) {
    return { team: teams[pos - 1], label: sub };
  }
  return { team: null, label: sub };
}

function Slot({ slot, ctx }) {
  const { team, label } = resolveSlot(slot, ctx);
  const flagUrl = team ? getFlagUrl(team.name) : null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, padding: '7px 10px' }}>
      {team ? (
        <>
          {flagUrl && (
            <img src={flagUrl} alt="" style={{ width: 20, height: 14, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
          )}
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {getTeamName(team.name)}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', flexShrink: 0 }}>{label}</span>
        </>
      ) : (
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>{label}</span>
      )}
    </div>
  );
}

function MatchCard({ match, ctx }) {
  const cctx = { ...ctx, matchNo: match.match };
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
        padding: '5px 10px 0',
      }}>
        Partido {match.match}
      </div>
      <Slot slot={match.home} ctx={cctx} />
      <div style={{ height: 0.5, background: 'rgba(255,255,255,0.06)', margin: '0 10px' }} />
      <Slot slot={match.away} ctx={cctx} />
    </div>
  );
}

export default function Bracket({ matches }) {
  const ctx = useMemo(() => {
    const byLetter = standingsByLetter(matches);
    const ranking = thirdPlaceRanking(matches);
    const played = finishedGroupMatches(matches) > 0;
    // Proyectar terceros solo cuando hay datos y los 12 grupos están presentes
    const thirdAssignment = (played && ranking.length === 12)
      ? assignThirdPlaces(ranking.slice(0, 8).map((t) => t.letter))
      : null;
    return { byLetter, thirdAssignment };
  }, [matches]);

  const complete = useMemo(() => groupStageComplete(matches), [matches]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{
        fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0,
        padding: '10px 12px', borderRadius: 10,
        background: 'rgba(212,175,55,0.06)', border: '0.5px solid rgba(212,175,55,0.15)',
      }}>
        {complete
          ? '🏆 Cruces confirmados según la clasificación final de grupos.'
          : '⚡ Proyección en vivo: los cruces se actualizan conforme se mueve la tabla. La asignación de terceros es una estimación hasta que FIFA cierre el cuadro al terminar los grupos.'}
      </p>

      {ROUNDS.map((round) => (
        <section key={round.key}>
          <div style={{
            fontSize: 13, fontWeight: 700, letterSpacing: 0.3,
            color: 'var(--gold)', textTransform: 'uppercase',
            marginBottom: 10, paddingLeft: 4,
          }}>
            {round.label}
          </div>
          <div className="bracket-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 10,
          }}>
            {round.matches.map((m) => (
              <MatchCard key={m.match} match={m} ctx={ctx} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
