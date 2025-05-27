import { isValidRoman } from "./index";
import { expect } from "chai";

describe("isValidRoman", () => {
  it("should return true for valid Roman numerals", () => {
    expect(isValidRoman("MCMXCIV")).to.be.true;
    expect(isValidRoman("III")).to.be.true;
    expect(isValidRoman("XLII")).to.be.true;
    expect(isValidRoman("MMXXI")).to.be.true;
  });

  it("should return false for invalid Roman numerals", () => {
    expect(isValidRoman("INVALID")).to.be.false;
    expect(isValidRoman("IC")).to.be.false;
    expect(isValidRoman("MMMM")).to.be.false;
    expect(isValidRoman("")).to.be.false;
  });
});
