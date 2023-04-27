import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css'],
})
export class UserNameComponent implements OnInit {
  allowNewUser = true;
  userNameCreationStatus = "No user was created";
  userName = '';

  constructor() {
    setTimeout(() => {
      this.allowNewUser = false;
    }, 2000);
  }

  ngOnInit() {}
  
  onCreateUserName() {
    this.userNameCreationStatus = 'User was ceated! User is ' + this.userName;
  }

  onUpdateUserName(event: any) {
    this.userName = (<HTMLInputElement>event.target).value;
  }
}
