# ji-dictionary

## Description

You can manage contants more easily using `ji-dictionary`.

typescript friendly.

## Installation

```
npm install ji-dictionary
```

or

```
pnpm add ji-dictionary
```

or

```
yarn add ji-dictionary
```

## basic usage

`Dictionary` receives object follwing interface.

```ts
{
    [key: TDictKey] : {
        [language: TLanguage] : [word: TWord]
    }
}
```

```ts
import { Dictionary } from 'ji-dictionary';

const dictionary = new Dictionary({
  apple: {
    en: 'APPLE',
    ko: '사과',
  },
  melon: {
    en: 'MELON',
    ko: '메론',
  },
});
```

In this case,

- `TLanguage` is infered as `"en" | "ko"`.
- `TWord` is infered as `"APPLE" | "MELON" | "메론" | "사과"`.
- `TDictKey` is infered as `"apple" | "melon"`

There is no limit to the number of languages.

## Methods

### get(language: TLanguage): TWord

```ts
dictionary.get('en').apple; // returns 'APPLE'
dictionary.get('ko').melon; // returns 'MELON'
```

### getTranslator(languagePair: \`\$\{TLanguage}-\$\{TLanguage}\`): Translator

getTranslator returns `Translator`.  
`Translator` can translate word to another language's word.  
It is based on [`Map`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map) object.

```ts
dictionary.getTranslator('en-ko').translate('APPLE'); // returns "사과"
dictionary.getTranslator('en-ko').translate('사과'); // returns "APPLE"
```

Either using 'en-ko' or 'ko-en' gives the same result.
You can use the anyone.

```ts
dictionary.getTranslator('ko-en').translate('APPLE'); // returns "사과"
dictionary.getTranslator('ko-en').translate('사과'); // returns "APPLE"
```
