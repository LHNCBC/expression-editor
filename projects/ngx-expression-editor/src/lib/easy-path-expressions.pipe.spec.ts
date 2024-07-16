import { EasyPathExpressionsPipe } from './easy-path-expressions.pipe';

describe('JsToFhirPathPipe', () => {
  it('create an instance', () => {
    const pipe = new EasyPathExpressionsPipe();
    expect(pipe).toBeTruthy();
  });
});
