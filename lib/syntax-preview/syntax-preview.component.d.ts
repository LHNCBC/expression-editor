import { OnInit } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';
export declare class SyntaxPreviewComponent implements OnInit {
    syntax: any;
    lhcStyle: SimpleStyle;
    showWhenEmpty: boolean;
    constructor();
    ngOnInit(): void;
}
