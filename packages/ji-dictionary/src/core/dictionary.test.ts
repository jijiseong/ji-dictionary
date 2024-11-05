import { describe, expect, it } from '@jest/globals';
import Dictionary from './dictionary';

const a = {
  a: 'a',
} as const;

const c = a.a;

describe('Dictionary test', () => {
  const createDictionary = () => {
    const dictionary = new Dictionary({
      apple: {
        en: 'APPLE',
        ko: '사과',
      },
      melon: {
        en: 'MELON',
        ko: '멜론',
      },
    } as const);

    return dictionary;
  };

  describe('get method test.', () => {
    it('should be return valid word using get method', () => {
      const dictionary = createDictionary();
      const enApple = dictionary.get('en').apple;

      expect(enApple).toEqual('APPLE');

      const koApple = dictionary.get('ko').apple;
      expect(koApple).toEqual('사과');

      const enMelon = dictionary.get('en').melon;
      expect(enMelon).toEqual('MELON');

      const koMelon = dictionary.get('ko').melon;
      expect(koMelon).toEqual('멜론');
    });

    it("should correctly infer get's input type.", () => {
      const dictionary = createDictionary();
      const appleEn: 'APPLE' = dictionary.data.apple.en;
      const appleKr: '사과' = dictionary.data.apple.ko;

      // @ts-expect-error
      dictionary.get('jp');

      // @ts-expect-error
      dictionary.get('cn');
    });
  });

  describe('getTranslator method test', () => {
    it("should correctly infer getTranslator's input type", () => {
      const dictionary = createDictionary();

      // @ts-expect-error
      dictionary.getTranslator('en');
      // @ts-expect-error
      dictionary.getTranslator('en-jp');
      // @ts-expect-error
      dictionary.getTranslator('enko');
      // @ts-expect-error
      dictionary.getTranslator('koen');
      // @ts-expect-error
      dictionary.getTranslator('ko-ko');
      // @ts-expect-error
      dictionary.getTranslator('en-en');
    });

    const testCases = [
      {
        description: 'should translate correctly for en-ko translator',
        locale: 'en-ko' as const,
        inputs: ['APPLE', '사과', 'BANANA'],
        expected: ['사과', 'APPLE', undefined],
      },
      {
        description: 'should translate correctly for ko-en translator',
        locale: 'ko-en' as const,
        inputs: ['APPLE', '사과', 'BANANA'],
        expected: ['사과', 'APPLE', undefined],
      },
    ];

    testCases.forEach(({ description, locale, inputs, expected }) => {
      it(description, () => {
        const dictionary = createDictionary();
        const translator = dictionary.getTranslator(locale);
        const results = inputs.map((input) => translator.translate(input));
        expect(results).toEqual(expected);
      });
    });
  });

  it('should infer union type correctly, when get value from dictionary', () => {
    const dictionary = createDictionary();

    // @ts-expect-error
    const apple1: '사과' = dictionary.data.apple.en;
    // @ts-expect-error
    const apple2: 'BANANA' = dictionary.data.apple.en;
    // @ts-expect-error
    const apple4: '메론' = dictionary.data.melon.en;

    const appleEn: 'APPLE' = dictionary.data.apple.en;
    expect(appleEn).toEqual('APPLE');
  });
});
