import { Pipe, PipeTransform } from '@angular/core';
import * as mathToFhirpath from 'math-to-fhirpath';

@Pipe({
  name: 'mathToFhirpath'
})
export class MathToFhirpathPipe implements PipeTransform {

  transform(value: string, variables: string[]): string {
    if (value !== undefined) {
      const fhirPath = mathToFhirpath.fhirconvert(value, variables);
      if (fhirPath !== null) {
        return fhirPath;
      }
    }

    return 'Not valid';
  }
}
