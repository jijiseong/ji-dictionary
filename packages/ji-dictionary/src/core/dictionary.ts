type TDictionary<K extends string, V extends string> = Record<K, V>;

class Dictionary<K extends string = string, V extends string = string> {
  private dictionary: TDictionary<K, V>;

  private reversedDictionary: TDictionary<V, K>;

  constructor(words: TDictionary<K, V>) {
    this.dictionary = words;
    this.reversedDictionary = this.reverse(words);
  }

  private reverse(object: TDictionary<K, V>): TDictionary<V, K> {
    return Object.entries<V>(object).reduce<TDictionary<V, K>>(
      (acc, [key, value]) => ({
        ...acc,
        [value]: key,
      }),
      {} as TDictionary<V, K>
    );
  }

  private isKeyType(word: K | V): word is K {
    return word in this.dictionary;
  }

  public translate(word: K | V) {
    if (!this.isKeyType(word)) {
      return this.reversedDictionary[word];
    }

    return this.dictionary[word];
  }
}

export default Dictionary;
