import { Pipe } from '@angular/core';
import * as easyPathExpressions from 'easy-path-expressions';
export class EasyPathExpressionsPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = easyPathExpressions.fhirconvert(value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    }
}
EasyPathExpressionsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'easyPathExpressions'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC10by1maGlycGF0aC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9tYXRoLXRvLWZoaXJwYXRoLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxLQUFLLG1CQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBSzdELE1BQU0sT0FBTyx1QkFBdUI7SUFFbEMsU0FBUyxDQUFDLEtBQWEsRUFBRSxTQUFtQjtRQUMxQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JCLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1NBQ0Y7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7WUFkRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLHFCQUFxQjthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVhc3lQYXRoRXhwcmVzc2lvbnMgZnJvbSAnZWFzeS1wYXRoLWV4cHJlc3Npb25zJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZWFzeVBhdGhFeHByZXNzaW9ucydcbn0pXG5leHBvcnQgY2xhc3MgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgdmFyaWFibGVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGZoaXJQYXRoID0gZWFzeVBhdGhFeHByZXNzaW9ucy5maGlyY29udmVydCh2YWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgIGlmIChmaGlyUGF0aCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmhpclBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICdOb3QgdmFsaWQnO1xuICB9XG59XG4iXX0=