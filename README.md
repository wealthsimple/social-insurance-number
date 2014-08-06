# sin-parser [![Build Status](https://travis-ci.org/wealthsimple/sin-parser.svg)](https://travis-ci.org/wealthsimple/sin-parser) [![Code Climate](https://codeclimate.com/github/wealthsimple/sin-parser/badges/gpa.svg)](https://codeclimate.com/github/wealthsimple/sin-parser)

`sin-parser` is a Canadian SIN (Social Insurance Number) parser and format validator. Note: this is only meant to be used for client-side validation purposes.

Example usage:

```javascript
SinParser.parse(" 130-692-544 ")
// Returns:
{
  valid: true,
  value: "130692544",
  provinces: ['NB', 'NF', 'NS', 'PE'],
  temporary_resident: false
}

SinParser.parse("918640897")
// Returns:
{
  valid: true,
  value: "918640897",
  provinces: [],
  temporary_resident: true
}

SinParser.parse("1234")
// Returns:
{
  valid: false,
  error: "SIN must be 9 digits long"
}

SinParser.parse("123456789")
// Returns:
{
  valid: false,
  error: "SIN format is invalid"
}
```
