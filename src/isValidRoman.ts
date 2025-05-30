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
export function isValidRoman(romanWithVinculum: string): boolean {
    if (!romanWithVinculum || romanWithVinculum.length === 0) {
        return false;
    }

    const input = romanWithVinculum.toUpperCase();
    const OVERLINE_CHAR = '\u0305';
    const ROMAN_CHARS = "IVXLCDM";

    let vinculumRomanChars = "";
    let standardRomanChars = "";
    let parsingVinculum = true;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const nextChar = input[i + 1];

        if (parsingVinculum && ROMAN_CHARS.includes(char) && nextChar === OVERLINE_CHAR) {
            vinculumRomanChars += char;
            i++; // consume the overline character
        } else {
            // If we were parsing vinculum and encounter a non-overlined Roman char or any other char,
            // switch to standard part.
            if (parsingVinculum) {
                parsingVinculum = false;
            }
            // If we are now in standard part and see an overline, it's an error.
            if (char === OVERLINE_CHAR) {
                return false; // Stray overline in standard part or after non-Roman char.
            }
            standardRomanChars += char;
        }
    }
    
    // After loop, standardRomanChars should not contain any OVERLINE_CHAR.
    // This is handled by the `if (char === OVERLINE_CHAR)` check inside the loop
    // when `parsingVinculum` is false.

    // Regex for a standard Roman numeral (1-3999 if non-empty).
    // Allows empty string because parts can be optional, and regex itself will validate content.
    const strictRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    // 1. Validate vinculumRomanChars
    if (vinculumRomanChars.length > 0) {
        for (const vChar of vinculumRomanChars) {
            if (!ROMAN_CHARS.includes(vChar)) {
                return false; // Invalid (non-Roman) character in vinculum part string
            }
        }
        // Check if the sequence of Roman characters is valid (1-3999)
        if (!strictRomanRegex.test(vinculumRomanChars)) {
            return false; // Vinculum part's Roman characters are not a valid numeral structure
        }
    }

    // 2. Validate standardRomanChars
    if (standardRomanChars.length > 0) {
        for (const sChar of standardRomanChars) {
            if (!ROMAN_CHARS.includes(sChar)) {
                return false; // Invalid (non-Roman) character in standard part string
            }
        }
        // Check if the sequence of Roman characters is valid (0-3999)
        // The regex matches empty string (value 0) or a valid numeral.
        if (!strictRomanRegex.test(standardRomanChars)) {
            return false; // Standard part's Roman characters are not a valid numeral structure
        }
    }

    // 3. At least one of the parts must be non-empty.
    //    (Ensures that input like "PQR" or just a single "\u0305" which result in both empty, is invalid)
    if (vinculumRomanChars.length === 0 && standardRomanChars.length === 0) {
        return false;
    }

    // 4. If we've reached here, the structure is valid according to the rules.
    //    - Vinculum part (if present) contains only Roman chars and forms a valid 1-3999 numeral.
    //    - Standard part (if present) contains only Roman chars and forms a valid 0-3999 numeral.
    //    - Vinculum part is contiguous and at the beginning. No stray overlines.
    //    - At least one part is present.
    return true;
}