import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find((c) => c.id === id);
  }
}
