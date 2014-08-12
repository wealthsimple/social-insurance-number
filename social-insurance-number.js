(function(global) {
  var SocialInsuranceNumber = function() {};

  SIN_LENGTH = 9;
  // Map Canadian provinces to associated first SIN digits
  PROVINCES = {
    "AB": [6],
    "BC": [7],
    "MB": [6],
    "NB": [1],
    "NF": [1],
    "NS": [1],
    "NT": [6],
    "NU": [6],
    "ON": [4, 5],
    "PE": [1],
    "QC": [2, 3],
    "SK": [6],
    "YU": [7]
  };

  var parse = function(sin) {
    var isString = Object.prototype.toString.call(sin) === "[object String]";
    if (!isString) {
      return errorObject("Invalid SIN input provided");
    }

    sin = sin.replace(/[^\d\.]/g, "");
    if (sin.length !== SIN_LENGTH) {
      return errorObject("SIN must be 9 digits long");
    }

    var digits = [],
        sinDigits = sin.split("");
    for(var i = 0; i < sinDigits.length; i++) {
      var digit = parseInt(sinDigits[i], 10);
      digit *= i % 2 === 0 ? 1 : 2;
      digits.push(digitalRoot(digit));
    }

    var sum = digits.reduce(function(a, b) { return a + b; });
    if (sum % 10 !== 0) {
      return errorObject("SIN format is invalid");
    }
    return {
      valid: true,
      value: sin,
      provinces: provincesForSIN(sin),
      temporary_resident: isTemporaryResident(sin)
    };
  };

  var generate = function(options) {
    options = options || {};
    var firstDigit = options.firstDigit;
    if (!firstDigit) {
      var province = options.province || randomChoice(Object.keys(PROVINCES));
      firstDigit = randomChoice(PROVINCES[province]);
    }
    var sinArray = [firstDigit];
    // Generate the next 7 digits randomly
    while(sinArray.length < (SIN_LENGTH - 1)) {
      sinArray.push(randomIntBetween(0, 9));
    }
    sinArray.push(checkDigit(sinArray));
    return sinArray.join("");
  }

  // `partialSin` contains first 8 digits of the SIN for which to calculate check digit.
  var checkDigit = function(partialSin) {
    var reversedSin = partialSin.slice().reverse(),
        position = 0,
        sum = 0;
    while(position < (SIN_LENGTH - 1)) {
      var odd = reversedSin[position] * 2;
      if (odd > SIN_LENGTH) {
        odd -= SIN_LENGTH;
      }
      sum += odd;
      if (position !== (SIN_LENGTH - 2)) {
        sum += reversedSin[position + 1];
      }
      position += 2;
    }
    return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  };

  /*
    Returns the sum of digits in number.
    e.g. 162 -> 1+6+2 -> 9
  */
  var digitalRoot = function(num) {
    var digits = String(num).split("");
    digits = digits.map(function(d) { return parseInt(d, 10); });
    return digits.reduce(function(a, b) { return a + b; });
  };

  var provincesForSIN = function(sin) {
    var firstDigit = parseInt(sin.substring(0, 1));
    var provinces = [];
    for(var province in PROVINCES) {
      if (PROVINCES[province].indexOf(firstDigit) >= 0) {
        provinces.push(province);
      }
    }
    return provinces;
  };

  var isTemporaryResident = function(sin) {
    return sin.substring(0, 1) === "9";
  };

  var errorObject = function(message) {
    return {
      valid: false,
      error: message
    };
  };

  var randomChoice = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var randomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  SocialInsuranceNumber.PROVINCES = PROVINCES;
  SocialInsuranceNumber.SIN_LENGTH = SIN_LENGTH;
  SocialInsuranceNumber.parse = parse;
  SocialInsuranceNumber.generate = generate;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = SocialInsuranceNumber;
    }
    exports.SocialInsuranceNumber = SocialInsuranceNumber;
  } else {
    global.SocialInsuranceNumber = SocialInsuranceNumber;
  }
})(this);
