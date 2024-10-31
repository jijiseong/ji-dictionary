import { describe, expect, it } from '@jest/globals';
import Dictionary from './dictionary';

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
    });

    return dictionary;
  };

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

    // @ts-expect-error
    dictionary.get('jp');

    // @ts-expect-error
    dictionary.get('cn');
  });

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

  describe('getTranslator', () => {
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
});
