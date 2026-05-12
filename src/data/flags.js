const BASE = 'https://play.fifa.com/media/image/bracket_predictor/flags/world_cup_2026';

const CODES = {
  // A
  Algeria: 'ALG',
  Argentina: 'ARG',
  Australia: 'AUS',
  Austria: 'AUT',
  // B
  Belgium: 'BEL',
  'Bosnia and Herzegovina': 'BIH',
  'Bosnia & Herzegovina': 'BIH',
  'Bosnia-Herzegovina': 'BIH',
  'Bosnia-Herzegowina': 'BIH',
  Brazil: 'BRA',
  // C
  Canada: 'CAN',
  'Cape Verde': 'CPV',
  'Cabo Verde': 'CPV',
  'Cape Verde Islands': 'CPV',
  Colombia: 'COL',
  'Congo DR': 'COD',
  'DR Congo': 'COD',
  Croatia: 'CRO',
  Curaçao: 'CUW',
  'Côte d\'Ivoire': 'CIV',
  'Ivory Coast': 'CIV',
  'Czech Republic': 'CZE',
  Czechia: 'CZE',
  // E
  Ecuador: 'ECU',
  Egypt: 'EGY',
  England: 'ENG',
  // F
  France: 'FRA',
  // G
  Germany: 'GER',
  Ghana: 'GHA',
  // H
  Haiti: 'HAI',
  // I
  Iran: 'IRN',
  Iraq: 'IRQ',
  // J
  Japan: 'JPN',
  Jordan: 'JOR',
  // K
  'Korea Republic': 'KOR',
  'South Korea': 'KOR',
  // M
  Morocco: 'MAR',
  Mexico: 'MEX',
  // N
  Netherlands: 'NED',
  'New Zealand': 'NZL',
  Norway: 'NOR',
  // P
  Panama: 'PAN',
  Paraguay: 'PAR',
  Portugal: 'POR',
  // Q
  Qatar: 'QAT',
  // S
  'Saudi Arabia': 'KSA',
  Scotland: 'SCO',
  Senegal: 'SEN',
  Spain: 'ESP',
  Sweden: 'SWE',
  Switzerland: 'SUI',
  // T
  Tunisia: 'TUN',
  Turkey: 'TUR',
  Türkiye: 'TUR',
  // U
  'United States': 'USA',
  USA: 'USA',
  Uruguay: 'URU',
  Uzbekistan: 'UZB',
  // Z
  'South Africa': 'RSA',
};

export function getFlagUrl(teamName) {
  if (!teamName) return null;
  const code = CODES[teamName];
  if (!code) console.warn('[flags] sin mapeo:', JSON.stringify(teamName));
  return code ? `${BASE}/${code}.svg` : null;
}
