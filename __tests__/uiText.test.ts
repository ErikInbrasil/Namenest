import { describe, expect, it } from 'vitest';
import { detailText, familyHonorText, generatorText, genderLabel, nameCardText, originLabel, popularityText, styleLabel } from '../lib/uiText';

describe('localized UI text', () => {
  it('localizes the name-card button, gender, style, origin, and popularity text', () => {
    expect(nameCardText.pt.viewName).toBe('Ver nome');
    expect(nameCardText.es.viewName).toBe('Ver nombre');
    expect(genderLabel('girl', 'es')).toBe('Niña');
    expect(styleLabel('biblical', 'pt')).toBe('Bíblico');
    expect(originLabel('Greek / Latin', 'es')).toBe('Griego / Latín');
    expect(popularityText('Very popular in Brazil and widely understood in Spanish.', 'pt')).toBe('Muito popular no Brasil e amplamente compreendido em espanhol.');
  });

  it('localizes generator form text for Portuguese and Spanish', () => {
    expect(generatorText.pt.gender).toBe('Gênero');
    expect(generatorText.pt.languageFitAll).toBe('Português + inglês + espanhol');
    expect(generatorText.es.title).toBe('Genera nombres de bebé por estilo e idioma');
    expect(generatorText.es.any).toBe('Cualquiera');
  });

  it('localizes family-honor and detail-page text', () => {
    expect(familyHonorText.es.familyName).toBe('Nombre familiar');
    expect(familyHonorText.pt.suggestionsFor('Maria')).toBe('Sugestões para Maria');
    expect(detailText.es.copyPage).toBe('Copiar página');
    expect(detailText.pt.nameMeaningsNotice).toContain('significados dos nomes');
  });
});
