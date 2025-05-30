/**
 * Converts an integer to a Roman numeral.
 * @param num - The integer to convert (1-3999 or 1-3,999,999 with useVinculum).
 * @param options - Optional settings.
 * @param options.lowercase - If true, returns the numeral in lowercase.
 * @param options.useVinculum - If true, supports numbers up to 3,999,999 using vinculum notation.
 * @returns The Roman numeral as a string.
 * @throws {RangeError} If num is out of range.
 */
export function intToRoman(num: number, options?: { lowercase?: boolean; useVinculum?: boolean }): string {
    const max = options?.useVinculum ? 3999999 : 3999;
    if (num < 1 || num > max) {
        throw new RangeError(`Input number ${num} is out of range (1-${max}).`);
    }

    if (options?.useVinculum && num >= 4000) {
        const thousandsPart = Math.floor(num / 1000);
        const remainderPart = num % 1000;

        let thousandsRoman = intToRoman(thousandsPart, { lowercase: options?.lowercase, useVinculum: false });
        let remainderRoman = '';

        if (remainderPart > 0) {
            remainderRoman = intToRoman(remainderPart, { lowercase: options?.lowercase, useVinculum: false });
        }

        // Add overline to each character of the thousands part
        thousandsRoman = thousandsRoman.split('').map(char => char + '\u0305').join('');

        const result = thousandsRoman + remainderRoman;
        return options?.lowercase ? result.toLowerCase() : result;
    }

    const romanMap: {[id: string]: string} = {
        '1': 'I',
        '4': 'IV',
        '5': 'V',
        '9': 'IX',
        '10': 'X',
        '40': 'XL',
        '50': 'L',
        '90': 'XC',
        '100': 'C',
        '400': 'CD',
        '500': 'D',
        '900': 'CM',
        '1000': 'M'
    };
    let result = '';
    while(num > 0) {
        const number = Object.keys(romanMap).filter(key => num >= parseInt(key)).sort((a,b) => parseInt(b) - parseInt(a))[0];
        if(number) {
            result += romanMap[number];
            num -= parseInt(number);
        }
    }
    if (options?.lowercase) return result.toLowerCase();
    return result;
}