declare module "social-insurance-number" {
  export interface GenerateSINOptions {
    startsWith?: string;
    province?: string;
  }

  export class SocialInsuranceNumber {
    /**
     * Create a new Social Insurance Number object
     *
     * @param sin String type of social insurance number
     */
    constructor(sin: string);
    /**
     * Get the length of a social insurance number
     */
    public static SIN_LENGTH: number;
    /**
     * Canadian provinces to associated first SIN digits
     */
    public static PROVINCES: { [province: string]: number[] };
    /**
     * Generate a new social insurance number
     *
     * @param options GenerateSINOptions can either be startsWith or province, but not both!
     */
    public static generate(options?: GenerateSINOptions): string;
    /**
     * Determine if the SIN is a Business Number
     */
    public isBusinessNumber(): boolean;
    /**
     * Determine SIN validity.
     */
    public isValid(): boolean;
    /**
     * Determine if the SIN is associated with a temporary resident
     */
    public isTemporary(): boolean;
    /**
     * Get the normalized SIN value (all non-digits removed)
     */
    public normalizedValue(): string;
    /**
     * Get the Canadian provinces associated with the SIN
     */
    public provinces(): string[];
    /**
     * Get the first digit of the SIN
     */
    public firstDigit(): number;
  }
}
