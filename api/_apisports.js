const DATA_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 60_000;

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
}

const ALIAS = {
  korearepublic: 'southkorea',
  republicofkorea: 'southkorea',
  iriran: 'iran',
  iranislamicrepublic: 'iran',
  turkiye: 'turkey',
  cotedivoire: 'ivorycoast',
  capeverdeislands: 'capeverde',
  bosniaandherzegovina: 'bosniaherzegovina',
  drcongo: 'congodr',
  unitedstates: 'usa',
};

function canon(s) {
  const n = norm(s);
  return ALIAS[n] || n;
}

async function fetchAll() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) return cache;
  const res = await fetch(DATA_URL);
  const data = await res.json();
  cache = data.matches;
  cacheTime = now;
  return cache;
}

export async function getGoals({ date, home, away, key: _key }) {
  if (!date || !home || !away) throw new Error('Faltan parámetros date/home/away');

  const matches = await fetchAll();
  const hC = canon(home), aC = canon(away);

  const match = matches.find((m) => {
    if (m.date !== date) return false;
    const t1 = canon(m.team1), t2 = canon(m.team2);
    return (t1 === hC && t2 === aC) || (t1 === aC && t2 === hC);
  });

  if (!match || !match.score?.ft) return { found: false, home: [], away: [] };

  const ourHomeIsTeam1 = canon(match.team1) === hC;
  const ourGoals = ourHomeIsTeam1 ? match.goals1 : match.goals2;
  const theirGoals = ourHomeIsTeam1 ? match.goals2 : match.goals1;

  const map = (g) => ({
    player: g.name ?? '—',
    minute: parseInt(g.minute, 10) || null,
    extra: null,
    own: false,
    pen: false,
  });

  return {
    found: true,
    home: (ourGoals || []).map(map),
    away: (theirGoals || []).map(map),
  };
}
