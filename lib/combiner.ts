import { names } from '../data/names';

export interface CombinedName {
  name: string;
  real: boolean;
}

const VOWELS = 'aeiouáéíóúâêôãõà';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function isVowel(char: string): boolean {
  return VOWELS.includes(char.toLowerCase());
}

/** Split a name into rough Portuguese-friendly syllables. */
export function syllabify(rawName: string): string[] {
  const name = rawName.trim().toLowerCase();
  if (!name) return [];

  const syllables: string[] = [];
  let current = '';

  for (let index = 0; index < name.length; index += 1) {
    const char = name[index];
    current += char;

    if (isVowel(char)) {
      const next = name[index + 1];
      const afterNext = name[index + 2];

      // Keep vowel digraphs like "ão", "ei", "ou" together.
      if (next && isVowel(next)) continue;

      // If one consonant is followed by a vowel, the consonant starts the next syllable.
      if (next && !isVowel(next) && afterNext && isVowel(afterNext)) {
        syllables.push(current);
        current = '';
        continue;
      }

      // If two consonants follow, the first one closes this syllable.
      if (next && !isVowel(next) && afterNext && !isVowel(afterNext)) {
        current += next;
        index += 1;
        syllables.push(current);
        current = '';
        continue;
      }

      // End of the name.
      if (!next) {
        syllables.push(current);
        current = '';
      }
    }
  }

  if (current) {
    if (syllables.length > 0) {
      syllables[syllables.length - 1] += current;
    } else {
      syllables.push(current);
    }
  }

  return syllables;
}

const ALLOWED_CLUSTERS = new Set([
  'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr', 'vr',
  'bl', 'cl', 'fl', 'gl', 'pl',
  'ch', 'lh', 'nh', 'gn', 'rr', 'ss', 'sc', 'st', 'sp', 'sm',
  'ns', 'nt', 'nd', 'nc', 'ng', 'nz', 'mb', 'mp',
  'rb', 'rc', 'rd', 'rf', 'rg', 'rj', 'rl', 'rm', 'rn', 'rp', 'rq', 'rs', 'rt', 'rv', 'rz',
  'lb', 'lc', 'ld', 'lf', 'lg', 'lm', 'lp', 'ls', 'lt', 'lv', 'lz',
]);

const BLOCKED_SUBSTRINGS = ['cago', 'caga', 'cagu', 'merd', 'bost', 'mijo', 'mija', 'peid', 'buce', 'ranho', 'fede'];

function looksPronounceable(candidate: string): boolean {
  if (candidate.length < 4 || candidate.length > 12) return false;
  if (/(.)\1\1/.test(candidate)) return false;
  if (/[^a-záéíóúâêôãõàç]/i.test(candidate)) return false;

  const plain = normalize(candidate);

  for (const blocked of BLOCKED_SUBSTRINGS) {
    if (plain.includes(blocked)) return false;
  }

  // Every consonant pair must be a cluster that sounds natural in Portuguese.
  for (let index = 0; index < plain.length - 1; index += 1) {
    const pair = plain[index] + plain[index + 1];
    if (!isVowel(pair[0]) && !isVowel(pair[1]) && !ALLOWED_CLUSTERS.has(pair)) return false;
  }

  // No 3+ consonants in a row.
  let consonantRun = 0;
  for (const char of plain) {
    if (isVowel(char)) {
      consonantRun = 0;
    } else {
      consonantRun += 1;
      if (consonantRun >= 3) return false;
    }
  }
  return true;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const knownNames = new Set<string>();
for (const entry of names) {
  knownNames.add(normalize(entry.name));
  for (const variant of entry.variants) knownNames.add(normalize(variant));
}

/** Combine two parent names into baby-name candidates, real names first. */
export function combineNames(nameA: string, nameB: string, limit = 12): CombinedName[] {
  const syllablesA = syllabify(nameA);
  const syllablesB = syllabify(nameB);
  if (syllablesA.length === 0 || syllablesB.length === 0) return [];

  const originalA = normalize(nameA);
  const originalB = normalize(nameB);
  const seen = new Set<string>();
  const results: CombinedName[] = [];

  const pairs: Array<[string[], string[]]> = [
    [syllablesA, syllablesB],
    [syllablesB, syllablesA],
  ];

  for (const [first, second] of pairs) {
    for (let cut = 1; cut <= first.length; cut += 1) {
      for (let start = 0; start < second.length; start += 1) {
        // Skip gluing both full names together — that is not a blend.
        if (cut === first.length && start === 0) continue;
        const candidate = first.slice(0, cut).join('') + second.slice(start).join('');
        const key = normalize(candidate);
        if (seen.has(key) || key === originalA || key === originalB) continue;
        if (!looksPronounceable(candidate)) continue;
        seen.add(key);
        results.push({ name: capitalize(candidate), real: knownNames.has(key) });
      }
    }
  }

  results.sort((a, b) => Number(b.real) - Number(a.real) || a.name.length - b.name.length);
  return results.slice(0, limit);
}
