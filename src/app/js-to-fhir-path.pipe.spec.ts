import { MathToFhirpathPipe } from './math-to-fhirpath.pipe';

describe('JsToFhirPathPipe', () => {
  it('create an instance', () => {
    const pipe = new MathToFhirpathPipe();
    expect(pipe).toBeTruthy();
  });
});
