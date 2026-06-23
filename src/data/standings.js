function initTeam(name) {
  return { name, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };
}

function sortTeams(teams) {
  return teams.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const dA = a.gf - a.gc;
    const dB = b.gf - b.gc;
    if (dB !== dA) return dB - dA;
    return b.gf - a.gf;
  });
}

// Devuelve [{ key, label, teams[] }] ordenado por grupo
export function computeStandings(matches) {
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
      teams: sortTeams(Object.values(teams)),
    }));
}

// Mapa { 'A': [teams ordenados], 'B': [...] } para resolver el bracket
export function standingsByLetter(matches) {
  const map = {};
  for (const g of computeStandings(matches)) {
    map[g.key.replace('GROUP_', '')] = g.teams;
  }
  return map;
}

// ¿Terminó toda la fase de grupos? (para saber si 1º/2º ya son definitivos)
export function groupStageComplete(matches) {
  const groupMatches = matches.filter((m) => m.stage === 'GROUP_STAGE');
  return groupMatches.length > 0 && groupMatches.every((m) => m.status === 'FINISHED');
}

// Cantidad de partidos de grupos ya jugados (para saber si proyectar terceros)
export function finishedGroupMatches(matches) {
  return matches.filter((m) => m.stage === 'GROUP_STAGE' && m.status === 'FINISHED').length;
}

// Ranking de los 12 terceros, mejor primero (pts, DG, GF)
export function thirdPlaceRanking(matches) {
  return computeStandings(matches)
    .filter((g) => g.teams.length >= 3)
    .map((g) => ({ letter: g.key.replace('GROUP_', ''), team: g.teams[2] }))
    .sort((a, b) => {
      const A = a.team, B = b.team;
      if (B.pts !== A.pts) return B.pts - A.pts;
      const dA = A.gf - A.gc, dB = B.gf - B.gc;
      if (dB !== dA) return dB - dA;
      return B.gf - A.gf;
    });
}
