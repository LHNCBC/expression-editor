import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showEditor = false;

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }
}
