import { Pipe } from '@angular/core';
import * as mathToFhirpath from 'math-to-fhirpath';
export class MathToFhirpathPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = mathToFhirpath.fhirconvert(value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    }
}
MathToFhirpathPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mathToFhirpath'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC10by1maGlycGF0aC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9tYXRoLXRvLWZoaXJwYXRoLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxLQUFLLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUtuRCxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFNBQVMsQ0FBQyxLQUFhLEVBQUUsU0FBbUI7UUFDMUMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDckIsT0FBTyxRQUFRLENBQUM7YUFDakI7U0FDRjtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7OztZQWRGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbWF0aFRvRmhpcnBhdGggZnJvbSAnbWF0aC10by1maGlycGF0aCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21hdGhUb0ZoaXJwYXRoJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRoVG9GaGlycGF0aFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgdmFyaWFibGVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGZoaXJQYXRoID0gbWF0aFRvRmhpcnBhdGguZmhpcmNvbnZlcnQodmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICBpZiAoZmhpclBhdGggIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZoaXJQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnTm90IHZhbGlkJztcbiAgfVxufVxuIl19