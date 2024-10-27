class Translator {
  private forwardMap;
  private reverseMap;

  constructor(entries: [string, string][]) {
    const forwardEntries = entries;
    const reverseEntries: [string, string][] = entries.map(([str1, str2]) => [
      str2,
      str1,
    ]);

    this.forwardMap = new Map(forwardEntries);
    this.reverseMap = new Map(reverseEntries);
  }

  public set(key: string, value: string) {
    this.forwardMap.set(key, value);
    this.reverseMap.set(value, key);
  }

  public translate(key: string) {
    return this.forwardMap.get(key) || this.reverseMap.get(key);
  }

  private getForward(key: string) {
    return this.forwardMap.get(key);
  }

  private getReverse(value: string) {
    return this.reverseMap.get(value);
  }
}

export default Translator;
