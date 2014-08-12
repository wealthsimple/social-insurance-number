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
    var checksum = luhnChecksum(sin);
    if (checksum % 10 !== 0) {
      return errorObject("SIN format is invalid");
    }
    return {
      valid: true,
      value: sin,
      provinces: provincesForSIN(sin),
      temporaryResident: isTemporaryResident(sin)
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

  // Fast Luhn checksum code from luhn.js:
  // https://gist.github.com/ShirtlessKirk/2134376
  var luhnChecksum = function(sin) {
    var len = SIN_LENGTH,
        mul = 0,
        luhnArr = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
        ],
        sum = 0;
    while (len--) {
        sum += luhnArr[mul][parseInt(sin.charAt(len), 10)];
        mul ^= 1;
    }
    return sum % 10;
  };

  // `partialSin` has first 8 digits of the SIN for which to calculate check digit.
  var checkDigit = function(partialSin) {
    var checksum = luhnChecksum(partialSin.join("") + "0");
    return checksum % 10 === 0 ? 0 : 10 - checksum;
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
