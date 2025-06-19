import { isValidRoman } from "./isValidRoman"; // Assuming index exports it, or direct path
import { expect } from "chai";

describe("isValidRoman", () => {
  describe("Standard Roman Numerals", () => {
    it("should return true for valid standard Roman numerals", () => {
      expect(isValidRoman("I")).to.be.true;
      expect(isValidRoman("MCMXCIV")).to.be.true;
      expect(isValidRoman("III")).to.be.true;
      expect(isValidRoman("XLII")).to.be.true;
      expect(isValidRoman("MMXXI")).to.be.true;
      expect(isValidRoman("MMMCMXCIX")).to.be.true;
      expect(isValidRoman("dclxvi")).to.be.true; // Lowercase
      expect(isValidRoman("MMMC")).to.be.true;
      expect(isValidRoman("CMXC")).to.be.true;
    });

    it("should return false for invalid standard Roman numerals", () => {
      expect(isValidRoman("INVALID")).to.be.false;
      expect(isValidRoman("IC")).to.be.false; // Invalid subtractive
      expect(isValidRoman("MMMM")).to.be.false; // Too many Ms
      expect(isValidRoman("IIII")).to.be.false; // Too many Is
      expect(isValidRoman("VV")).to.be.false;   // Repeated V
      expect(isValidRoman("CMC")).to.be.false;  // C cannot precede M after CM
      expect(isValidRoman("")).to.be.false;
      expect(isValidRoman("ABC")).to.be.false; // Non-Roman
      expect(isValidRoman("MABC")).to.be.false; // Mixed non-Roman
      expect(isValidRoman("ICL")).to.be.false; // Invalid subtractive pattern
    });
  });

  describe("Vinculum Notation Roman Numerals", () => {
    const OVERLINE = '\u0305';
    const V_BAR = `V${OVERLINE}`;
    const IV_BAR = `I${OVERLINE}V${OVERLINE}`;
    const X_BAR = `X${OVERLINE}`;
    const M_BAR = `M${OVERLINE}`;
    const C_BAR = `C${OVERLINE}`;
    const L_BAR = `L${OVERLINE}`;
    const D_BAR = `D${OVERLINE}`;

    const R_1234567_VALID = `${M_BAR}${C_BAR}${C_BAR}${X_BAR}${X_BAR}${X_BAR}I${OVERLINE}V${OVERLINE}DLXVII`;
    const R_3999999_VALID = `${M_BAR.repeat(3)}${C_BAR}${M_BAR}${X_BAR}${C_BAR}I${OVERLINE}X${OVERLINE}CMXCIX`;

    it("should return true for valid vinculum Roman numerals", () => {
      expect(isValidRoman(V_BAR)).to.be.true; // V̅ (5000)
      expect(isValidRoman(`${IV_BAR}CCCXXI`)).to.be.true; // I̅V̅CCCXXI (4321)
      expect(isValidRoman(R_1234567_VALID)).to.be.true; // M̅C̅C̅X̅X̅X̅I̅V̅DLXVII (1,234,567)
      expect(isValidRoman(R_3999999_VALID)).to.be.true; // M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX (3,999,999)
      expect(isValidRoman(X_BAR)).to.be.true; // X̅ (10000)
      expect(isValidRoman(`v${OVERLINE}i`)).to.be.true; // v̅i (lowercase, 5001)
      expect(isValidRoman(`${M_BAR.repeat(3)}CMXCIX`)).to.be.true; // M̅M̅M̅CMXCIX (3,000,999)
      expect(isValidRoman(`${C_BAR}${M_BAR}XC`)).to.be.true; // C̅M̅XC (900,090)
      expect(isValidRoman(`${V_BAR}M`)).to.be.true; // V̅M (6000)
      expect(isValidRoman(`I${OVERLINE}IV`)).to.be.true; // I̅IV (1004)
      expect(isValidRoman(`${M_BAR}CM`)).to.be.true; // M̅CM (1,000,900)
      expect(isValidRoman(`${M_BAR.repeat(2)}`)).to.be.true; // M̅M̅ (2,000,000)
      expect(isValidRoman(`${M_BAR}`)).to.be.true; // M̅ (1,000,000)
    });

    it("should return false for invalid vinculum Roman numerals or mixed content", () => {
      expect(isValidRoman(`M${V_BAR}`)).to.be.false; // Standard char M before vinculum part V̅
      expect(isValidRoman(`MMMM${OVERLINE}`)).to.be.false; // Vinculum part 'MMMM' is invalid
      expect(isValidRoman(`I${OVERLINE}C${OVERLINE}`)).to.be.false; // Vinculum part 'IC' is invalid
      expect(isValidRoman(`${V_BAR}I${V_BAR}`)).to.be.false; // Vinculum V̅ after standard I started parsing vinculum as false
      expect(isValidRoman(`${IV_BAR}${C_BAR}${M_BAR}${X_BAR}${L_BAR}${D_BAR}`)).to.be.false; // Vinculum 'IVCMXLD' is invalid
      expect(isValidRoman(`V${OVERLINE}${OVERLINE}`)).to.be.false; // Stray overline / double overline
      expect(isValidRoman(`VX${OVERLINE}I`)).to.be.false; // Standard V before vinculum X̅
      expect(isValidRoman(`CD${OVERLINE}I`)).to.be.false; // Vinculum D̅ after standard C started parsing vinculum as false
      expect(isValidRoman(`P${OVERLINE}`)).to.be.false; // Non-Roman char 'P' for vinculum
      expect(isValidRoman(OVERLINE)).to.be.false; // Only overline
      expect(isValidRoman(`${M_BAR}PQR`)).to.be.false; // 'PQR' is not a valid standard part
      expect(isValidRoman(`${M_BAR} M`)).to.be.false; // Space is not a Roman char
      expect(isValidRoman(`${M_BAR}${C_BAR}${OVERLINE}${OVERLINE}M`)).to.be.false; // Double overline / stray overline
      expect(isValidRoman(`IV${OVERLINE}`)).to.be.false; // 'I' standard, then V̅ tries to start - invalid order
      expect(isValidRoman(`I${OVERLINE}${OVERLINE}`)).to.be.false; // Double overline on I
      expect(isValidRoman(`${M_BAR}IIII`)).to.be.false; // Valid vinculum M̅, invalid standard IIII
      expect(isValidRoman(`MMMM${OVERLINE}I`)).to.be.false; // Invalid vinculum MMMM̅, valid standard I
      expect(isValidRoman(`I${OVERLINE}C${OVERLINE}L${OVERLINE}`)).to.be.false; // Vinculum 'ICL' invalid
      expect(isValidRoman(`${M_BAR.repeat(4)}`)).to.be.false; // M̅M̅M̅M̅ (vinculum part MMMM is invalid)
    });

    it("should return false for whitespace", () => {
        expect(isValidRoman(` ${V_BAR}`)).to.be.false;
        expect(isValidRoman(`${V_BAR} `)).to.be.false;
        expect(isValidRoman(`V ${OVERLINE}`)).to.be.false; // Space before overline
        expect(isValidRoman(`V${OVERLINE} M`)).to.be.false; // Space after vinculum part
    });
  });
});
