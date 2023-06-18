import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;
  maxId: number = 0;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
    this.getContacts();
  }

  getContacts(): Contact[] {
    // console.log('Getting all contacts.');
      this.http
        .get<Contact[]>(
          'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/contacts.json'
        )
        .subscribe((contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
        }),
      (error: any) => {
        console.log('Error: ', error);
        };
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    // console.log('Getting a contact.');
    return this.contacts.find((c) => c.id === id);
  }

  getMaxId(): number {
    // console.log('Getting the contacts maxId.');

    for (const contact of this.contacts) {
      const currentId = Number(contact.id);
      if (currentId > this.maxId) {
        this.maxId = currentId;
      }
    }
    return this.maxId;
  }

  // Add contact will be called by the ContactEditComponent Save button
  addContact(newContact: Contact) {
    // console.log('Adding a contact.');
    if (!newContact) {
      return;
    }

    this.maxContactId = this.getMaxId();

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // const contactsCloneList = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsCloneList);
    this.storeContacts();
    this.contacts.sort((a, b) => (a.name > b.name ? 1 : b.name ? -1 : 0));
  }

  // Update contact will be called by the ContactEditComponent Save button
  updateContact(originalContact: Contact, newContact: Contact) {
    // console.log('Updating a contact.');
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);

    this.storeContacts();
  }

  // Delete contact will be called by the ContactDetailComponent Delete button
  deleteContact(contact: Contact) {
    // console.log('Deleting a contact.');
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);

    this.storeContacts();
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/JsonPipe'
    );
    this.http
      .put(
        'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers }
      )
      .subscribe(() => {
        const cloneContacts = this.contacts.slice();
        this.contactListChangedEvent.next(cloneContacts);
      });
  }
}
