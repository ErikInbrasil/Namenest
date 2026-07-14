export type Language = 'pt' | 'en' | 'es';
export type Gender = 'girl' | 'boy' | 'unisex';
export type NameStyle = 'classic' | 'modern' | 'rare' | 'short' | 'strong' | 'delicate' | 'biblical' | 'international';

export interface BabyName {
  slug: string;
  name: string;
  gender: Gender;
  origin: string;
  languages: Record<Language, boolean>;
  meanings: Record<Language, string>;
  pronunciations: Partial<Record<Language, string>>;
  styles: NameStyle[];
  themes: string[];
  variants: string[];
  similar: string[];
  compounds: string[];
  popularity?: string;
}

export interface GenerateOptions {
  gender?: Gender;
  languages?: Language[];
  style?: NameStyle;
  theme?: string;
  limit?: number;
}
