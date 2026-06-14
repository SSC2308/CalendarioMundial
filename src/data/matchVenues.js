// Mapa de partidos a estadio y ciudad
// Clave: "homeTeam|awayTeam" con los nombres exactos de la API (inglés)
const VENUES = {
  // ── GRUPO A ──
  'Mexico|South Africa':         { stadium: 'Estadio Azteca',          city: 'Ciudad de México' },
  'Korea Republic|Czechia':      { stadium: 'Estadio Akron',           city: 'Guadalajara' },
  'South Korea|Czechia':         { stadium: 'Estadio Akron',           city: 'Guadalajara' },
  'Czechia|South Africa':        { stadium: 'Mercedes-Benz Stadium',   city: 'Atlanta' },
  'Mexico|Korea Republic':       { stadium: 'Estadio Akron',           city: 'Guadalajara' },
  'Mexico|South Korea':          { stadium: 'Estadio Akron',           city: 'Guadalajara' },
  'Czechia|Mexico':              { stadium: 'Estadio Azteca',          city: 'Ciudad de México' },
  'South Africa|Korea Republic': { stadium: 'Estadio BBVA',            city: 'Monterrey' },
  'South Africa|South Korea':    { stadium: 'Estadio BBVA',            city: 'Monterrey' },

  // ── GRUPO B ──
  'Canada|Bosnia and Herzegovina':  { stadium: 'BMO Field',           city: 'Toronto' },
  'Canada|Bosnia-Herzegovina':      { stadium: 'BMO Field',           city: 'Toronto' },
  'Qatar|Switzerland':              { stadium: "Levi's Stadium",       city: 'Santa Clara' },
  'Switzerland|Bosnia and Herzegovina': { stadium: 'SoFi Stadium',   city: 'Los Ángeles' },
  'Switzerland|Bosnia-Herzegovina': { stadium: 'SoFi Stadium',        city: 'Los Ángeles' },
  'Canada|Qatar':                   { stadium: 'BC Place',             city: 'Vancouver' },
  'Switzerland|Canada':             { stadium: 'BC Place',             city: 'Vancouver' },
  'Bosnia and Herzegovina|Qatar':   { stadium: 'Lumen Field',          city: 'Seattle' },
  'Bosnia-Herzegovina|Qatar':       { stadium: 'Lumen Field',          city: 'Seattle' },

  // ── GRUPO C ──
  'Brazil|Morocco':             { stadium: 'MetLife Stadium',          city: 'Nueva York / Nueva Jersey' },
  'Haiti|Scotland':             { stadium: 'Gillette Stadium',         city: 'Boston' },
  'Scotland|Morocco':           { stadium: 'Gillette Stadium',         city: 'Boston' },
  'Brazil|Haiti':               { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },
  'Scotland|Brazil':            { stadium: 'Hard Rock Stadium',        city: 'Miami' },
  'Morocco|Haiti':              { stadium: 'Mercedes-Benz Stadium',    city: 'Atlanta' },

  // ── GRUPO D ──
  'United States|Paraguay':     { stadium: 'SoFi Stadium',            city: 'Los Ángeles' },
  'Australia|Türkiye':          { stadium: 'BC Place',                 city: 'Vancouver' },
  'Australia|Turkey':           { stadium: 'BC Place',                 city: 'Vancouver' },
  'United States|Australia':    { stadium: 'Lumen Field',              city: 'Seattle' },
  'Türkiye|Paraguay':           { stadium: "Levi's Stadium",           city: 'Santa Clara' },
  'Turkey|Paraguay':            { stadium: "Levi's Stadium",           city: 'Santa Clara' },
  'Türkiye|United States':      { stadium: 'SoFi Stadium',            city: 'Los Ángeles' },
  'Turkey|United States':       { stadium: 'SoFi Stadium',            city: 'Los Ángeles' },
  'Paraguay|Australia':         { stadium: "Levi's Stadium",           city: 'Santa Clara' },

  // ── GRUPO E ──
  'Germany|Curaçao':            { stadium: 'NRG Stadium',              city: 'Houston' },
  "Côte d'Ivoire|Ecuador":      { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },
  'Ivory Coast|Ecuador':        { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },
  "Germany|Côte d'Ivoire":      { stadium: 'BMO Field',                city: 'Toronto' },
  'Germany|Ivory Coast':        { stadium: 'BMO Field',                city: 'Toronto' },
  'Ecuador|Curaçao':            { stadium: 'Arrowhead Stadium',        city: 'Kansas City' },
  'Ecuador|Germany':            { stadium: 'MetLife Stadium',          city: 'Nueva York / Nueva Jersey' },
  "Curaçao|Côte d'Ivoire":      { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },
  'Curaçao|Ivory Coast':        { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },

  // ── GRUPO F ──
  'Netherlands|Japan':          { stadium: 'AT&T Stadium',             city: 'Dallas' },
  'Sweden|Tunisia':             { stadium: 'Estadio BBVA',             city: 'Monterrey' },
  'Netherlands|Sweden':         { stadium: 'NRG Stadium',              city: 'Houston' },
  'Tunisia|Japan':              { stadium: 'Estadio BBVA',             city: 'Monterrey' },
  'Japan|Sweden':               { stadium: 'AT&T Stadium',             city: 'Dallas' },
  'Tunisia|Netherlands':        { stadium: 'Arrowhead Stadium',        city: 'Kansas City' },

  // ── GRUPO G ──
  'Iran|New Zealand':           { stadium: 'SoFi Stadium',            city: 'Los Ángeles' },
  'Belgium|Egypt':              { stadium: 'Lumen Field',              city: 'Seattle' },
  'Belgium|Iran':               { stadium: 'SoFi Stadium',            city: 'Los Ángeles' },
  'New Zealand|Egypt':          { stadium: 'BC Place',                 city: 'Vancouver' },
  'Egypt|Iran':                 { stadium: 'Lumen Field',              city: 'Seattle' },
  'New Zealand|Belgium':        { stadium: 'BC Place',                 city: 'Vancouver' },

  // ── GRUPO H ──
  'Spain|Cape Verde':              { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  'Spain|Cape Verde Islands':      { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  'Saudi Arabia|Uruguay':          { stadium: 'Hard Rock Stadium',     city: 'Miami' },
  'Spain|Saudi Arabia':            { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  'Uruguay|Cape Verde':            { stadium: 'Hard Rock Stadium',     city: 'Miami' },
  'Uruguay|Cape Verde Islands':    { stadium: 'Hard Rock Stadium',     city: 'Miami' },
  'Cape Verde|Saudi Arabia':       { stadium: 'NRG Stadium',           city: 'Houston' },
  'Cape Verde Islands|Saudi Arabia': { stadium: 'NRG Stadium',         city: 'Houston' },
  'Uruguay|Spain':                 { stadium: 'Estadio Akron',         city: 'Guadalajara' },

  // ── GRUPO I ──
  'France|Senegal':             { stadium: 'MetLife Stadium',          city: 'Nueva York / Nueva Jersey' },
  'Iraq|Norway':                { stadium: 'Gillette Stadium',         city: 'Boston' },
  'France|Iraq':                { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },
  'Norway|Senegal':             { stadium: 'MetLife Stadium',          city: 'Nueva York / Nueva Jersey' },
  'Norway|France':              { stadium: 'Gillette Stadium',         city: 'Boston' },
  'Senegal|Iraq':               { stadium: 'BMO Field',                city: 'Toronto' },

  // ── GRUPO J ──
  'Argentina|Algeria':          { stadium: 'Arrowhead Stadium',        city: 'Kansas City' },
  'Austria|Jordan':             { stadium: "Levi's Stadium",           city: 'Santa Clara' },
  'Argentina|Austria':          { stadium: 'AT&T Stadium',             city: 'Dallas' },
  'Jordan|Algeria':             { stadium: "Levi's Stadium",           city: 'Santa Clara' },
  'Algeria|Austria':            { stadium: 'Arrowhead Stadium',        city: 'Kansas City' },
  'Jordan|Argentina':           { stadium: 'AT&T Stadium',             city: 'Dallas' },

  // ── GRUPO K ──
  'Portugal|Congo DR':          { stadium: 'NRG Stadium',              city: 'Houston' },
  'Portugal|DR Congo':          { stadium: 'NRG Stadium',              city: 'Houston' },
  'Uzbekistan|Colombia':        { stadium: 'Estadio Azteca',           city: 'Ciudad de México' },
  'Portugal|Uzbekistan':        { stadium: 'NRG Stadium',              city: 'Houston' },
  'Colombia|Congo DR':          { stadium: 'Estadio Akron',            city: 'Guadalajara' },
  'Colombia|DR Congo':          { stadium: 'Estadio Akron',            city: 'Guadalajara' },
  'Colombia|Portugal':          { stadium: 'Hard Rock Stadium',        city: 'Miami' },
  'Congo DR|Uzbekistan':        { stadium: 'Mercedes-Benz Stadium',    city: 'Atlanta' },
  'DR Congo|Uzbekistan':        { stadium: 'Mercedes-Benz Stadium',    city: 'Atlanta' },

  // ── GRUPO L ──
  'England|Croatia':            { stadium: 'AT&T Stadium',             city: 'Dallas' },
  'Ghana|Panama':               { stadium: 'BMO Field',                city: 'Toronto' },
  'England|Ghana':              { stadium: 'Gillette Stadium',         city: 'Boston' },
  'Panama|Croatia':             { stadium: 'BMO Field',                city: 'Toronto' },
  'Panama|England':             { stadium: 'MetLife Stadium',          city: 'Nueva York / Nueva Jersey' },
  'Croatia|Ghana':              { stadium: 'Lincoln Financial Field',  city: 'Filadelfia' },

  // ── FINAL ──
  // (equipos TBD, pero la sede es fija)
};

export function getMatchVenue(homeTeam, awayTeam) {
  if (!homeTeam || !awayTeam) return null;
  return VENUES[`${homeTeam}|${awayTeam}`] ?? null;
}
