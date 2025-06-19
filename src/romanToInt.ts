/**
 * Converts a Roman numeral, potentially with vinculum notation, to an integer.
 * Accepts uppercase, lowercase, or mixed-case input.
 * Overlined characters (e.g., V̅, X̅) are treated as their value multiplied by 1000.
 * For example, 'V̅' is 5000, 'M̅C̅M̅CDXXI' is 1,900,421.
 * @param romanWithVinculum - The Roman numeral string, possibly with U+0305 for overlines.
 * @returns The integer value.
 */
export function romanToInt(romanWithVinculum: string): number {
    const digitMap: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
        // Subtractive pairs - these are handled by the parsing logic now
        // IV: 4,
        // IX: 9,
        // XL: 40,
        // XC: 90,
        // CD: 400,
        // CM: 900
    };

    const OVERLINE_CHAR = '\u0305';
    const input = romanWithVinculum.toUpperCase();

    let vinculumChars = "";
    let standardChars = "";
    let i = 0;

    while (i < input.length) {
        const char = input[i];
        // Check bounds for nextChar carefully: i + 1 must be strictly less than input.length
        const nextChar = (i + 1 < input.length) ? input[i + 1] : null;

        if (nextChar === OVERLINE_CHAR && digitMap[char]) { // Check digitMap[char] to ensure 'char' is a Roman numeral base
            vinculumChars += char;
            i += 2; // Consumed char and its overline
        } else {
            standardChars += char;
            i += 1; // Consumed a single standard character (or a non-Roman char, or a Roman char not part of a vinculum pair)
        }
    }

    // Helper function to apply the core Roman numeral parsing logic
    const parseSegment = (segment: string): number => {
        let value = 0;
        let i = 0;
        while (i < segment.length) {
            const char = segment[i];
            const nextChar = segment[i + 1];

            const charVal = digitMap[char] || 0;
            const nextCharVal = digitMap[nextChar] || 0;

            // Check for subtractive pairs (IV, IX, XL, XC, CD, CM)
            // Ensure charVal and nextCharVal are positive to prevent subtractive logic with 0 values
            if (nextCharVal > 0 && charVal > 0 && charVal < nextCharVal) {
                value += nextCharVal - charVal;
                i += 2;
            } else {
                value += charVal;
                i += 1;
            }
        }
        return value;
    };

    let totalValue = 0;
    const vinculumSegmentValue = parseSegment(vinculumChars);
    if (vinculumSegmentValue > 0) {
        totalValue += vinculumSegmentValue * 1000;
    }

    const standardSegmentValue = parseSegment(standardChars);
    if (standardSegmentValue > 0) {
        totalValue += standardSegmentValue;
    }
    
    return totalValue;
}
