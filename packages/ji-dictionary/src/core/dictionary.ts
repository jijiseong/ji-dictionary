import Translator from './translator';

type TDictValue<
  TLanguage extends string = string,
  V extends string = string,
> = Record<TLanguage, V>;

type TDictionary<
  TDictKey extends string = string,
  TLanguage extends keyof TDictValue = keyof TDictValue,
  TValue extends TDictValue[keyof TDictValue] = TDictValue[keyof TDictValue],
> = Record<TDictKey, Record<TLanguage, TValue>>;

type TPair<T extends string, K extends string> = `${T}-${K}`;

class Dictionary<
  TDictKey extends string = string,
  TLanguage extends keyof TDictValue = string,
  TWord extends TDictValue[TLanguage] = string,
> {
  private dictionary: TDictionary<TDictKey, TLanguage, TWord>;
  private translators: Record<string, Translator> = {};

  constructor(dictionary: TDictionary<TDictKey, TLanguage, TWord>) {
    this.dictionary = dictionary;

    function makeLanguagePairKey(languages: TLanguage[]) {
      const pairs: [TLanguage, TLanguage][] = [];
      for (let i = 0; i < languages.length; i++) {
        for (let j = i + 1; j < languages.length; j++) {
          pairs.push([languages[i], languages[j]]);
        }
      }
      return pairs;
    }

    const languageWordRecordList =
      Object.values<Record<TLanguage, TWord>>(dictionary);

    const languages = Object.keys(languageWordRecordList[0]) as TLanguage[];
    const languagePairList = makeLanguagePairKey(languages);

    languagePairList.forEach(([language1, language2]) => {
      const entries: [TWord, TWord][] = [];
      languageWordRecordList.forEach((languageWordRecord) => {
        const word1: TWord = languageWordRecord[language1];
        const word2: TWord = languageWordRecord[language2];
        entries.push([word1, word2]);
      });
      const translator = new Translator(entries);

      this.translators[`${language1}-${language2}`] = translator;
    });
  }

  public get(language: TLanguage) {
    const selectedDict: Record<TDictKey, TWord> = Object.entries<TDictValue>(
      this.dictionary
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value[language],
      }),
      {} as Record<TDictKey, TWord>
    );
    return selectedDict;
  }

  public getTranslator(languagePair: TPair<TLanguage, TLanguage>) {
    return this.translators[languagePair];
  }

  // public getKey<T extends string>(word: TWord | T) {}
}

export default Dictionary;
