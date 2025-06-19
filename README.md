<h1 align="center">Welcome to @scottobert/roman-numerals 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/scottobert/roman-numerals#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/scottobert/roman-numerals/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/scottobert/roman-numerals/blob/master/LICENSE" target="_blank">
    <img alt="License: GPL--2.0" src="https://img.shields.io/github/license/scottobert/@scottobert/roman-numerals" />
  </a>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=scottobert_roman-numerals&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=scottobert_roman-numerals)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=scottobert_roman-numerals&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=scottobert_roman-numerals)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=scottobert_roman-numerals&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=scottobert_roman-numerals)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=scottobert_roman-numerals&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=scottobert_roman-numerals)

</p>

> Utility functions for converting integers to roman numerals and vice versa.

---

## ✨ New: Vinculum (Overline) Notation Support

This library now supports **vinculum notation** (overline) for representing large numbers in Roman numerals (up to 3,999,999).

- Overlines are represented using a Unicode combining overline (U+0305) after each numeral character.
- Example: 5,000 is written as `V
5` (V̅), 10,000 as `X
5` (X̅), etc.
- Both conversion and validation functions support this format.

### Example Usage
```ts
import { romanToInt, intToRoman, isValidRoman } from "@scottobert/roman-numerals";

console.log(intToRoman(5000)); // V̅
console.log(romanToInt("V̅")); // 5000
console.log(intToRoman(1234567)); // M̅C̅C̅X̅X̅X̅I̅I̅I̅CDLXVII
console.log(isValidRoman("M̅C̅M̅X̅C̅I̅V̅")); // true
```

---

## Install

```sh
npm install @scottobert/roman-numerals
```

## Run tests

```sh
npm run test
```

## Usage
```ts
import { romanToInt, intToRoman } from "@scottobert/roman-numerals";

console.log(romanToInt("MCMXCIV")); // 1994
console.log(intToRoman(1994)); // MCMXCIV
```

## New Feature: Validate Roman Numeral Strings

Check if a string is a valid Roman numeral. This can be useful for input validation before conversion.

### Example
```ts
import { isValidRoman } from "@scottobert/roman-numerals";

console.log(isValidRoman("MCMXCIV")); // true
console.log(isValidRoman("INVALID")); // false
```

## Author

👤 **Scott Obert**

* GitHub: [@scottobert](https://github.com/scottobert)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/scottobert/roman-numerals/issues). You can also take a look at the [contributing guide](https://github.com/scottobert/roman-numerals/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Scott Obert](https://github.com/scottobert).<br />
This project is [GPL--2.0](https://github.com/scottobert/roman-numerals/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
