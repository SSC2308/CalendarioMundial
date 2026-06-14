export const TEAM_NAMES_ES = {
  // Grupo A
  'Mexico':               'México',
  'South Africa':         'Sudáfrica',
  'Korea Republic':       'República de Corea',
  'South Korea':          'República de Corea',
  'Czechia':              'Chequia',
  'Czech Republic':       'Chequia',

  // Grupo B
  'Canada':               'Canadá',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Bosnia-Herzegovina':   'Bosnia y Herzegovina',
  'Qatar':                'Catar',
  'Switzerland':          'Suiza',

  // Grupo C
  'Brazil':               'Brasil',
  'Morocco':              'Marruecos',
  'Haiti':                'Haití',
  'Scotland':             'Escocia',

  // Grupo D
  'United States':        'EE. UU.',
  'Paraguay':             'Paraguay',
  'Australia':            'Australia',
  'Türkiye':              'Turquía',
  'Turkey':               'Turquía',

  // Grupo E
  'Germany':              'Alemania',
  'Curaçao':              'Curazao',
  'Curacao':              'Curazao',
  "Côte d'Ivoire":        'Costa de Marfil',
  'Ivory Coast':          'Costa de Marfil',
  'Ecuador':              'Ecuador',

  // Grupo F
  'Netherlands':          'Países Bajos',
  'Japan':                'Japón',
  'Sweden':               'Suecia',
  'Tunisia':              'Túnez',

  // Grupo G
  'Belgium':              'Bélgica',
  'Egypt':                'Egipto',
  'Iran':                 'RI de Irán',
  'New Zealand':          'Nueva Zelanda',

  // Grupo H
  'Spain':                'España',
  'Cape Verde':           'Islas de Cabo Verde',
  'Cape Verde Islands':   'Islas de Cabo Verde',
  'Saudi Arabia':         'Arabia Saudí',
  'Uruguay':              'Uruguay',

  // Grupo I
  'France':               'Francia',
  'Senegal':              'Senegal',
  'Iraq':                 'Irak',
  'Norway':               'Noruega',

  // Grupo J
  'Argentina':            'Argentina',
  'Algeria':              'Argelia',
  'Austria':              'Austria',
  'Jordan':               'Jordania',

  // Grupo K
  'Portugal':             'Portugal',
  'DR Congo':             'RD Congo',
  'Congo DR':             'RD Congo',
  'Uzbekistan':           'Uzbekistán',
  'Colombia':             'Colombia',

  // Grupo L
  'England':              'Inglaterra',
  'Croatia':              'Croacia',
  'Ghana':                'Ghana',
  'Panama':               'Panamá',
};

export function getTeamName(name) {
  return TEAM_NAMES_ES[name] ?? name;
}
