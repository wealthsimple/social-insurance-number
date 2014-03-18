(function(global) {
  var SinParser = function() {};

  SinParser.parse = function(sin) {
    var isString = Object.prototype.toString.call(sin) == "[object String]";
    if (!isString) {
      return this._errorObject("Invalid SIN input provided");
    }

    sin = sin.replace(/[^\d\.]/g, "");
    if (sin.length != 9) {
      return this._errorObject("SIN must be 9 digits long");
    }

    var digits = [],
        sinDigits = sin.split("");
    for(var i = 0; i < sinDigits.length; i++) {
      var digit = parseInt(sinDigits[i]);
      digit *= i % 2 === 0 ? 1 : 2;
      digits.push(this._digitalRoot(digit));
    }

    sum = digits.reduce(function(a, b) { return a + b; });
    if (sum % 10 !== 0) {
      return this._errorObject("SIN format is invalid");
    }
    return {
      valid: true,
      value: sin,
      error: null,
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
    digits = digits.map(function(d) { return parseInt(d); });
    return digits.reduce(function(a, b) { return a + b; });
  };

  SinParser._provinces = function(sin) {
    var firstDigit = sin.substring(0, 1);
    return {
      "0": [],
      "1": ["NB", "NF", "NS", "PE"],
      "2": ["QC"],
      "3": ["QC"],
      "4": ["ON"],
      "5": ["ON"],
      "6": ["AB", "MB", "SK", "NT", "NU"],
      "7": ["BC", "YU"],
      "8": [],
      "9": []
    }[firstDigit];
  };

  SinParser._isTemporaryResident = function(sin) {
    return sin.substring(0, 1) == "9";
  };

  SinParser._errorObject = function(message) {
    return {
      valid: false,
      value: null,
      error: message,
      provinces: [],
      temporary_resident: null
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
