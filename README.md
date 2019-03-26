# social-insurance-number [![Build Status](https://travis-ci.org/wealthsimple/social-insurance-number.svg)](https://travis-ci.org/wealthsimple/social-insurance-number) [![Code Climate](https://codeclimate.com/github/wealthsimple/social-insurance-number/badges/gpa.svg)](https://codeclimate.com/github/wealthsimple/social-insurance-number)

`social-insurance-number` is a Canadian SIN (Social Insurance Number) parser and generator for the browser and Node.js.

## Parsing

Use the `.isValid()` to determine SIN validity.

```javascript
var sin = new SocialInsuranceNumber("130692544");
sin.isValid();
// Returns: true

sin = new SocialInsuranceNumber("123456789");
sin.isValid();
// Returns: false
```

Use `.normalizedValue()` to get the normalized SIN value (all non-digits removed).

```javascript
var sin = new SocialInsuranceNumber("130-692-544");
sin.normalizedValue();
// Returns "130692544"

sin = new SocialInsuranceNumber("  130692544 ");
sin.normalizedValue();
// Returns "130692544"
```

Use `.isTemporary()` to determine if the SIN is associated with a temporary resident.

```javascript
var sin = new SocialInsuranceNumber("918640897");
sin.isTemporary();
// Returns: true

sin = new SocialInsuranceNumber("130692544");
sin.isTemporary();
// Returns: false
```

Use `.isBusinessNumber()` to determine if the SIN is a Business Number.

```javascript
var sin = new SocialInsuranceNumber("817640897");
sin.isBusinessNumber();
// Returns: true

sin = new SocialInsuranceNumber("130692544");
sin.isBusinessNumber();
// Returns: false
```

Use `.provinces()` to get the Canadian provinces associated with the SIN.

```javascript
var sin = new SocialInsuranceNumber("130692544");
sin.provinces();
// Returns: ['NB', 'NF', 'NS', 'PE']

var tempSin = new SocialInsuranceNumber("918640897");
tempSin.provinces();
// Returns: []
```

## Generating

Use the `.generate([options ])` class method to generate a valid random SIN number.

```javascript
SocialInsuranceNumber.generate()
// Returns a random SIN, e.g. "130692544"

SocialInsuranceNumber.generate({province: "ON"});
// Returns a random SIN associated with Ontario, e.g. "464679711"

SocialInsuranceNumber.generate({startsWith: "8"});
// Returns a random SIN starting with 8, e.g. "851157206"

SocialInsuranceNumber.generate({startsWith: "12345"});
// Returns a random SIN starting with 12345, e.g. "123453235"
```
