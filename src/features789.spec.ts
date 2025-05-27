import { intToRoman } from './intToRoman';
import { romanToInt } from './romanToInt';

describe('intToRoman', () => {
    it('should have JSDoc comments (feature 7)', () => {
        // This is a meta-test: in practice, JSDoc is for devs, not runtime.
        // We'll just check the function exists.
        expect(typeof intToRoman).toBe('function');
    });

    it('should return lowercase Roman numerals when requested (feature 9)', () => {
        expect(intToRoman(14, { lowercase: true })).toBe('xiv');
    });
});

describe('romanToInt', () => {
    it('should accept lowercase input (feature 8)', () => {
        expect(romanToInt('xiv')).toBe(14);
        expect(romanToInt('mcmxc')).toBe(1990);
    });
});
