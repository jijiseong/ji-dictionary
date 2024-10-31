import { describe, expect, it } from '@jest/globals';
import { makePairList } from './utils';

describe('Utils test', () => {
  it('make pair list', () => {
    const array = ['en', 'ko', 'jp'];
    const pairList = makePairList(array);
    expect(pairList).toStrictEqual([
      ['en', 'ko'],
      ['en', 'jp'],
      ['ko', 'jp'],
    ]);
  });
});
