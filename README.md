# social-insurance-number [![Build Status](https://travis-ci.org/wealthsimple/social-insurance-number.svg)](https://travis-ci.org/wealthsimple/social-insurance-number) [![Code Climate](https://codeclimate.com/github/wealthsimple/social-insurance-number/badges/gpa.svg)](https://codeclimate.com/github/wealthsimple/social-insurance-number)

`social-insurance-number` is a Canadian SIN (Social Insurance Number) parser and format validator. Note: this is only meant to be used for client-side validation purposes.

Example usage:

```javascript
SocialInsuranceNumber.parse(" 130-692-544 ")
// Returns:
{
  valid: true,
  value: "130692544",
  provinces: ['NB', 'NF', 'NS', 'PE'],
  temporary_resident: false
}

SocialInsuranceNumber.parse("918640897")
// Returns:
{
  valid: true,
  value: "918640897",
  provinces: [],
  temporary_resident: true
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
