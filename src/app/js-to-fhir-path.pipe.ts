import { Pipe, PipeTransform } from '@angular/core';
import * as jsToFhirpath from 'js-to-fhirpath';

@Pipe({
  name: 'jsToFhirPath'
})
export class JsToFhirPathPipe implements PipeTransform {

  transform(value: string, variables: string[]): unknown {
    const functions = ['CEILING', 'FLOOR', 'ABS', 'LOG', 'TRUNCATE', 'EXP', 'SQRT', 'LN'];
    const fhirPath = jsToFhirpath.fhirconvert(value, variables, functions);

    return fhirPath === null ? '?' : fhirPath;
  }
}
