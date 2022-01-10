import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RuleEditorComponent } from './rule-editor.component';
import { VariablesComponent } from './variables/variables.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { QuestionComponent } from './question/question.component';
import { CalculateSumPromptComponent } from './calculate-sum-prompt/calculate-sum-prompt.component';
import { EasyPathExpressionsPipe } from './easy-path-expressions.pipe';
import { SyntaxConverterComponent } from './syntax-converter/syntax-converter.component';
import { SyntaxPreviewComponent } from './syntax-preview/syntax-preview.component';
import { QueryObservationComponent } from './query-observation/query-observation.component';
import { CaseStatementsComponent } from './case-statements/case-statements.component';
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
                    EasyPathExpressionsPipe,
                    SyntaxConverterComponent,
                    SyntaxPreviewComponent,
                    QueryObservationComponent,
                    CaseStatementsComponent
                ],
                imports: [
                    FormsModule,
                    BrowserAnimationsModule,
                    DragDropModule,
                    MatRadioModule,
                    ClipboardModule,
                    MatTooltipModule,
                    MatSnackBarModule
                ],
                exports: [
                    RuleEditorComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9ydWxlLWVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDckcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDNUYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUE0QnRGLE1BQU0sT0FBTyxnQkFBZ0I7OztZQTFCNUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixtQkFBbUI7b0JBQ25CLGtCQUFrQjtvQkFDbEIsNEJBQTRCO29CQUM1QixpQkFBaUI7b0JBQ2pCLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6Qix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLHVCQUF1QjtvQkFDdkIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NsaXBib2FyZCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcblxuaW1wb3J0IHsgUnVsZUVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vcnVsZS1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFZhcmlhYmxlc0NvbXBvbmVudCB9IGZyb20gJy4vdmFyaWFibGVzL3ZhcmlhYmxlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5lZGl0YWJsZVZhcmlhYmxlc0NvbXBvbmVudCB9IGZyb20gJy4vdW5lZGl0YWJsZS12YXJpYWJsZXMvdW5lZGl0YWJsZS12YXJpYWJsZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFF1ZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9xdWVzdGlvbi9xdWVzdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlU3VtUHJvbXB0Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxjdWxhdGUtc3VtLXByb21wdC9jYWxjdWxhdGUtc3VtLXByb21wdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUgfSBmcm9tICcuL2Vhc3ktcGF0aC1leHByZXNzaW9ucy5waXBlJztcbmltcG9ydCB7IFN5bnRheENvbnZlcnRlckNvbXBvbmVudCB9IGZyb20gJy4vc3ludGF4LWNvbnZlcnRlci9zeW50YXgtY29udmVydGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTeW50YXhQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9zeW50YXgtcHJldmlldy9zeW50YXgtcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlcnlPYnNlcnZhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcXVlcnktb2JzZXJ2YXRpb24vcXVlcnktb2JzZXJ2YXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENhc2VTdGF0ZW1lbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLXN0YXRlbWVudHMvY2FzZS1zdGF0ZW1lbnRzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFJ1bGVFZGl0b3JDb21wb25lbnQsXG4gICAgVmFyaWFibGVzQ29tcG9uZW50LFxuICAgIFVuZWRpdGFibGVWYXJpYWJsZXNDb21wb25lbnQsXG4gICAgUXVlc3Rpb25Db21wb25lbnQsXG4gICAgQ2FsY3VsYXRlU3VtUHJvbXB0Q29tcG9uZW50LFxuICAgIEVhc3lQYXRoRXhwcmVzc2lvbnNQaXBlLFxuICAgIFN5bnRheENvbnZlcnRlckNvbXBvbmVudCxcbiAgICBTeW50YXhQcmV2aWV3Q29tcG9uZW50LFxuICAgIFF1ZXJ5T2JzZXJ2YXRpb25Db21wb25lbnQsXG4gICAgQ2FzZVN0YXRlbWVudHNDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIENsaXBib2FyZE1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBSdWxlRWRpdG9yQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUnVsZUVkaXRvck1vZHVsZSB7XG59XG4iXX0=