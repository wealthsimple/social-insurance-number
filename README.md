# social-insurance-number [![Build Status](https://travis-ci.org/wealthsimple/social-insurance-number.svg)](https://travis-ci.org/wealthsimple/social-insurance-number) [![Code Climate](https://codeclimate.com/github/wealthsimple/social-insurance-number/badges/gpa.svg)](https://codeclimate.com/github/wealthsimple/social-insurance-number)

`social-insurance-number` is a Canadian SIN (Social Insurance Number) parser and generator.

## Parsing

Using `.parse(sin)`, you can get the validity and attributes of a SIN number.

```javascript
SocialInsuranceNumber.parse(" 130-692-544 ")
// Returns:
{
  valid: true,
  normalizedValue: "130692544",
  provinces: ['NB', 'NF', 'NS', 'PE'],
  temporaryResident: false
}

SocialInsuranceNumber.parse("918640897")
// Returns:
{
  valid: true,
  normalizedValue: "918640897",
  provinces: [],
  temporaryResident: true
}

SocialInsuranceNumber.parse("1234")
// Returns:
{
  valid: false,
  error: "SIN must be 9 digits long"
}

SocialInsuranceNumber.parse("123456789")
// Returns:
{
  valid: false,
  error: "SIN format is invalid"
}
```

## Generating

Using `.generate([options ])`, you can generate a valid random SIN number.

```javascript
SocialInsuranceNumber.generate()
// Returns a random SIN, e.g. "130692544"

SocialInsuranceNumber.generate({province: "ON"});
// Returns a random SIN associated with Ontario, e.g. "464679711"

SocialInsuranceNumber.generate({firstDigit: 8});
// Returns a random SIN starting with 8, e.g. "851157206"
```
