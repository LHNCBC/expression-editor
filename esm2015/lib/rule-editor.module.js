import { NgModule } from '@angular/core';
import { RuleEditorComponent } from './rule-editor.component';
import { FormsModule } from '@angular/forms';
import { VariablesComponent } from './variables/variables.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalculateSumPromptComponent } from './calculate-sum-prompt/calculate-sum-prompt.component';
import { MatRadioModule } from '@angular/material/radio';
import { MathToFhirpathPipe } from './math-to-fhirpath.pipe';
import { SyntaxConverterComponent } from './syntax-converter/syntax-converter.component';
import { SyntaxPreviewComponent } from './syntax-preview/syntax-preview.component';
export class RuleEditorModule {
}
RuleEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    RuleEditorComponent,
                    VariablesComponent,
                    UneditableVariablesComponent,
                    QuestionComponent,
                    CalculateSumPromptComponent,
                    MathToFhirpathPipe,
                    SyntaxConverterComponent,
                    SyntaxPreviewComponent
                ],
                imports: [
                    FormsModule,
                    BrowserAnimationsModule,
                    DragDropModule,
                    MatRadioModule
                ],
                exports: [
                    RuleEditorComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9ydWxlLWVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDckcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQXlCbkYsTUFBTSxPQUFPLGdCQUFnQjs7O1lBckI1QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQiw0QkFBNEI7b0JBQzVCLGlCQUFpQjtvQkFDakIsMkJBQTJCO29CQUMzQixrQkFBa0I7b0JBQ2xCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCx1QkFBdUI7b0JBQ3ZCLGNBQWM7b0JBQ2QsY0FBYztpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsbUJBQW1CO2lCQUNwQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJ1bGVFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3J1bGUtZWRpdG9yLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBWYXJpYWJsZXNDb21wb25lbnQgfSBmcm9tICcuL3ZhcmlhYmxlcy92YXJpYWJsZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFVuZWRpdGFibGVWYXJpYWJsZXNDb21wb25lbnQgfSBmcm9tICcuL3VuZWRpdGFibGUtdmFyaWFibGVzL3VuZWRpdGFibGUtdmFyaWFibGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDYWxjdWxhdGVTdW1Qcm9tcHRDb21wb25lbnQgfSBmcm9tICcuL2NhbGN1bGF0ZS1zdW0tcHJvbXB0L2NhbGN1bGF0ZS1zdW0tcHJvbXB0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IE1hdGhUb0ZoaXJwYXRoUGlwZSB9IGZyb20gJy4vbWF0aC10by1maGlycGF0aC5waXBlJztcbmltcG9ydCB7IFN5bnRheENvbnZlcnRlckNvbXBvbmVudCB9IGZyb20gJy4vc3ludGF4LWNvbnZlcnRlci9zeW50YXgtY29udmVydGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTeW50YXhQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9zeW50YXgtcHJldmlldy9zeW50YXgtcHJldmlldy5jb21wb25lbnQnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUnVsZUVkaXRvckNvbXBvbmVudCxcbiAgICBWYXJpYWJsZXNDb21wb25lbnQsXG4gICAgVW5lZGl0YWJsZVZhcmlhYmxlc0NvbXBvbmVudCxcbiAgICBRdWVzdGlvbkNvbXBvbmVudCxcbiAgICBDYWxjdWxhdGVTdW1Qcm9tcHRDb21wb25lbnQsXG4gICAgTWF0aFRvRmhpcnBhdGhQaXBlLFxuICAgIFN5bnRheENvbnZlcnRlckNvbXBvbmVudCxcbiAgICBTeW50YXhQcmV2aWV3Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUnVsZUVkaXRvckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVFZGl0b3JNb2R1bGUgeyB9XG4iXX0=