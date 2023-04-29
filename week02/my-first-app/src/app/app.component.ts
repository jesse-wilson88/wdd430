import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  // This below is inline
  styles: [`
  h3 {
    color: dodgerblue;
  }`]
})
export class AppComponent {
  title = 'Icka\'s Playground';

  showSecret = false;
  log: any =[];
  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date);

  }
}

