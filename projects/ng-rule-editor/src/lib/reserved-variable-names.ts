/**
 * Reference: https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements
 * Section: 5.6 FHIRPath supplements
 */
const FhirPathSupplements = [
  "^resource$",
  "^context$",
  "^questionnaire$",
  "^qitem$"
];

/**
 * Reference: http://hl7.org/fhir/R4/fhirpath.html#vars
 * Version: 4
 * Section: 2.9.1.7 Environment variables
 */
const EnvironmentVariablesV4 = [
  "^sct$",
  "^loinc$",
  "^vs-.",
  "^ext-."
  // "^resource$" - resource already exists in the FHIRPath Supplements, so it is being excluded here
];

/**
 * Reference: https://www.hl7.org/fhirpath/#environment-variables
 * Version: 2
 * Section: 9 Environment variables
 */
const EnvironmentVariablesV2 = [
  "^ucum$"
  //"^context$" - context already exists in the FHIRPath Supplements, so it is being excluded here
];

export const ReservedWords = [...FhirPathSupplements, ...EnvironmentVariablesV2, ...EnvironmentVariablesV4];
export const StartsWithReservedWords = ReservedWords.filter((word) => word.endsWith("-."));


