/**
 * The reserved words consist of variables from three documents.
 * 1. https://www.hl7.org/fhirpath is the main FHIRPath specification.
 * 2. http://hl7.org/fhir/fhirpath.html is the page for additions to FHIRPath in the
 *                                 latest published version of FHIR.
 * 3. https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements contains
 *                                 the additions to FHIRPath made in the not-yet-published
 *                                 new version of the SDC Implementation Guide.
 */
export const ReservedWords = [
  "^ucum$",
  "^context$",
  "^sct$",
  "^loinc$",
  "^vs-.",
  "^ext-.",
  "^resource$",
  "^questionnaire$",
  "^qitem$"
];

export const StartsWithReservedWords = ReservedWords.filter((word) => word.endsWith("-."));


