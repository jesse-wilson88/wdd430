import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // Select by Element (by default)
  // selector: '[app-servers]', // Select by Attribute
  // selector: '.app-servers', // Select by Class
  templateUrl: './servers.component.html',
  // template: `<app-server></app-server><app-server></app-server>`,
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  // serverName = '';
  serverName = 'Testserver';
  serverCreated = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {}

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus =
      'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    // console.log(event);
    // this.serverName = event.target.value;
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
