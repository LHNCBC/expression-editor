# Change log

This project follows [Semantic Versioning](http://semver.org/).

## [1.5.0] 2021-09-09
### Added
- Case statement support for the final expression.

## [1.4.0] 2021-08-27
### Added
- Tooltip preview for automatically generated FHIRPath and x-fhir-query.
- Copy button next to FHIRPath and x-fhir-query preview.

## [1.3.0] 2021-08-23
### Added
- Add support for `x-fhir-query`.

## [1.2.0] 2021-08-11
### Added
- New APIs to check if there is a score `isScoreCalculation` and update a score
`updateScoreCalculation` on a questionnaire.

## [1.1.0] 2021-07-30
### Added
- New API to calculate score without using a UI `addTotalScoreRule`.

## [1.0.1] 2021-07-27
### Changes
- Keep the existing extension order when saving.

## [1.0.0] 2021-07-22
### Changes
- Add support for removing score calculation from a questionnaire.
- Change the API from `checkIfScore` to `getScoreQuestionCount`.

## [0.2.0] 2021-06-28
### Changes
- Add support for developer specified runtime widget styles.
- Add support for editing user specified expressions not just
  calculatedExpressions by using the `expressionUri` attribute.

## [0.1.0] 2021-06-28
### Changes
- Add support to use widget as an Angular Library.
- Add support to use widget as a Web Component.
