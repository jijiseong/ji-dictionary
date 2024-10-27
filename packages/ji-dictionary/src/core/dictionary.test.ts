import { describe, expect, it } from '@jest/globals';
import Dictionary from './dictionary';

describe('Dictionary test', () => {
  const dictionary = new Dictionary({
    apple: {
      en: 'APPLE',
      ko: '사과',
    },
    melon: {
      en: 'MELON',
      ko: '멜론',
    },
  });

  it('should be return valid word using get method', () => {
    const enApple = dictionary.get('en').apple;
    expect(enApple).toBe('APPLE');

    const koApple = dictionary.get('ko').apple;
    expect(koApple).toBe('사과');

    const enMelon = dictionary.get('en').melon;
    expect(enMelon).toBe('MELON');

    const koMelon = dictionary.get('ko').melon;
    expect(koMelon).toBe('멜론');
  });

  it("should correctly infer get's input type.", () => {
    // @ts-expect-error
    dictionary.get('jp');

    // @ts-expect-error
    dictionary.get('cn');
  });

  it("should correctly infer getTranslator's input type", () => {
    // @ts-expect-error
    dictionary.getTranslator('en');
    // @ts-expect-error
    dictionary.getTranslator('en-jp');
    // @ts-expect-error
    dictionary.getTranslator('enko');
    // @ts-expect-error
    dictionary.getTranslator('koen');
  });

  it('should translate', () => {
    const translator = dictionary.getTranslator('en-ko');

    const word1 = translator.translate('APPLE');
    expect(word1).toBe('사과');

    const word2 = translator.translate('사과');
    expect(word2).toBe('APPLE');

    const word3 = translator.translate('BANANA');
    expect(word3).toBeUndefined();
  });
});
