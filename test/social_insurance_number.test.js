var { SocialInsuranceNumber } = require('../social-insurance-number');

var invalidSins = [
  "1a3456789",
  "12345678",
  "1234567891",
  "123456789",
  "123-456-789",
  " 123 456 789 ",
  null,
  undefined,
  {},
  true
];

var normalizedValidSin = "130692544";
var validSins = [
  " 130 692 544 ",
  "1 ..asdf.. 30692544",
  "130-692-544",
  normalizedValidSin
];

describe('SocialInsuranceNumber', function() {
  describe(".generate", function() {
    it("generates a valid SIN number", function() {
      var sin = SocialInsuranceNumber.generate();
      expect(sin.length).toEqual(SocialInsuranceNumber.SIN_LENGTH);
      expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
    });

    describe("with `province` set", function() {
      beforeEach(function() {
        sin = SocialInsuranceNumber.generate({province: "ON"});
      });

      it("uses that province", function() {
        var ontarioProvinceNumbers = ["4", "5"];
        expect(ontarioProvinceNumbers).toContain(sin.substring(0, 1));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });

    describe("with `startsWith` set to a single digit", function() {
      beforeEach(function() {
        startsWith = 8;
        sin = SocialInsuranceNumber.generate({startsWith: startsWith});
      });

      it("uses that as the first digit", function() {
        expect(sin.substring(0, 1)).toEqual(String(startsWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });

    describe("with `startsWith` set to multiple digits", function() {
      beforeEach(function() {
        startsWith = "12345";
        sin = SocialInsuranceNumber.generate({startsWith: startsWith});
      });

      it("uses that as the first digit", function() {
        expect(sin.substring(0, 5)).toEqual(String(startsWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });

    describe("with `doesNotStartWith` set to a single number", function() {
      beforeEach(function() {
        doesNotStartWith = "2";
        sin = SocialInsuranceNumber.generate({doesNotStartWith: doesNotStartWith});
      });

      it("does not use that as the first digit", function() {
        expect(sin.substring(0, 1)).not.toEqual(String(doesNotStartWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });

    describe("with `doesNotStartWith` and `province` set to valid options", function() {
      beforeEach(function() {
        doesNotStartWith = "2";
        sin = SocialInsuranceNumber.generate({doesNotStartWith: doesNotStartWith, province: "QC"});
      });

      it("respects province and doesNotStartWtih", function() {
        var validQCStartsWith = 3;
        expect(sin.substring(0, 1)).toEqual(String(validQCStartsWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });

    describe("with `doesNotStartWith` and `province` set to incompatible options", function() {
      beforeEach(function() {
        doesNotStartWith = ["2", "3"];
      });

      it("should throw an exception", function() {
        var validQCStartsWith = 3;
        expect(
          () => SocialInsuranceNumber.generate({doesNotStartWith: doesNotStartWith, province: "QC"})
        ).toThrowError("Cannot find a valid number to start with.");
      });

    });

    describe("with `doesNotStartWith` set to a list of digits", function() {
      beforeEach(function() {
        doesNotStartWith = ["2", "3", "4"];
        sin = SocialInsuranceNumber.generate({doesNotStartWith: doesNotStartWith});
      });

      it("does not use that as the first digit", function() {
        expect(sin.substring(0, 1)).not.toEqual(String(doesNotStartWith[0]));
        expect(sin.substring(0, 1)).not.toEqual(String(doesNotStartWith[1]));
        expect(sin.substring(0, 1)).not.toEqual(String(doesNotStartWith[2]));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(sin).isValid()).toEqual(true);
      });
    });
  });

  describe("#normalizedValue", function() {
    it("normalizes the SIN input value", function() {
      validSins.forEach(function(input) {
        expect(new SocialInsuranceNumber(input).normalizedValue()).toEqual(normalizedValidSin);
      });
    });
  });

  describe("#isValid", function() {
    it("returns false for an invalid input", function() {
      invalidSins.forEach(function(input) {
        expect(new SocialInsuranceNumber(input).isValid()).toEqual(false);
      });
    });

    it("returns true for a valid format", function() {
      validSins.forEach(function(input) {
        expect(new SocialInsuranceNumber(input).isValid()).toEqual(true);
      });
    });

    it("returns false for a SIN that is too long", function() {
      const invalidSin =  "1306925445";
      expect(new SocialInsuranceNumber(invalidSin).isValid()).toEqual(false);
    });
  });

  describe("#isTemporary", function() {
    it("returns true for a temporary resident SIN", function() {
      expect(new SocialInsuranceNumber("918640897").isTemporary()).toEqual(true);
    });

    it("returns false for a non-temporary resident SIN", function() {
      expect(new SocialInsuranceNumber("130692544").isTemporary()).toEqual(false);
    });
  });

  describe("#isBusinessNumber", function() {
    it("returns true for a BN", function() {
      expect(new SocialInsuranceNumber("817640897").isBusinessNumber()).toEqual(true);
    });

    it("returns false for a SIN", function() {
      expect(new SocialInsuranceNumber("130692544").isBusinessNumber()).toEqual(false);
    });
  });

  describe("#provinces", function() {
    it("returns the associated provinces for the SIN", function() {
      expect(new SocialInsuranceNumber("918640897").provinces()).toEqual([]);
      expect(new SocialInsuranceNumber("130692544").provinces()).toEqual(['NB', 'NF', 'NS', 'PE']);
    });
  });
});
