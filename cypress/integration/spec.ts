import { browser, by, element } from 'protractor';
import { getNumberOfUneditableVariables, getNumberOfVariables } from './util';

describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {
      it('should display the editor', async () => {
        // Title
        cy.title().should('eq', 'Rule Editor');
        // Uneditable variables section should not show up
        getNumberOfUneditableVariables().should('eq', 0);
        // Variables section
        cy.get('#variables-section h2').should('eq', 'Item Variables');
        getNumberOfVariables().should('eq', 0);
        // Final expression
        cy.get('#final-expression-section h2').should('eq', 'Output Calculated Expression');
      });

      it('should be possible to add a variable', async () => {
        // expect(await page.checkAddVariable()).toEqual(true);
      });

      it('should be possible to remove a variable', async () => {
        // expect(await page.checkRemoveLastVariable()).toEqual(true);
      });

      // it('should produce the correct FHIR Questionnaire', async () => {
      //   await element(by.id('export')).click();
      //
      //   expect(await element(by.id('output')).getText()).toContain('"expression": "%a/%b.power(2)"');
      // });
      //
      // it('should be user stylable', async () => {
      //   const lightYellowBackground = 'rgb(255, 255, 238)';
      //
      //   // User styled input fields have a light yellow background. Declared via an attribute
      //   expect(await element.all(by.css('lhc-rule-editor input:not([type="checkbox"])')).first()
      //     .getCssValue('background')).toContain(lightYellowBackground);
      // });
    });

    // describe('PHQ9 score calculation', () => {
    //   it('should display the editor', async () => {
    //     // Only the prompt for score calculation should show up
    //     await element(by.cssContainingText('option', 'PHQ9 (no FHIRPath)')).click();
    //     expect(await element(by.css('lhc-rule-editor h1')).isPresent()).toBeFalsy();
    //     expect(await element(by.css('lhc-rule-editor')).getText()).toContain('Would you like to calculate the sum of scores?');
    //   });
    //
    //   it('should produce the calculation', async () => {
    //     await element(by.id('export-score')).click();
    //
    //     expect(await element(by.id('output')).getText()).toContain(
    //       '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
    //       'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
    //       'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
    //     );
    //   });
    // });

    describe('Query support', () => {
      it('should display the query editor', () => {
        // Check the demo questionnaire load
        cy.get('select#questionnaire-select').select('Query');
        cy.contains('FHIR Query (Observation)');
        cy.contains('Appetite sleep chg notes DI-PAD - 65972-2');
        cy.get('.time-input > .ng-untouched').should('have.value', '7');
        cy.get('.time-select > .ng-untouched').should('have.value', 'days');
        cy.contains('Observation?code=test%2Chttp://loinc.org|65972-2&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

        // Add a new code
        cy.get('#autocomplete-2').type('weight');
        cy.contains('29463-7').click();
        cy.contains('Weight - 29463-7');
        cy.contains('Observation?code=test%2Chttp://loinc.org|65972-2%2Chttp://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

        // Remove first code
        cy.get(':nth-child(1) > button > span').click();
        cy.contains('Observation?code=http://loinc.org|65972-2%2Chttp://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');
      });
    });

    describe('Case statements', () => {
      it('should display the Easy Path case editor when importing questionnaire with Easy Path in final expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.get('#advanced-interface').should('not.be.checked');

        // Should have the case statement checkbox toggled
        cy.get('#case-statements').should('be.checked');
        cy.get('#output-expressions').should('not.be.checked');
        cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
        cy.get('#case-output-0').should('have.value', 'underweight');
        cy.get('#case-condition-1').should('have.value', 'bmi<25');
        cy.get('#case-output-1').should('have.value', 'normal');
        cy.get('#case-condition-2').should('have.value', 'bmi<30');
        cy.get('#case-output-2').should('have.value', 'overweight');
        cy.get('.default').should('have.value', 'obese');

        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });

      it('should display the FHIRPath case editor when importing questionnaire with FHIRPath in final expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.get('#advanced-interface').should('be.checked');

        // Should have the case statement checkbox toggled
        cy.get('#case-statements').should('be.checked');
        cy.get('#output-expressions').should('be.checked');
        cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
        cy.get('#case-output-0').should('have.value', `'underweight'`);
        cy.get('#case-condition-1').should('have.value', '%bmi<25');
        cy.get('#case-output-1').should('have.value', `'normal'`);
        cy.get('#case-condition-2').should('have.value', '%bmi<30');
        cy.get('#case-output-2').should('have.value', `'overweight'`);
        cy.get('.default').should('have.value', `'obese'`);

        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });

      it('should be able to add cases to a questionnaire that does not have them', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');

        cy.get('#add-variable').click();
        cy.get('#variable-label-2').type('{backspace}bmi');
        cy.get('#variable-type-2').select('Easy Path Expression');
        cy.get('#variable-expression-2>input').type('a/b^2');

        cy.get('#case-statements').should('not.be.checked');
        cy.get('#case-statements').check();
        cy.get('#output-expressions').should('be.checked');
        cy.get('#output-expressions').uncheck();

        // Add a conditions and outputs
        cy.get('#case-condition-0').type('bmi<18.5');
        cy.get('#case-output-0').type('underweight');
        cy.get('#add-case').click();
        cy.get('#case-condition-1').type('bmi<25');
        cy.get('#case-output-1').type('normal');
        cy.get('#add-case').click();
        cy.get('#case-condition-2').type('bmi<30');
        cy.get('#case-output-2').type('overweight');
        cy.get('.default').type('obese');
        // Add a default value

        // CHeck the output expression
        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });
    });
  });
});
