import type { Gender, Language, NameStyle } from './types';

export const nameCardText = {
  pt: { viewName: 'Ver nome' },
  en: { viewName: 'View name' },
  es: { viewName: 'Ver nombre' },
} satisfies Record<Language, { viewName: string }>;

export const generatorText = {
  pt: {
    eyebrow: 'Gerador inteligente',
    title: 'Gere nomes de bebê por estilo e idioma',
    gender: 'Gênero',
    style: 'Estilo',
    languageFit: 'Compatibilidade de idioma',
    languageFitAll: 'Português + inglês + espanhol',
    any: 'Qualquer',
  },
  en: {
    eyebrow: 'Smart generator',
    title: 'Generate baby names by style and language fit',
    gender: 'Gender',
    style: 'Style',
    languageFit: 'Language fit',
    languageFitAll: 'Portuguese + English + Spanish',
    any: 'Any',
  },
  es: {
    eyebrow: 'Generador inteligente',
    title: 'Genera nombres de bebé por estilo e idioma',
    gender: 'Género',
    style: 'Estilo',
    languageFit: 'Compatibilidad de idioma',
    languageFitAll: 'Portugués + inglés + español',
    any: 'Cualquiera',
  },
} satisfies Record<Language, Record<string, string>>;

export const familyHonorText = {
  pt: {
    eyebrow: 'Nomes para homenagear a família',
    title: 'Homenageie avós e parentes sem perder um toque moderno',
    intro: 'Digite o nome de um avô, avó, pai, mãe ou parente. O NameNest sugere ideias exatas, compostas, internacionais e para segundo nome.',
    familyName: 'Nome da família',
    relation: 'Parentesco',
    babyGender: 'Gênero do bebê',
    exactMiddleName: 'Nome exato / segundo nome',
    compoundNames: 'Nomes compostos',
    variants: 'Variações',
    useAsInspiration: 'Use como inspiração',
    suggestionsFor: (name: string) => `Sugestões para ${name || 'o nome da família'}`,
    explanation: (relation: string) => `Uma forma respeitosa de homenagear ${relationLabel(relation, 'pt').toLowerCase()} é combinar opções exatas, compostas, internacionais e modernas, mantendo a conexão familiar sem pressão.`,
  },
  en: {
    eyebrow: 'Family honor names',
    title: 'Honor a grandparent without losing a modern feel',
    intro: 'Enter a grandfather, grandmother, parent, or family name. NameNest suggests exact, middle-name, compound, and international variant ideas.',
    familyName: 'Family name',
    relation: 'Relation',
    babyGender: 'Baby gender',
    exactMiddleName: 'Exact / middle name',
    compoundNames: 'Compound names',
    variants: 'Variants',
    useAsInspiration: 'Use as inspiration',
    suggestionsFor: (name: string) => `Suggestions for ${name || 'the family name'}`,
    explanation: (relation: string) => `A respectful way to honor a ${relationLabel(relation, 'en').toLowerCase()} is to offer exact, middle-name, compound, and modern variant options so parents can keep the family connection without pressure.`,
  },
  es: {
    eyebrow: 'Nombres para honrar a la familia',
    title: 'Honra a abuelos y familiares sin perder un estilo moderno',
    intro: 'Escribe el nombre de un abuelo, abuela, padre, madre o familiar. NameNest sugiere ideas exactas, compuestas, internacionales y para segundo nombre.',
    familyName: 'Nombre familiar',
    relation: 'Parentesco',
    babyGender: 'Género del bebé',
    exactMiddleName: 'Nombre exacto / segundo nombre',
    compoundNames: 'Nombres compuestos',
    variants: 'Variantes',
    useAsInspiration: 'Úsalo como inspiración',
    suggestionsFor: (name: string) => `Sugerencias para ${name || 'el nombre familiar'}`,
    explanation: (relation: string) => `Una forma respetuosa de honrar a ${relationLabel(relation, 'es').toLowerCase()} es ofrecer opciones exactas, compuestas, internacionales y modernas para mantener la conexión familiar sin presión.`,
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  familyName: string;
  relation: string;
  babyGender: string;
  exactMiddleName: string;
  compoundNames: string;
  variants: string;
  useAsInspiration: string;
  suggestionsFor: (name: string) => string;
  explanation: (relation: string) => string;
}>;

export const detailText = {
  pt: {
    backTo: 'Voltar para',
    shareOnWhatsApp: 'Compartilhar no WhatsApp',
    copyPage: 'Copiar página',
    pronunciation: 'Pronúncia',
    variants: 'Variações',
    compoundNames: 'Nomes compostos',
    similarNames: 'Nomes semelhantes',
    multilingualFit: 'Compatibilidade multilíngue',
    worksIn: 'funciona em',
    nameMeaningsNotice: 'Os significados dos nomes podem variar conforme a fonte. Use esta página como inspiração e depois verifique o contexto cultural, religioso e familiar antes de escolher um nome de bebê.',
  },
  en: {
    backTo: 'Back to',
    shareOnWhatsApp: 'Share on WhatsApp',
    copyPage: 'Copy page',
    pronunciation: 'Pronunciation',
    variants: 'Variants',
    compoundNames: 'Compound names',
    similarNames: 'Similar names',
    multilingualFit: 'Multilingual fit',
    worksIn: 'works in',
    nameMeaningsNotice: 'Name meanings can vary by source. Use this page as inspiration, then verify important cultural, religious, and family context before choosing a baby name.',
  },
  es: {
    backTo: 'Volver a',
    shareOnWhatsApp: 'Compartir por WhatsApp',
    copyPage: 'Copiar página',
    pronunciation: 'Pronunciación',
    variants: 'Variantes',
    compoundNames: 'Nombres compuestos',
    similarNames: 'Nombres similares',
    multilingualFit: 'Compatibilidad multilingüe',
    worksIn: 'funciona en',
    nameMeaningsNotice: 'Los significados de los nombres pueden variar según la fuente. Usa esta página como inspiración y luego verifica el contexto cultural, religioso y familiar antes de elegir un nombre de bebé.',
  },
} satisfies Record<Language, Record<string, string>>;

const genderLabels = {
  pt: { girl: 'Menina', boy: 'Menino', unisex: 'Unissex' },
  en: { girl: 'Girl', boy: 'Boy', unisex: 'Unisex' },
  es: { girl: 'Niña', boy: 'Niño', unisex: 'Unisex' },
} satisfies Record<Language, Record<Gender, string>>;

const styleLabels = {
  pt: { classic: 'Clássico', modern: 'Moderno', rare: 'Raro', short: 'Curto', strong: 'Forte', delicate: 'Delicado', biblical: 'Bíblico', international: 'Internacional' },
  en: { classic: 'Classic', modern: 'Modern', rare: 'Rare', short: 'Short', strong: 'Strong', delicate: 'Delicate', biblical: 'Biblical', international: 'International' },
  es: { classic: 'Clásico', modern: 'Moderno', rare: 'Raro', short: 'Corto', strong: 'Fuerte', delicate: 'Delicado', biblical: 'Bíblico', international: 'Internacional' },
} satisfies Record<Language, Record<NameStyle, string>>;

const relationLabels = {
  pt: { grandmother: 'Avó', grandfather: 'Avô', parent: 'Pai ou mãe', relative: 'Outro parente' },
  en: { grandmother: 'Grandmother', grandfather: 'Grandfather', parent: 'Parent', relative: 'Other relative' },
  es: { grandmother: 'Abuela', grandfather: 'Abuelo', parent: 'Padre o madre', relative: 'Otro familiar' },
} satisfies Record<Language, Record<string, string>>;

const languageLabels = {
  pt: { pt: 'Português', en: 'Inglês', es: 'Espanhol' },
  en: { pt: 'Portuguese', en: 'English', es: 'Spanish' },
  es: { pt: 'Portugués', en: 'Inglés', es: 'Español' },
} satisfies Record<Language, Record<Language, string>>;

const originLabels: Record<string, Record<Language, string>> = {
  Greek: { pt: 'Grego', en: 'Greek', es: 'Griego' },
  Latin: { pt: 'Latim', en: 'Latin', es: 'Latín' },
  Hebrew: { pt: 'Hebraico', en: 'Hebrew', es: 'Hebreo' },
  'Hebrew / Latin': { pt: 'Hebraico / Latim', en: 'Hebrew / Latin', es: 'Hebreo / Latín' },
  'Greek / Latin': { pt: 'Grego / Latim', en: 'Greek / Latin', es: 'Griego / Latín' },
};

const popularityLabels: Record<string, Record<Language, string>> = {
  'Popular in Brazil and internationally.': {
    pt: 'Popular no Brasil e internacionalmente.',
    en: 'Popular in Brazil and internationally.',
    es: 'Popular en Brasil e internacionalmente.',
  },
  'A familiar, easy-to-pronounce choice in Portuguese and Spanish.': {
    pt: 'Uma escolha familiar e fácil de pronunciar em português e espanhol.',
    en: 'A familiar, easy-to-pronounce choice in Portuguese and Spanish.',
    es: 'Una opción familiar y fácil de pronunciar en portugués y español.',
  },
  'A classic name with strong modern appeal.': {
    pt: 'Um nome clássico com forte apelo moderno.',
    en: 'A classic name with strong modern appeal.',
    es: 'Un nombre clásico con gran atractivo moderno.',
  },
  'One of the most traditional family honor names in Brazil.': {
    pt: 'Um dos nomes de homenagem familiar mais tradicionais do Brasil.',
    en: 'One of the most traditional family honor names in Brazil.',
    es: 'Uno de los nombres de homenaje familiar más tradicionales en Brasil.',
  },
  'Very popular in Brazil and widely understood in Spanish.': {
    pt: 'Muito popular no Brasil e amplamente compreendido em espanhol.',
    en: 'Very popular in Brazil and widely understood in Spanish.',
    es: 'Muy popular en Brasil y ampliamente entendido en español.',
  },
  'A beloved Portuguese family name with many international variants.': {
    pt: 'Um nome familiar português muito querido, com muitas variações internacionais.',
    en: 'A beloved Portuguese family name with many international variants.',
    es: 'Un nombre familiar portugués muy querido, con muchas variantes internacionales.',
  },
  'Traditional in Portuguese and Spanish families.': {
    pt: 'Tradicional em famílias portuguesas e espanholas.',
    en: 'Traditional in Portuguese and Spanish families.',
    es: 'Tradicional en familias portuguesas y españolas.',
  },
  'Short, international, and easy to use across languages.': {
    pt: 'Curto, internacional e fácil de usar em vários idiomas.',
    en: 'Short, international, and easy to use across languages.',
    es: 'Corto, internacional y fácil de usar en varios idiomas.',
  },
};

export function genderLabel(gender: Gender, language: Language): string {
  return genderLabels[language][gender];
}

export function styleLabel(style: NameStyle, language: Language): string {
  return styleLabels[language][style];
}

export function relationLabel(relation: string, language: Language): string {
  return (relationLabels[language] as Record<string, string>)[relation] ?? relation;
}

export function localizedLanguageLabel(value: Language, language: Language): string {
  return languageLabels[language][value];
}

export function originLabel(origin: string, language: Language): string {
  return originLabels[origin]?.[language] ?? origin;
}

export function popularityText(popularity: string | undefined, language: Language): string {
  if (!popularity) return '';
  return popularityLabels[popularity]?.[language] ?? popularity;
}
