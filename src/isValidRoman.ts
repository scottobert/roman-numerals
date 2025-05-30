/**
 * Checks if a string is a valid Roman numeral, potentially including vinculum notation.
 * Vinculum notation uses an overline (U+0305) to multiply a character's value by 1000.
 * E.g., V̅ is 5000. M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX is 3,999,999.
 *
 * Rules for validation:
 * 1. An empty string is invalid.
 * 2. The numeral is processed case-insensitively.
 * 3. A vinculum part (overlined characters) must appear contiguously at the beginning.
 *    Once an non-overlined Roman character or any other character is encountered,
 *    the vinculum part is considered finished, and no more overlined chars are allowed.
 * 4. The characters forming the vinculum part (when overlines are removed) must
 *    itself be a valid Roman numeral representing 1-3999 (e.g., 'IV' for I̅V̅).
 * 5. The standard part (non-overlined, following the vinculum part) must also be
 *    a valid Roman numeral (e.g., 'CCCXXI'). This part can be empty.
 * 6. At least one part (vinculum or standard) must be present and valid.
 * 7. No stray overline characters are allowed in the standard part.
 *
 * @param romanWithVinculum The string to validate.
 * @returns True if valid, false otherwise.
 */

const ROMAN_CHARS_SET = "IVXLCDM"; // Renamed to avoid conflict if ROMAN_CHARS is global in some env
// Regex for a standard Roman numeral (1-3999 if non-empty).
// Allows empty string for helper, but main function logic determines if empty is okay for a given part.
const strictRomanRegexPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/**
 * Helper function to validate a Roman numeral segment.
 * @param segment The string segment to validate.
 * @param isEmptyAllowed Whether an empty segment is considered valid.
 * @returns True if the segment is valid according to Roman numeral rules, false otherwise.
 */
function _isValidRomanSegment(segment: string, isEmptyAllowed: boolean): boolean {
    if (segment.length === 0) {
        return isEmptyAllowed;
    }
    for (const char of segment) {
        if (!ROMAN_CHARS_SET.includes(char)) {
            return false; // Contains non-Roman characters
        }
    }
    return strictRomanRegexPattern.test(segment);
}

export function isValidRoman(romanWithVinculum: string): boolean {
    if (!romanWithVinculum || romanWithVinculum.length === 0) {
        return false;
    }

    const input = romanWithVinculum.toUpperCase();
    const OVERLINE_CHAR = '\u0305';

    let vinculumRomanChars = "";
    let standardRomanChars = "";
    let parsingVinculum = true;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const nextChar = input[i + 1];

        if (parsingVinculum && ROMAN_CHARS_SET.includes(char) && nextChar === OVERLINE_CHAR) {
            vinculumRomanChars += char;
            i++; // consume the overline character
        } else {
            if (parsingVinculum) {
                parsingVinculum = false;
            }
            if (char === OVERLINE_CHAR) {
                return false; // Stray overline in standard part or after non-Roman char.
            }
            standardRomanChars += char;
        }
    }

    // If input yielded no characters for either part (e.g. "@@@", "̅"), it's invalid.
    // This check is crucial because _isValidRomanSegment might return true for an empty segment
    // if isEmptyAllowed is true. We need to ensure that the *original input* wasn't effectively empty
    // of Roman numeral content.
    if (vinculumRomanChars.length === 0 && standardRomanChars.length === 0) {
        return false;
    }

    // Validate vinculum part: if it exists, it must be a non-empty valid Roman numeral (1-3999).
    // An empty vinculumRomanChars string is fine if standardRomanChars has content.
    if (vinculumRomanChars.length > 0) {
        if (!_isValidRomanSegment(vinculumRomanChars, false)) { // false: empty not allowed if part exists
            return false;
        }
    }

    // Validate standard part: must be a valid Roman numeral (can be empty, representing 0).
    // An empty standardRomanChars string is fine if vinculumRomanChars has content.
    if (!_isValidRomanSegment(standardRomanChars, true)) { // true: empty is allowed
        return false;
    }

    // If we reached here, all checks passed:
    // - Parsing separated vinculum and standard parts correctly.
    // - Vinculum part (if it has characters) is valid and non-empty by its Roman representation.
    // - Standard part is valid (can be empty).
    // - At least one of the parts was formed from actual Roman characters in the input.
    return true;
}
