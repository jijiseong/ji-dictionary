import { describe, expect, it } from '@jest/globals';
import Dictionary from './dictionary';

describe('Dictionary 테스트', () => {
  it('should be translate forward', () => {
    const dict = new Dictionary({ apple: '사과', melon: '메론' });

    const value1 = dict.translate('apple');
    expect(value1).toBe('사과');

    const value2 = dict.translate('melon');
    expect(value2).toBe('메론');
  });

  it('should be translate backward', () => {
    const dict = new Dictionary({ apple: '사과', melon: '메론' });

    const value1 = dict.translate('사과');
    expect(value1).toBe('apple');

    const value2 = dict.translate('메론');
    expect(value2).toBe('melon');
  });

  it('should be case sensitive. (foward)', () => {
    const dict = new Dictionary({
      apple: '사과 소문자',
      Apple: '사과 대문자',
    });

    const value1 = dict.translate('apple');
    expect(value1).toBe('사과 소문자');

    const value2 = dict.translate('Apple');
    expect(value2).toBe('사과 대문자');
  });

  it('should be case sensitive. (backward)', () => {
    const dict = new Dictionary({
      apple: '사과 소문자',
      Apple: '사과 대문자',
    });

    const value3 = dict.translate('사과 대문자');
    expect(value3).toBe('Apple');

    const value4 = dict.translate('사과 소문자');
    expect(value4).toBe('apple');
  });

  it('should be return undefined about unexpected value.', () => {
    const dict = new Dictionary({
      apple: '사과',
      melon: '메론',
    });

    const value = dict.translate('banana');
    expect(value).toBeUndefined();
  });
});
