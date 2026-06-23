// Estructura fija del cuadro final del Mundial 2026 (FIFA).
// Refs de posición:
//   '1A' = ganador del Grupo A, '2A' = segundo del Grupo A
//   '3:A/B/C/D/F' = uno de los mejores terceros entre esos grupos
//   'W74' = ganador del partido 74, 'L101' = perdedor del partido 101

export const ROUND_OF_32 = [
  { match: 73, home: '2A',          away: '2B'           },
  { match: 74, home: '1E',          away: '3:A/B/C/D/F'  },
  { match: 75, home: '1F',          away: '2C'           },
  { match: 76, home: '1C',          away: '2F'           },
  { match: 77, home: '1I',          away: '3:C/D/F/G/H'  },
  { match: 78, home: '2E',          away: '2I'           },
  { match: 79, home: '1A',          away: '3:C/E/F/H/I'  },
  { match: 80, home: '1L',          away: '3:E/H/I/J/K'  },
  { match: 81, home: '1D',          away: '3:B/E/F/I/J'  },
  { match: 82, home: '1G',          away: '3:A/E/H/I/J'  },
  { match: 83, home: '2K',          away: '2L'           },
  { match: 84, home: '1H',          away: '2J'           },
  { match: 85, home: '1B',          away: '3:E/F/G/I/J'  },
  { match: 86, home: '1J',          away: '2H'           },
  { match: 87, home: '1K',          away: '3:D/E/I/J/L'  },
  { match: 88, home: '2D',          away: '2G'           },
];

export const ROUND_OF_16 = [
  { match: 89, home: 'W74', away: 'W77' },
  { match: 90, home: 'W73', away: 'W75' },
  { match: 91, home: 'W76', away: 'W78' },
  { match: 92, home: 'W79', away: 'W80' },
  { match: 93, home: 'W83', away: 'W84' },
  { match: 94, home: 'W81', away: 'W82' },
  { match: 95, home: 'W86', away: 'W88' },
  { match: 96, home: 'W85', away: 'W87' },
];

export const QUARTER_FINALS = [
  { match: 97,  home: 'W89', away: 'W90' },
  { match: 98,  home: 'W93', away: 'W94' },
  { match: 99,  home: 'W91', away: 'W92' },
  { match: 100, home: 'W95', away: 'W96' },
];

export const SEMI_FINALS = [
  { match: 101, home: 'W97', away: 'W98'  },
  { match: 102, home: 'W99', away: 'W100' },
];

export const THIRD_PLACE = { match: 103, home: 'L101', away: 'L102' };
export const FINAL       = { match: 104, home: 'W101', away: 'W102' };

// Las 8 llaves de la Ronda de 32 que enfrentan a un tercero, con sus grupos elegibles.
export const THIRD_PLACE_SLOTS = [
  { match: 74, groups: ['A', 'B', 'C', 'D', 'F'] },
  { match: 77, groups: ['C', 'D', 'F', 'G', 'H'] },
  { match: 79, groups: ['C', 'E', 'F', 'H', 'I'] },
  { match: 80, groups: ['E', 'H', 'I', 'J', 'K'] },
  { match: 81, groups: ['B', 'E', 'F', 'I', 'J'] },
  { match: 82, groups: ['A', 'E', 'H', 'I', 'J'] },
  { match: 85, groups: ['E', 'F', 'G', 'I', 'J'] },
  { match: 87, groups: ['D', 'E', 'I', 'J', 'L'] },
];

// Dado el conjunto de 8 grupos cuyos terceros clasifican, asigna cada tercero
// a una llave donde su grupo es elegible (emparejamiento perfecto por backtracking).
// Devuelve { 74: 'C', 77: 'D', ... } o null si no hay emparejamiento posible.
export function assignThirdPlaces(qualifyingLetters) {
  if (!qualifyingLetters || qualifyingLetters.length !== THIRD_PLACE_SLOTS.length) return null;
  const used = new Set();
  const result = {};

  function backtrack(i) {
    if (i === THIRD_PLACE_SLOTS.length) return true;
    const slot = THIRD_PLACE_SLOTS[i];
    const candidates = slot.groups
      .filter((g) => qualifyingLetters.includes(g) && !used.has(g))
      .sort();
    for (const g of candidates) {
      used.add(g);
      result[slot.match] = g;
      if (backtrack(i + 1)) return true;
      used.delete(g);
      delete result[slot.match];
    }
    return false;
  }

  return backtrack(0) ? result : null;
}

export const ROUNDS = [
  { key: 'r32', label: 'Ronda de 32', matches: ROUND_OF_32 },
  { key: 'r16', label: 'Octavos',     matches: ROUND_OF_16 },
  { key: 'qf',  label: 'Cuartos',     matches: QUARTER_FINALS },
  { key: 'sf',  label: 'Semifinales', matches: SEMI_FINALS },
  { key: 'f',   label: 'Final',       matches: [THIRD_PLACE, FINAL] },
];
