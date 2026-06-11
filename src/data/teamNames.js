export const TEAM_NAMES_ES = {
  // A
  'Afghanistan': 'Afganistán',
  'Albania': 'Albania',
  'Algeria': 'Argelia',
  'Andorra': 'Andorra',
  'Angola': 'Angola',
  'Argentina': 'Argentina',
  'Armenia': 'Armenia',
  'Australia': 'Australia',
  'Austria': 'Austria',

  // B
  'Bahrain': 'Baréin',
  'Bangladesh': 'Bangladés',
  'Belgium': 'Bélgica',
  'Bolivia': 'Bolivia',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Bosnia & Herzegovina': 'Bosnia y Herzegovina',
  'Brazil': 'Brasil',
  'Bulgaria': 'Bulgaria',
  'Burkina Faso': 'Burkina Faso',

  // C
  'Cameroon': 'Camerún',
  'Canada': 'Canadá',
  'Chile': 'Chile',
  'China': 'China',
  "China PR": 'China',
  'Colombia': 'Colombia',
  'Congo': 'Congo',
  'Costa Rica': 'Costa Rica',
  'Croatia': 'Croacia',
  'Cuba': 'Cuba',
  'Czechia': 'República Checa',
  'Czech Republic': 'República Checa',

  // D
  'Denmark': 'Dinamarca',

  // E
  'Ecuador': 'Ecuador',
  'Egypt': 'Egipto',
  'El Salvador': 'El Salvador',
  'England': 'Inglaterra',
  'Estonia': 'Estonia',
  'Ethiopia': 'Etiopía',

  // F
  'Finland': 'Finlandia',
  'France': 'Francia',

  // G
  'Gabon': 'Gabón',
  'Georgia': 'Georgia',
  'Germany': 'Alemania',
  'Ghana': 'Ghana',
  'Greece': 'Grecia',
  'Guatemala': 'Guatemala',
  'Guinea': 'Guinea',

  // H
  'Haiti': 'Haití',
  'Honduras': 'Honduras',
  'Hungary': 'Hungría',

  // I
  'Iceland': 'Islandia',
  'India': 'India',
  'Indonesia': 'Indonesia',
  'Iran': 'Irán',
  'Iraq': 'Irak',
  'Ireland': 'Irlanda',
  'Israel': 'Israel',
  'Italy': 'Italia',
  'Ivory Coast': 'Costa de Marfil',
  "Côte d'Ivoire": 'Costa de Marfil',

  // J
  'Jamaica': 'Jamaica',
  'Japan': 'Japón',
  'Jordan': 'Jordania',

  // K
  'Kazakhstan': 'Kazajistán',
  'Kenya': 'Kenia',
  'Kuwait': 'Kuwait',

  // L
  'Lebanon': 'Líbano',
  'Libya': 'Libia',

  // M
  'Malaysia': 'Malasia',
  'Mali': 'Mali',
  'Malta': 'Malta',
  'Mexico': 'México',
  'Moldova': 'Moldavia',
  'Montenegro': 'Montenegro',
  'Morocco': 'Marruecos',
  'Mozambique': 'Mozambique',

  // N
  'Netherlands': 'Países Bajos',
  'New Zealand': 'Nueva Zelanda',
  'Nicaragua': 'Nicaragua',
  'Nigeria': 'Nigeria',
  'North Korea': 'Corea del Norte',
  "Korea DPR": 'Corea del Norte',
  'North Macedonia': 'Macedonia del Norte',
  'Norway': 'Noruega',

  // O
  'Oman': 'Omán',

  // P
  'Pakistan': 'Pakistán',
  'Palestine': 'Palestina',
  'Panama': 'Panamá',
  'Paraguay': 'Paraguay',
  'Peru': 'Perú',
  'Philippines': 'Filipinas',
  'Poland': 'Polonia',
  'Portugal': 'Portugal',

  // Q
  'Qatar': 'Catar',

  // R
  'Romania': 'Rumanía',
  'Russia': 'Rusia',

  // S
  'Saudi Arabia': 'Arabia Saudita',
  'Scotland': 'Escocia',
  'Senegal': 'Senegal',
  'Serbia': 'Serbia',
  'Slovakia': 'Eslovaquia',
  'Slovenia': 'Eslovenia',
  'Somalia': 'Somalia',
  'South Africa': 'Sudáfrica',
  'South Korea': 'Corea del Sur',
  'Korea Republic': 'Corea del Sur',
  'Spain': 'España',
  'Sudan': 'Sudán',
  'Sweden': 'Suecia',
  'Switzerland': 'Suiza',
  'Syria': 'Siria',

  // T
  'Tanzania': 'Tanzania',
  'Thailand': 'Tailandia',
  'Trinidad and Tobago': 'Trinidad y Tobago',
  'Tunisia': 'Túnez',
  'Turkey': 'Turquía',
  'Türkiye': 'Turquía',

  // U
  'Uganda': 'Uganda',
  'Ukraine': 'Ucrania',
  'United Arab Emirates': 'Emiratos Árabes Unidos',
  'United States': 'Estados Unidos',
  'USA': 'Estados Unidos',
  'Uruguay': 'Uruguay',
  'Uzbekistan': 'Uzbekistán',

  // V
  'Venezuela': 'Venezuela',
  'Vietnam': 'Vietnam',

  // W
  'Wales': 'Gales',

  // Z
  'Zambia': 'Zambia',
  'Zimbabwe': 'Zimbabue',
};

export function getTeamName(name) {
  return TEAM_NAMES_ES[name] ?? name;
}
