import { makePairList } from '../lib/utils';
import Translator from './translator';

type ExcludeSameLanguagePairs<T extends string> =
  T extends `${infer L}-${infer R}` ? (L extends R ? never : T) : never;

type TPair<T extends string> = ExcludeSameLanguagePairs<`${T}-${T}`>;

class Dictionary<
  TDictKey extends string = string,
  TLanguage extends string = string,
  TWord extends string = string,
> {
  private dictionary: Record<TDictKey, Record<TLanguage, TWord>>;
  private translators: Record<string, Translator> = {};

  constructor(dictionary: Record<TDictKey, Record<TLanguage, TWord>>) {
    this.dictionary = dictionary;

    const languageWordRecordList =
      Object.values<Record<string, TWord>>(dictionary);

    const languages = Object.keys(languageWordRecordList[0]);
    const languagePairList = makePairList(languages);

    languagePairList.forEach(([language1, language2]) => {
      const entries: [TWord, TWord][] = [];
      languageWordRecordList.forEach((languageWordRecord) => {
        const word1: TWord = languageWordRecord[language1];
        const word2: TWord = languageWordRecord[language2];
        entries.push([word1, word2]);
      });
      const translator = new Translator(entries);

      this.translators[`${language1}-${language2}`] = translator;
      this.translators[`${language2}-${language1}`] = translator;
    });
  }

  public get<L extends TLanguage>(language: L) {
    const selectedDict: Record<TDictKey, Record<TLanguage, TWord>[L]> =
      Object.entries<Record<TLanguage, TWord>>(this.dictionary).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value[language],
        }),
        {} as Record<TDictKey, TWord>
      );
    return selectedDict;
  }

  public getTranslator(languagePair: TPair<TLanguage>): Translator {
    return this.translators[languagePair];
  }
}

export default Dictionary;
