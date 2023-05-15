import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  // contact: Contact = new Contact(
  //   '1',
  //   'Kent Jackson',
  //   'jacksonk@byui.edu',
  //   '208-496-3771',
  //   '../../assets/images/jacksonk.jpg',
  //   null
  // );

  constructor() {}

  ngOnInit() {}

  name = 'Brother Wilson';
}
