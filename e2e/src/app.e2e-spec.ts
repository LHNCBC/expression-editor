import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import * as path from 'path';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('Basic', () => {
    it('should display the a blank editor', async () => {
      await page.navigateTo();
      // Title
      expect(await page.getTitle()).toEqual('FHIRPath Editor');
      // Uneditable variables section should not show up
      expect(await page.getNumberOfUneditableVariables()).toEqual(0);
      // Variables section
      expect(await page.getVariablesTitle()).toEqual('Variables');
      expect(await page.getNumberOfVariables()).toEqual(0);
      // Final expression
      expect(await page.getFinalExpressionTitle()).toEqual('Final Expression');
    });

    it('should be possible to add a variable', async () => {
      expect(await page.checkAddVariable()).toEqual(true);
    });
  });

  describe('BMI calculation', () => {
    it('should be add two question variables', async () => {
      await page.navigateTo();

      // Import base questionnaire (without fhirpath)
      await element(by.id('link-id')).sendKeys('/39156-5');
      const fileName = path.resolve(__dirname, '../bmi.json');
      await element(by.id('import-fhir')).sendKeys(fileName);

      await page.addQuestionVariable('Weight', 'Keep form units (kg)');
      await page.addQuestionVariable('Body height', 'Convert to m');
    });

    it('should be possible to add a final expression', async () => {
      await page.setFinalExpression('(%A/(%B.power(2))).round(1)');
    });

    it('should produce the correct FHIR Questionnaire', async () => {
      await element(by.id('export-fhir')).click();
      // TODO export
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
