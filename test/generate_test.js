var expect = chai.expect;

describe("SocialInsuranceNumber.generate", function() {
  it("generates a valid SIN number", function() {
    var sin = SocialInsuranceNumber.generate();
    expect(sin.length).to.equal(SocialInsuranceNumber.SIN_LENGTH);
    expect(SocialInsuranceNumber.parse(sin).valid).to.equal(true);
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
      expect(SocialInsuranceNumber.parse(this.sin).valid).to.equal(true);;
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
      expect(SocialInsuranceNumber.parse(this.sin).valid).to.equal(true);;
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
      expect(SocialInsuranceNumber.parse(this.sin).valid).to.equal(true);;
    });
  });
});
