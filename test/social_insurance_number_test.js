var expect = chai.expect;

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
  "130-692-544",
  normalizedValidSin
];

describe('SocialInsuranceNumber', function() {
  describe(".generate", function() {
    it("generates a valid SIN number", function() {
      var sin = SocialInsuranceNumber.generate();
      expect(sin.length).to.equal(SocialInsuranceNumber.SIN_LENGTH);
      expect(new SocialInsuranceNumber(sin).isValid()).to.equal(true);
    });

    describe("with `province` set", function() {
      beforeEach(function() {
        this.sin = SocialInsuranceNumber.generate({province: "ON"});
      });

      it("uses that province", function() {
        var ontarioProvinceNumbers = ["4", "5"];
        expect(ontarioProvinceNumbers).to.contain(this.sin.substring(0, 1));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(this.sin).isValid()).to.equal(true);;
      });
    });

    describe("with `startsWith` set to a single digit", function() {
      beforeEach(function() {
        this.startsWith = 8;
        this.sin = SocialInsuranceNumber.generate({startsWith: this.startsWith});
      });

      it("uses that as the first digit", function() {
        expect(this.sin.substring(0, 1)).to.equal(String(this.startsWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(this.sin).isValid()).to.equal(true);;
      });
    });

    describe("with `startsWith` set to multiple digits", function() {
      beforeEach(function() {
        this.startsWith = "12345";
        this.sin = SocialInsuranceNumber.generate({startsWith: this.startsWith});
      });

      it("uses that as the first digit", function() {
        expect(this.sin.substring(0, 5)).to.equal(String(this.startsWith));
      });

      it("generates a valid SIN number", function() {
        expect(new SocialInsuranceNumber(this.sin).isValid()).to.equal(true);;
      });
    });
  });

  describe("#normalizedValue", function() {
    it("normalizes the SIN input value", function() {
      _.each(validSins, function(input) {
        expect(new SocialInsuranceNumber(input).normalizedValue()).to.equal(normalizedValidSin);
      });
    });
  });

  describe("#isValid", function() {
    it("returns false for an invalid input", function() {
      _.each(invalidSins, function(input) {
        expect(new SocialInsuranceNumber(input).isValid()).to.equal(false);
      });
    });

    it("returns true for a valid format", function() {
      _.each(validSins, function(input) {
        expect(new SocialInsuranceNumber(input).isValid()).to.equal(true);
      });
    });
  });

  describe("#isTemporary", function() {
    it("returns true for a temporary resident SIN", function() {
      expect(new SocialInsuranceNumber("918640897").isTemporary()).to.equal(true);
    });

    it("returns false for a non-temporary resident SIN", function() {
      expect(new SocialInsuranceNumber("130692544").isTemporary()).to.equal(false);
    });
  });

  describe("#provinces", function() {
    it("returns the associated provinces for the SIN", function() {
      expect(new SocialInsuranceNumber("918640897").provinces()).to.eql([]);
      expect(new SocialInsuranceNumber("130692544").provinces()).to.eql(['NB', 'NF', 'NS', 'PE']);
    });
  });
});
