import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
  // This below is inline
  styles: [`
  h3 {
    color: dodgerblue;
  }`]
})
export class AppComponent {
  title = 'Icka\'s Playground';
}

