import type { Gender, Language } from './types';

interface HonorInput {
  familyName: string;
  relation: 'grandmother' | 'grandfather' | 'parent' | 'relative';
  babyGender?: Gender;
  languages?: Language[];
}

interface HonorSuggestions {
  exact: { name: string; use: string };
  variants: string[];
  compounds: string[];
  middleNameIdeas: string[];
  explanation: string;
}

const knownHonorNames: Record<string, { variants: string[]; girlCompounds: string[]; boyCompounds: string[] }> = {
  maria: {
    variants: ['Mariana', 'Miriam', 'Marie', 'Mary', 'Marisol'],
    girlCompounds: ['Maria Clara', 'Ana Maria', 'Maria Sofia', 'Maria Helena'],
    boyCompounds: ['João Maria', 'José Maria'],
  },
  joao: {
    variants: ['Juan', 'John', 'Giovanni', 'Ian'],
    girlCompounds: ['Maria João', 'Ana Joana'],
    boyCompounds: ['João Miguel', 'João Lucas', 'João Pedro'],
  },
  helena: {
    variants: ['Elena', 'Helen', 'Lena'],
    girlCompounds: ['Helena Sofia', 'Maria Helena', 'Helena Maria'],
    boyCompounds: ['João Heleno'],
  },
  jose: {
    variants: ['Joseph', 'Giuseppe', 'Pepe'],
    girlCompounds: ['Maria José', 'Ana José'],
    boyCompounds: ['José Gabriel', 'João José', 'José Miguel'],
  },
};

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function suggestFamilyHonorNames(input: HonorInput): HonorSuggestions {
  const cleanName = input.familyName.trim();
  const key = normalize(cleanName);
  const known = knownHonorNames[key];
  const compounds = input.babyGender === 'boy' ? known?.boyCompounds : known?.girlCompounds;

  return {
    exact: { name: cleanName, use: `Use ${cleanName} exactly as a first or middle name.` },
    variants: known?.variants ?? [],
    compounds: compounds?.length ? compounds : [`${cleanName} as a middle name`, `${cleanName} with a short modern first name`],
    middleNameIdeas: [cleanName, ...(known?.variants.slice(0, 2) ?? [])],
    explanation: `A respectful way to honor a ${input.relation} is to offer exact, middle-name, compound, and modern variant options so parents can keep the family connection without pressure.`,
  };
}
