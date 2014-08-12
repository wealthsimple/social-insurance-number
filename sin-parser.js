(function(global) {
  var SinParser = function() {};

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
  SinParser.PROVINCES = PROVINCES;

  SinParser.parse = function(sin) {
    var isString = Object.prototype.toString.call(sin) === "[object String]";
    if (!isString) {
      return this._errorObject("Invalid SIN input provided");
    }

    sin = sin.replace(/[^\d\.]/g, "");
    if (sin.length !== 9) {
      return this._errorObject("SIN must be 9 digits long");
    }

    var digits = [],
        sinDigits = sin.split("");
    for(var i = 0; i < sinDigits.length; i++) {
      var digit = parseInt(sinDigits[i], 10);
      digit *= i % 2 === 0 ? 1 : 2;
      digits.push(this._digitalRoot(digit));
    }

    var sum = digits.reduce(function(a, b) { return a + b; });
    if (sum % 10 !== 0) {
      return this._errorObject("SIN format is invalid");
    }
    return {
      valid: true,
      value: sin,
      provinces: this._provinces(sin),
      temporary_resident: this._isTemporaryResident(sin)
    };
  };

  /*
    For number < 10, returns the number.
    For number >= 10, returns the sum of digits in number.
    e.g. 162 -> 1+6+2 -> 9
  */
  SinParser._digitalRoot = function(num) {
    var digits = String(num).split("");
    digits = digits.map(function(d) { return parseInt(d, 10); });
    return digits.reduce(function(a, b) { return a + b; });
  };

  SinParser._provinces = function(sin) {
    var firstDigit = parseInt(sin.substring(0, 1));
    var provinces = [];
    for(var province in PROVINCES) {
      if (PROVINCES[province].indexOf(firstDigit) >= 0) {
        provinces.push(province);
      }
    }
    return provinces;
  };

  SinParser._isTemporaryResident = function(sin) {
    return sin.substring(0, 1) === "9";
  };

  SinParser._errorObject = function(message) {
    return {
      valid: false,
      error: message
    };
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = SinParser;
    }
    exports.SinParser = SinParser;
  } else {
    global.SinParser = SinParser;
  }
})(this);
