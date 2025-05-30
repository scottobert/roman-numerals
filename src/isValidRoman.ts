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

const ROMAN_CHARS_SET = "IVXLCDM";
const OVERLINE_CHAR = '\u0305';
// Regex for a standard Roman numeral (1-3999 if non-empty).
const strictRomanRegexPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

interface ParseSegmentsResult {
    vinculumChars: string;
    standardChars: string;
    parsingError: boolean;
}

/**
 * Parses the input string into vinculum and standard segments.
 * @param input The uppercased input string.
 * @returns An object containing vinculumChars, standardChars, and a parsingError flag.
 */
function _parseInputIntoSegments(input: string): ParseSegmentsResult {
    let vinculumChars = "";
    let standardChars = "";
    let parsingVinculum = true;
    let parsingError = false;
    let i = 0;

    while (i < input.length) {
        const char = input[i];
        const nextChar = (i + 1 < input.length) ? input[i + 1] : null;

        if (parsingVinculum && ROMAN_CHARS_SET.includes(char) && nextChar === OVERLINE_CHAR) {
            vinculumChars += char;
            i += 2; // Consumed char and its overline
        } else {
            if (parsingVinculum) {
                parsingVinculum = false; // Transition from vinculum to standard parsing
            }
            if (char === OVERLINE_CHAR) {
                parsingError = true; // Stray overline
                break; 
            }
            standardChars += char;
            i += 1; // Consumed a single standard character
        }
    }
    return { vinculumChars, standardChars, parsingError };
}

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
    const parseResult = _parseInputIntoSegments(input);

    if (parseResult.parsingError) {
        return false;
    }

    const { vinculumChars, standardChars } = parseResult;

    // If input yielded no characters for either part (e.g. "@@@", "̅" alone), it's invalid.
    if (vinculumChars.length === 0 && standardChars.length === 0) {
        return false;
    }

    // Validate vinculum part: if it exists, it must be a non-empty valid Roman numeral.
    if (vinculumChars.length > 0) {
        if (!_isValidRomanSegment(vinculumChars, false)) { // false: empty not allowed if part exists
            return false;
        }
    }

    // Validate standard part: must be a valid Roman numeral (can be empty).
    if (!_isValidRomanSegment(standardChars, true)) { // true: empty is allowed
        return false;
    }
    
    return true;
}
