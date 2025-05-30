import { romanToInt } from './romanToInt';
import { expect } from 'chai';

describe('romanToInt', () => {
    describe('Standard Numerals', () => {
        const testCases = [
            { input: 'I', expected: 1 },
            { input: 'III', expected: 3 },
            { input: 'IV', expected: 4 },
            { input: 'V', expected: 5 },
            { input: 'IX', expected: 9 },
            { input: 'X', expected: 10 },
            { input: 'XL', expected: 40 },
            { input: 'L', expected: 50 },
            { input: 'XC', expected: 90 },
            { input: 'C', expected: 100 },
            { input: 'CD', expected: 400 },
            { input: 'D', expected: 500 },
            { input: 'CM', expected: 900 },
            { input: 'M', expected: 1000 },
            { input: 'LVIII', expected: 58 },
            { input: 'MCMXCIV', expected: 1994 },
            { input: 'MMMCMXCIX', expected: 3999 }
        ];

        testCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for ${input}`, () => {
                expect(romanToInt(input)).to.equal(expected);
            });
        });

        it('should accept lowercase input', () => {
            expect(romanToInt('xiv')).to.equal(14);
            expect(romanToInt('mcmxc')).to.equal(1990);
            expect(romanToInt('mmmcmxcix')).to.equal(3999);
        });

        it('should accept mixed-case input', () => {
            // XLIIV = XL (40) + IIV (I before IV, so I + IV = 1 + 4 = 5). Total = 45.
            // The previous expectation of 47 (XL + II + V) is non-standard parsing.
            expect(romanToInt('XlIiV')).to.equal(45); 
            expect(romanToInt('McMxcIv')).to.equal(1994);
        });

        it('should handle empty string by returning 0', () => {
            expect(romanToInt('')).to.equal(0);
        });

        it('should handle non-Roman characters by summing values of valid Roman characters found', () => {
            expect(romanToInt('ABC')).to.equal(100); // C = 100, A & B are ignored (value 0)
            expect(romanToInt('XAX')).to.equal(20); // X + X = 20, A is ignored
            expect(romanToInt('MCDPQRS')).to.equal(1400); // MCD = 1400, P,Q,R,S ignored
        });
    });

    describe('Vinculum Notation', () => {
        const OVERLINE = '\u0305';
        const V_BAR = `V${OVERLINE}`;
        const IV_BAR = `I${OVERLINE}V${OVERLINE}`;
        const X_BAR = `X${OVERLINE}`;
        const M_BAR = `M${OVERLINE}`;
        const C_BAR = `C${OVERLINE}`;

        const MCCXXXIV_BAR = `${M_BAR}${C_BAR}${C_BAR}${X_BAR}${X_BAR}${X_BAR}I${OVERLINE}V${OVERLINE}`; // 1234_bar
        const MMMCMXCIX_BAR = `${M_BAR.repeat(3)}${C_BAR}${M_BAR}${X_BAR}${C_BAR}I${OVERLINE}X${OVERLINE}`; // 3999_bar

        const vinculumTestCases = [
            { input: IV_BAR, expected: 4000, description: 'I̅V̅ (4000)' },
            { input: V_BAR, expected: 5000, description: 'V̅ (5000)' },
            { input: X_BAR, expected: 10000, description: 'X̅ (10000)' },
            { input: `${IV_BAR}CCCXXI`, expected: 4321, description: 'I̅V̅CCCXXI (4321)' },
            { input: `${MCCXXXIV_BAR}DLXVII`, expected: 1234567, description: 'M̅C̅C̅X̅X̅X̅I̅V̅DLXVII (1,234,567)' },
            { input: `${MMMCMXCIX_BAR}CMXCIX`, expected: 3999999, description: 'M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX (3,999,999)' },
            { input: `M${V_BAR}CDXXI`, expected: 6421, description: 'MV̅CDXXI (1000 + 5000 + 421 = 6421)' },
            { input: `${M_BAR}${C_BAR}${M_BAR}CDXXI`, expected: 1900421, description: 'M̅C̅M̅CDXXI (1,900,000 + 421)' }, // MCM_bar CDXXI
            { input: `${C_BAR}${M_BAR}XC`, expected: 900090, description: 'C̅M̅XC (900,000 + 90)' }, // CM_bar XC
            { input: `${M_BAR.repeat(3)}`, expected: 3000000, description: 'M̅M̅M̅ (3,000,000)' },
            { input: `v${OVERLINE}`, expected: 5000, description: 'v̅ (lowercase, 5000)' },
            { input: `i${OVERLINE}v${OVERLINE}cccxxi`, expected: 4321, description: 'i̅v̅cccxxi (lowercase, 4321)' },
            { input: `${M_BAR.toLowerCase()}${C_BAR.toLowerCase()}${M_BAR.toLowerCase()}cdxxi`, expected: 1900421, description: 'm̅c̅m̅cdxxi (lowercase M̅C̅M̅CDXXI)' },
            { input: `${C_BAR}m${OVERLINE}Xc`, expected: 900090, description: 'C̅m̅Xc (mixed case C̅M̅XC)' },
            { input: `${M_BAR}P${OVERLINE}C`, expected: 1000100, description: 'M̅P̅C (P is not Roman, ignored, M_bar C = 1,000,100)' },
            { input: `X${OVERLINE}Y${OVERLINE}Z`, expected: 10000, description: 'X̅Y̅Z (Y, Z ignored, X_bar = 10,000)' },
            { input: `V${OVERLINE}${OVERLINE}`, expected: 5000, description: 'V̅̅ (double overline, second ignored, V_bar = 5000)' },
            { input: `XV${OVERLINE}`, expected: 5010, description: 'XV̅ (X + V_bar = 10 + 5000 = 5010)' },
            { input: `V${OVERLINE}X`, expected: 5010, description: 'V̅X (V_bar + X = 5000 + 10 = 5010)' },
            { input: `I${OVERLINE}I${OVERLINE}I`, expected: 2001, description: 'I̅I̅I (I_bar + I_bar + I = 1000 + 1000 + 1 = 2001)' },
        ];

        vinculumTestCases.forEach(({ input, expected, description }) => {
            it(`should return ${expected} for ${description}`, () => {
                expect(romanToInt(input)).to.equal(expected);
            });
        });

        it('should handle vinculum characters mixed with non-Roman characters', () => {
            // M_bar A_bar B_bar CDE -> M_bar (A,B ignored) C D (E ignored)
            // 1000*1000 + 100 + 500 = 1,000,000 + 400 (CD is subtractive here) = 1,000,400
            expect(romanToInt(`${M_BAR}A${OVERLINE}B${OVERLINE}CDE`)).to.equal(1000400);
        });
    });
});
