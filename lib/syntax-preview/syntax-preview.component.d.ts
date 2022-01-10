import { OnInit } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ɵngcc0 from '@angular/core';
export declare class SyntaxPreviewComponent implements OnInit {
    private snackBar;
    syntax: any;
    lhcStyle: SimpleStyle;
    showWhenEmpty: boolean;
    constructor(snackBar: MatSnackBar);
    ngOnInit(): void;
    /**
     * Show an ephemeral notification that the value was copied.
     */
    copyNotification(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SyntaxPreviewComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SyntaxPreviewComponent, "lhc-syntax-preview", never, { "showWhenEmpty": "showWhenEmpty"; "syntax": "syntax"; "lhcStyle": "lhcStyle"; }, {}, never, never>;
}

//# sourceMappingURL=syntax-preview.component.d.ts.map