export const COUNTRIES = {
  // Spanish-speaking
  Argentina:        { lang: 'es', channels: ['Telefe Argentina', 'DIRECTV Sports Argentina', 'DGO', 'mitelefe', 'Paramount+'] },
  Bolivia:          { lang: 'es', channels: ['Red Uno', 'Unitel', 'Tigo Sports Bolivia', 'Disney+ Premium Chile', 'Entel TV'] },
  Chile:            { lang: 'es', channels: ['Chilevision', 'DIRECTV Sports Chile', 'DGO', 'Disney+ Premium Chile', 'Paramount+'] },
  Colombia:         { lang: 'es', channels: ['Win Sports', 'DIRECTV Sports Colombia', 'DGO', 'Win Play', 'Radio Nacional de Colombia', 'Paramount+'] },
  'Costa Rica':     { lang: 'es', channels: ['Teletica Canal 7', 'Azteca Deportes En Vivo', 'TDMAX', 'FOX'] },
  'Dominican Republic': { lang: 'es', channels: ['Azteca Deportes En Vivo'] },
  Ecuador:          { lang: 'es', channels: ['DIRECTV Sports Ecuador', 'DGO', 'Teleamazonas', 'Paramount+'] },
  'El Salvador':    { lang: 'es', channels: ['Azteca Deportes En Vivo', 'Tigo Sports El Salvador', 'FOX'] },
  Guatemala:        { lang: 'es', channels: ['Azteca Deportes En Vivo', 'Tigo Sports Guatemala', 'FOX'] },
  Honduras:         { lang: 'es', channels: ['Azteca Deportes En Vivo', 'Tigo Sports Honduras', 'FOX'] },
  Mexico:           { lang: 'es', channels: ['Canal 5 Televisa', 'Azteca 7', 'TUDN En Vivo', 'Azteca Deportes En Vivo', 'ViX Mexico'] },
  Nicaragua:        { lang: 'es', channels: ['Azteca Deportes En Vivo', 'Tigo Sports Nicaragua', 'FOX'] },
  Panama:           { lang: 'es', channels: ['RPCTV', 'N Panama', 'Azteca Deportes En Vivo', 'TVMax', 'Medcom GO', 'Tigo Sports Panama', 'FOX'] },
  Peru:             { lang: 'es', channels: ['DIRECTV Sports Peru', 'DGO', 'Disney+ Premium Chile', 'Paramount+'] },
  'Puerto Rico':    { lang: 'es', channels: ['Telemundo', 'NAICOM'] },
  Spain:            { lang: 'es', channels: ['DAZN Spain', 'TVE La 1', 'RTVE Play', 'Movistar+', 'fuboTV España'] },
  Uruguay:          { lang: 'es', channels: ['DIRECTV Sports Uruguay', 'DGO', 'Paramount+'] },
  Venezuela:        { lang: 'es', channels: ['DIRECTV Sports Venezuela', 'DGO', 'inter'] },

  // English-speaking
  Australia:        { lang: 'en', channels: ['SBS', 'SBS On Demand'] },
  Canada:           { lang: 'en', channels: ['TSN+', 'TSN1', 'CTV', 'RDS App', 'CTV App'] },
  'Great Britain':  { lang: 'en', channels: ['BBC Sport Web', 'BBC One', 'BBC iPlayer'] },
  'Ireland Republic': { lang: 'en', channels: ['RTE 2', 'BBC Sport Web', 'BBC One', 'RTE Player', 'BBC iPlayer'] },
  'New Zealand':    { lang: 'en', channels: ['TVNZ+'] },
  Nigeria:          { lang: 'en', channels: ['Sporty TV App'] },
  'South Africa':   { lang: 'en', channels: ['Sporty TV App'] },
  Uganda:           { lang: 'en', channels: ['Sporty TV App'] },
  USA:              { lang: 'en', channels: ['FOX Network', 'fuboTV', 'Telemundo', 'Telemundo Deportes En Vivo', 'Peacock', 'Foxsports.com', 'FOX Sports App', 'FOX One', 'Futbol de Primera Radio'] },
  International:    { lang: 'en', channels: ['YouTube', 'Sport 24'] },
};

export const SPANISH_COUNTRIES = Object.entries(COUNTRIES)
  .filter(([, v]) => v.lang === 'es')
  .map(([k]) => k)
  .sort();

export const ENGLISH_COUNTRIES = Object.entries(COUNTRIES)
  .filter(([, v]) => v.lang === 'en')
  .map(([k]) => k)
  .sort();
