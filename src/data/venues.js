export const VENUE_CITY = {
  // Estados Unidos
  'MetLife Stadium':          'East Rutherford, Nueva Jersey',
  'SoFi Stadium':             'Los Ángeles, California',
  'AT&T Stadium':             'Arlington, Texas',
  "Levi's Stadium":           'Santa Clara, California',
  'Lincoln Financial Field':  'Filadelfia, Pensilvania',
  'Arrowhead Stadium':        'Kansas City, Misuri',
  'Gillette Stadium':         'Boston, Massachusetts',
  'Hard Rock Stadium':        'Miami, Florida',
  'NRG Stadium':              'Houston, Texas',
  'Lumen Field':              'Seattle, Washington',
  // Canadá
  'BC Place':                 'Vancouver, Canadá',
  'BMO Field':                'Toronto, Canadá',
  // México
  'Estadio Azteca':           'Ciudad de México, México',
  'Estadio BBVA':             'Monterrey, México',
  'Estadio Akron':            'Guadalajara, México',
};

export function getVenueCity(venue) {
  if (!venue) return null;
  return VENUE_CITY[venue] ?? null;
}
