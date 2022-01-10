import { Pipe } from '@angular/core';
import * as easyPathExpressions from 'easy-path-expressions';
export class EasyPathExpressionsPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = easyPathExpressions.fhirConvert(value, variables);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzeS1wYXRoLWV4cHJlc3Npb25zLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ydWxlLWVkaXRvci9zcmMvbGliL2Vhc3ktcGF0aC1leHByZXNzaW9ucy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sS0FBSyxtQkFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUs3RCxNQUFNLE9BQU8sdUJBQXVCO0lBRWxDLFNBQVMsQ0FBQyxLQUFhLEVBQUUsU0FBbUI7UUFDMUMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkUsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNyQixPQUFPLFFBQVEsQ0FBQzthQUNqQjtTQUNGO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7O1lBZEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxxQkFBcUI7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlYXN5UGF0aEV4cHJlc3Npb25zIGZyb20gJ2Vhc3ktcGF0aC1leHByZXNzaW9ucyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2Vhc3lQYXRoRXhwcmVzc2lvbnMnXG59KVxuZXhwb3J0IGNsYXNzIEVhc3lQYXRoRXhwcmVzc2lvbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIHZhcmlhYmxlczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBmaGlyUGF0aCA9IGVhc3lQYXRoRXhwcmVzc2lvbnMuZmhpckNvbnZlcnQodmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICBpZiAoZmhpclBhdGggIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZoaXJQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnTm90IHZhbGlkJztcbiAgfVxufVxuIl19