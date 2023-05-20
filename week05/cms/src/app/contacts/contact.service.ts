import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactsChanged = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find((c) => c.id === id);
    return contact ? contact : null;
  }
}
