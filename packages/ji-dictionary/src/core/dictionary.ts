import { makePairList } from '../lib/utils';
import Translator from './translator';

type ExcludeSameLanguagePairs<T extends string> =
  T extends `${infer L}-${infer R}` ? (L extends R ? never : T) : never;

type TPair<T extends string> = ExcludeSameLanguagePairs<`${T}-${T}`>;

type TDictionary<T extends object> = {
  [K in keyof T]: {
    readonly [L in keyof T[K]]: T[K][L];
  };
};

class Dictionary<
  T extends object,
  TLanguage extends keyof T[keyof T] = keyof T[keyof T],
> {
  public data: TDictionary<T>;
  private translators: Record<string, Translator> = {};

  constructor(dictionary: T) {
    this.data = dictionary;

    const languageWordRecordList = Object.values(dictionary);

    const languages = Object.keys(languageWordRecordList[0]);
    const languagePairList = makePairList(languages);

    languagePairList.forEach(([language1, language2]) => {
      const entries: [string, string][] = [];
      languageWordRecordList.forEach((languageWordRecord) => {
        const word1 = languageWordRecord[language1];
        const word2 = languageWordRecord[language2];
        entries.push([word1, word2]);
      });
      const translator = new Translator(entries);

      this.translators[`${language1}-${language2}`] = translator;
      this.translators[`${language2}-${language1}`] = translator;
    });
  }

  public getTranslator(languagePair: TPair<TLanguage & string>): Translator {
    return this.translators[languagePair];
  }
}

export default Dictionary;
