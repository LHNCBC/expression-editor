// import { browser, by, element } from 'protractor';
//
// describe('Rule editor', () => {
//   beforeEach(() => {
//     cy.visit('/web-component.html');
//   });
//
//   describe('Web Component', () => {
//     describe('PHQ9 score calculation', () => {
//       it('should display the editor', async () => {
//         // Only the prompt for score calculation should show up
//         expect(await element(by.css('lhc-rule-editor h1')).isPresent()).toBeFalsy();
//         expect(await element(by.css('lhc-rule-editor')).getText()).toContain('Would you like to calculate the sum of scores?');
//       });
//
//       it('should produce the calculation', async () => {
//         await element(by.id('export-score')).click();
//
//         expect(await element(by.id('output')).getText()).toContain(
//           '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
//           'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
//           'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
//         );
//       });
//     });
//   });
// });
