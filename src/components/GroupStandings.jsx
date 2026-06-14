import { useMemo } from 'react';
import { getTeamName } from '../data/teamNames';
import { getFlagUrl } from '../data/flags';

function initTeam(name) {
  return { name, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };
}

function computeStandings(matches) {
  const groups = {};

  for (const match of matches) {
    if (match.stage !== 'GROUP_STAGE') continue;
    const groupKey = match.group;
    if (!groupKey) continue;

    if (!groups[groupKey]) groups[groupKey] = {};

    const home = match.homeTeam?.name;
    const away = match.awayTeam?.name;
    if (!home || !away) continue;

    if (!groups[groupKey][home]) groups[groupKey][home] = initTeam(home);
    if (!groups[groupKey][away]) groups[groupKey][away] = initTeam(away);

    if (match.status === 'FINISHED') {
      const hg = match.score?.fullTime?.home ?? 0;
      const ag = match.score?.fullTime?.away ?? 0;

      groups[groupKey][home].pj++;
      groups[groupKey][away].pj++;
      groups[groupKey][home].gf += hg;
      groups[groupKey][home].gc += ag;
      groups[groupKey][away].gf += ag;
      groups[groupKey][away].gc += hg;

      if (hg > ag) {
        groups[groupKey][home].g++;
        groups[groupKey][home].pts += 3;
        groups[groupKey][away].p++;
      } else if (hg < ag) {
        groups[groupKey][away].g++;
        groups[groupKey][away].pts += 3;
        groups[groupKey][home].p++;
      } else {
        groups[groupKey][home].e++;
        groups[groupKey][home].pts++;
        groups[groupKey][away].e++;
        groups[groupKey][away].pts++;
      }
    }
  }

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, teams]) => ({
      key,
      label: `Grupo ${key.replace('GROUP_', '')}`,
      teams: Object.values(teams).sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        const dA = a.gf - a.gc;
        const dB = b.gf - b.gc;
        if (dB !== dA) return dB - dA;
        return b.gf - a.gf;
      }),
    }));
}

const col = {
  th: { padding: '6px 8px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textAlign: 'center', whiteSpace: 'nowrap' },
  td: { padding: '8px', fontSize: 13, textAlign: 'center', color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' },
};

export default function GroupStandings({ matches }) {
  const groups = useMemo(() => computeStandings(matches), [matches]);

  if (groups.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
        La tabla estará disponible cuando inicien los partidos.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {groups.map((group) => (
        <div key={group.key} style={{
          background: 'rgba(255,255,255,0.04)',
          border: '0.5px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 14px 10px',
            fontSize: 12, fontWeight: 700,
            letterSpacing: 0.5,
            color: 'var(--gold)',
            textTransform: 'uppercase',
            borderBottom: '0.5px solid rgba(255,255,255,0.07)',
          }}>
            {group.label}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                <th style={{ ...col.th, textAlign: 'left', paddingLeft: 14, width: '99%' }}>Equipo</th>
                <th style={col.th}>PJ</th>
                <th style={col.th}>G</th>
                <th style={col.th}>E</th>
                <th style={col.th}>P</th>
                <th style={col.th}>GF</th>
                <th style={col.th}>GC</th>
                <th style={col.th}>DG</th>
                <th style={{ ...col.th, color: 'var(--gold)' }}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {group.teams.map((team, i) => {
                const flagUrl = getFlagUrl(team.name);
                const isQualified = i < 2;
                return (
                  <tr key={team.name} style={{
                    borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
                    background: isQualified ? 'rgba(212,175,55,0.04)' : 'transparent',
                  }}>
                    <td style={{ padding: '8px 8px 8px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', minWidth: 12 }}>{i + 1}</span>
                        {flagUrl && (
                          <img
                            src={flagUrl}
                            alt=""
                            style={{ width: 20, height: 14, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                          />
                        )}
                        <span style={{ fontSize: 13, color: isQualified ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)', fontWeight: isQualified ? 500 : 400 }}>
                          {getTeamName(team.name)}
                        </span>
                      </div>
                    </td>
                    <td style={col.td}>{team.pj}</td>
                    <td style={col.td}>{team.g}</td>
                    <td style={col.td}>{team.e}</td>
                    <td style={col.td}>{team.p}</td>
                    <td style={col.td}>{team.gf}</td>
                    <td style={col.td}>{team.gc}</td>
                    <td style={col.td}>{team.gf - team.gc > 0 ? `+${team.gf - team.gc}` : team.gf - team.gc}</td>
                    <td style={{ ...col.td, fontWeight: 700, color: 'var(--gold)' }}>{team.pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
