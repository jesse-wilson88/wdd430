import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactSevice: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactSevice.getContacts();
  }

  onSelected(contact: Contact) {
    this.contactSevice.contactSelectedEvent.emit(contact);
  }
}
