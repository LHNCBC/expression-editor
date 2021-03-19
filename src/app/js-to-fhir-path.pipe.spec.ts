import { JsToFhirPathPipe } from './js-to-fhir-path.pipe';

describe('JsToFhirPathPipe', () => {
  it('create an instance', () => {
    const pipe = new JsToFhirPathPipe();
    expect(pipe).toBeTruthy();
  });
});
