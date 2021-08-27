import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('Rule Editor', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {
      it('should display the editor', async () => {
        await page.navigateTo();
        // Title
        expect(await page.getTitle()).toEqual('My Rule Editor');
        // Uneditable variables section should not show up
        expect(await page.getNumberOfUneditableVariables()).toEqual(0);
        // Variables section
        expect(await page.getVariablesTitle()).toEqual('Variables');
        expect(await page.getNumberOfVariables()).toEqual(2);
        // Final expression
        expect(await page.getFinalExpressionTitle()).toEqual('My Expression');
      });

      it('should be possible to add a variable', async () => {
        expect(await page.checkAddVariable()).toEqual(true);
      });

      it('should be possible to remove a variable', async () => {
        expect(await page.checkRemoveLastVariable()).toEqual(true);
      });

      it('should produce the correct FHIR Questionnaire', async () => {
        await element(by.id('export')).click();

        expect(await element(by.id('output')).getText()).toContain('"expression": "%a/%b.power(2)"');
      });

      it('should be user stylable', async () => {
        const lightYellowBackground = 'rgb(255, 255, 238)';

        // User styled input fields have a light yellow background. Declared via an attribute
        expect(await element.all(by.css('lhc-rule-editor input')).first()
          .getCssValue('background')).toContain(lightYellowBackground);
        expect(await element(by.id('simple-expression'))
          .getCssValue('background')).toContain(lightYellowBackground);
      });
    });

    describe('PHQ9 score calculation', () => {
      it('should display the editor', async () => {
        await page.navigateTo();
        // Only the prompt for score calculation should show up
        await element(by.cssContainingText('option', 'PHQ9 (no FHIRPath)')).click();
        expect(await element(by.css('lhc-rule-editor h1')).isPresent()).toBeFalsy();
        expect(await element(by.css('lhc-rule-editor')).getText()).toContain('Would you like to calculate the sum of scores?');
      });

      it('should produce the calculation', async () => {
        await element(by.id('export-score')).click();

        expect(await element(by.id('output')).getText()).toContain(
          '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
          'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
          'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
        );
      });
    });
  });

  describe('Web Component', () => {
    describe('PHQ9 score calculation', () => {
      it('should display the editor', async () => {
        browser.waitForAngularEnabled(false);
        await page.navigateToWebComponent();
        // Only the prompt for score calculation should show up
        expect(await element(by.css('lhc-rule-editor h1')).isPresent()).toBeFalsy();
        expect(await element(by.css('lhc-rule-editor')).getText()).toContain('Would you like to calculate the sum of scores?');
      });

      it('should produce the calculation', async () => {
        await element(by.id('export-score')).click();

        expect(await element(by.id('output')).getText()).toContain(
          '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
          'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
          'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
        );
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
