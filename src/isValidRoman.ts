/**
 * Checks if a string is a valid Roman numeral.
 * @param roman The string to validate.
 * @returns True if valid, false otherwise.
 */
export function isValidRoman(roman: string): boolean {
    // Valid Roman numerals: I, V, X, L, C, D, M, with correct order and repetition
    const romanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romanRegex.test(roman);
  }