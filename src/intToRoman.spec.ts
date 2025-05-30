import { expect } from 'chai';
import { intToRoman } from "./intToRoman";

describe('intToRoman', () => {
    describe('Standard Numerals (no vinculum or useVinculum: false)', () => {
        it('should error for numbers < 1', () => {
            // The error message changed in the implementation to be more specific with RangeError
            expect(() => intToRoman(0)).to.throw(`Input number 0 is out of range (1-3999).`);
            expect(() => intToRoman(-1)).to.throw(`Input number -1 is out of range (1-3999).`);
        });

        it('should error for numbers > 3999 when useVinculum is false or not provided', () => {
            expect(() => intToRoman(4000)).to.throw(`Input number 4000 is out of range (1-3999).`);
            expect(() => intToRoman(4000, { useVinculum: false })).to.throw(`Input number 4000 is out of range (1-3999).`);
        });

        const testCases = [
            { input: 1, expected: 'I' },
            { input: 3, expected: 'III' },
            { input: 4, expected: 'IV' },
            { input: 5, expected: 'V' },
            { input: 9, expected: 'IX' },
            { input: 10, expected: 'X' },
            { input: 40, expected: 'XL' },
            { input: 50, expected: 'L' },
            { input: 90, expected: 'XC' },
            { input: 100, expected: 'C' },
            { input: 400, expected: 'CD' },
            { input: 500, expected: 'D' },
            { input: 900, expected: 'CM' },
            { input: 1000, expected: 'M' },
            { input: 58, expected: 'LVIII' },
            { input: 1994, expected: 'MCMXCIV' },
            { input: 3999, expected: 'MMMCMXCIX' }
        ];

        testCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for ${input} without options`, () => {
                expect(intToRoman(input)).to.equal(expected);
            });
            it(`should return ${expected} for ${input} with useVinculum: false`, () => {
                expect(intToRoman(input, { useVinculum: false })).to.equal(expected);
            });
        });

        it('should return lowercase Roman numerals when requested (no vinculum)', () => {
            expect(intToRoman(14, { lowercase: true })).to.equal('xiv');
            expect(intToRoman(1994, { lowercase: true, useVinculum: false })).to.equal('mcmxciv');
        });
    });

    describe('Vinculum Notation (useVinculum: true)', () => {
        const OVERLINE = '\u0305';
        const IV_BAR = `I${OVERLINE}V${OVERLINE}`;
        const V_BAR = `V${OVERLINE}`;
        const X_BAR = `X${OVERLINE}`;
        const M_BAR = `M${OVERLINE}`;
        const C_BAR = `C${OVERLINE}`;

        it('should error for numbers < 1 when useVinculum is true', () => {
            expect(() => intToRoman(0, { useVinculum: true })).to.throw(`Input number 0 is out of range (1-3999999).`);
            expect(() => intToRoman(-1, { useVinculum: true })).to.throw(`Input number -1 is out of range (1-3999999).`);
        });

        it('should error for numbers > 3,999,999 when useVinculum is true', () => {
            expect(() => intToRoman(4000000, { useVinculum: true })).to.throw(`Input number 4000000 is out of range (1-3999999).`);
        });

        it(`should correctly convert numbers >= 4000 using vinculum`, () => {
            expect(intToRoman(4000, { useVinculum: true })).to.equal(IV_BAR); // 4_bar
            expect(intToRoman(4321, { useVinculum: true })).to.equal(`${IV_BAR}CCCXXI`); // 4_bar CCCXXI
            expect(intToRoman(5000, { useVinculum: true })).to.equal(V_BAR);   // 5_bar
            expect(intToRoman(10000, { useVinculum: true })).to.equal(X_BAR);  // 10_bar
            // 12_bar CCCXLV = X_bar II_bar CCCXLV
            const XII_BAR = `${X_BAR}I${OVERLINE}I${OVERLINE}`;
            expect(intToRoman(12345, { useVinculum: true })).to.equal(`${XII_BAR}CCCXLV`);
        });
        
        const MCCXXXIV_BAR = `${M_BAR}${C_BAR}${C_BAR}${X_BAR}${X_BAR}${X_BAR}I${OVERLINE}V${OVERLINE}`; // 1234_bar
        it(`should convert 1,234,567 to ${MCCXXXIV_BAR}DLXVII`, () => {
            expect(intToRoman(1234567, { useVinculum: true })).to.equal(`${MCCXXXIV_BAR}DLXVII`);
        });

        // MMMCMXCIX_bar = M_bar M_bar M_bar CM_bar XC_bar IX_bar
        const MMMCMXCIX_BAR = `${M_BAR.repeat(3)}${C_BAR}${M_BAR}${X_BAR}${C_BAR}I${OVERLINE}X${OVERLINE}`;
        it(`should convert 3,999,999 to ${MMMCMXCIX_BAR}CMXCIX`, () => {
            expect(intToRoman(3999999, { useVinculum: true })).to.equal(`${MMMCMXCIX_BAR}CMXCIX`);
        });
        
        it('should handle numbers < 4000 as standard numerals even when useVinculum is true', () => {
            expect(intToRoman(1, { useVinculum: true })).to.equal('I');
            expect(intToRoman(1994, { useVinculum: true })).to.equal('MCMXCIV');
            expect(intToRoman(3999, { useVinculum: true })).to.equal('MMMCMXCIX');
        });

        it('should work with lowercase: true and useVinculum: true', () => {
            expect(intToRoman(4000, { useVinculum: true, lowercase: true })).to.equal(IV_BAR.toLowerCase());
            expect(intToRoman(5000, { useVinculum: true, lowercase: true })).to.equal(V_BAR.toLowerCase());
            expect(intToRoman(1234567, { useVinculum: true, lowercase: true })).to.equal(`${MCCXXXIV_BAR}DLXVII`.toLowerCase());
            expect(intToRoman(3999, { useVinculum: true, lowercase: true })).to.equal('mmmcmxcix'); // < 4000
        });
    });
});
