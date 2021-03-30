import { Pipe, PipeTransform } from '@angular/core';
import * as jsToFhirpath from 'js-to-fhirpath';

@Pipe({
  name: 'jsToFhirPath'
})
export class JsToFhirPathPipe implements PipeTransform {

  transform(value: string, variables: string[]): unknown {
    const fhirPath = jsToFhirpath.fhirconvert(value, variables);

    return fhirPath === null ? '?' : fhirPath;
  }
}
