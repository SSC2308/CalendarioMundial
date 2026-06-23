// Lógica compartida (dev + prod) para traer goleadores desde API-Football (api-sports.io).
// Los archivos que empiezan con "_" no se exponen como ruta en Vercel.

const BASE = 'https://v3.football.api-sports.io';
const LEAGUE = 1;     // FIFA World Cup
const SEASON = 2026;  // Mundial 2026

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // sin acentos
    .replace(/[^a-z]/g, '');
}

// Diferencias de nombre entre football-data.org y api-sports.io → canónico
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

export async function getGoals({ date, home, away, key }) {
  if (!key) throw new Error('Falta APISPORTS_KEY');
  if (!date || !home || !away) throw new Error('Faltan parámetros date/home/away');

  const headers = { 'x-apisports-key': key };

  // 1) Buscar el fixture del día que coincida con ambos equipos
  const fxRes = await fetch(`${BASE}/fixtures?league=${LEAGUE}&season=${SEASON}&date=${date}&timezone=UTC`, { headers });
  const fxData = await fxRes.json();
  const fixtures = fxData.response || [];

  const hC = canon(home), aC = canon(away);
  const fixture = fixtures.find((f) => {
    const t1 = canon(f.teams.home.name), t2 = canon(f.teams.away.name);
    return (t1 === hC && t2 === aC) || (t1 === aC && t2 === hC);
  });
  if (!fixture) return { found: false, home: [], away: [] };

  const homeId = fixture.teams.home.id;
  const awayId = fixture.teams.away.id;

  // 2) Eventos del fixture → goles
  const evRes = await fetch(`${BASE}/fixtures/events?fixture=${fixture.fixture.id}`, { headers });
  const evData = await evRes.json();
  const events = evData.response || [];

  const goals = events
    .filter((e) => e.type === 'Goal' && e.detail !== 'Missed Penalty')
    .map((e) => {
      const own = e.detail === 'Own Goal';
      // El gol en contra cuenta para el rival
      const creditTeam = own ? (e.team.id === homeId ? awayId : homeId) : e.team.id;
      return {
        creditTeam,
        player: e.player?.name ?? '—',
        minute: e.time?.elapsed ?? null,
        extra: e.time?.extra ?? null,
        own,
        pen: e.detail === 'Penalty',
      };
    });

  const pick = (id) => goals
    .filter((g) => g.creditTeam === id)
    .sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0))
    .map(({ creditTeam, ...rest }) => rest);

  // Orientar a home/away según lo que pidió el cliente
  const homeIsOurHome = canon(fixture.teams.home.name) === hC;
  return homeIsOurHome
    ? { found: true, home: pick(homeId), away: pick(awayId) }
    : { found: true, home: pick(awayId), away: pick(homeId) };
}
