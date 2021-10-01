import { EasyPathExpressionsPipe } from './math-to-fhirpath.pipe';

describe('JsToFhirPathPipe', () => {
  it('create an instance', () => {
    const pipe = new EasyPathExpressionsPipe();
    expect(pipe).toBeTruthy();
  });
});
