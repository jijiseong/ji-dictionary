type TDictionary = Record<string, string>;

class Dictionary {
  private dictionary: TDictionary;

  private reversedDictionary: TDictionary;

  constructor(words: TDictionary) {
    this.dictionary = words;

    const reverse = (object: TDictionary): TDictionary => {
      const reversedObject: TDictionary = {};
      Object.entries(object).forEach(([key, value]) => {
        reversedObject[value] = key;
      });
      return reversedObject;
    };

    this.reversedDictionary = reverse(words);
  }

  public translate(word: string) {
    if (!(word in this.dictionary)) {
      return this.reversedDictionary[word];
    }

    return this.dictionary[word];
  }
}

export default Dictionary;
