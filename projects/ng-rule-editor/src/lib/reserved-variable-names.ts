/**
 * Reference: http://hl7.org/fhir/R4/fhirpath.html#vars
 * Section: 5.6 FHIRPath supplements
 */
export const FhirPathContexts = [
  "resource",
  "context",
  "score",
  "questionnaire",
  "qitem"
];

/**
 * Reference: http://hl7.org/fhir/R4/fhirpath.html#vars
 * Section: 2.9.1.7 Environment variables
 */
export const EnvironmentVariables = [
  "^sct$",
  "^loinc$",
  "^vs-.",
  "^ext-."
];
