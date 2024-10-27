import Translator from './translator';

describe('Translator test', () => {
  const translator = new Translator([
    ['apple', '사과'],
    ['melon', '메론'],
  ]);

  it('should translate correctly in both directions', () => {
    const koApple = translator.translate('apple');
    expect(koApple).toBe('사과');

    const enApple = translator.translate('사과');
    expect(enApple).toBe('apple');

    const koMelon = translator.translate('melon');
    expect(koMelon).toBe('메론');

    const enMelon = translator.translate('메론');
    expect(enMelon).toBe('melon');
  });
});
