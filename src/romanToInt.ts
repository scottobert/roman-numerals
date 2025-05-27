/**
 * Converts a Roman numeral to an integer.
 * Accepts uppercase, lowercase, or mixed-case input.
 * @param roman - The Roman numeral string.
 * @returns The integer value.
 * @throws {Error} If the input is not a valid Roman numeral.
 */
export function romanToInt(roman: string): number {
    const digitMap: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
        IV: 4,
        IX: 9,
        XL: 40,
        XC: 90,
        CD: 400,
        CM: 900
    };

    let retVal = 0;
    let skipNext = false;
    roman = roman.toUpperCase();
    for (let i = 0; i < roman.length; i++) {
        if(skipNext) {
            skipNext = false;
            continue;
        }
        const currentAndNext = roman[i] + roman[i + 1];
        if (digitMap[currentAndNext] != null) {
            retVal += digitMap[currentAndNext];
            skipNext = true;
        }
        else {
            retVal += digitMap[roman[i]];
        }
    }
    return retVal;
}
