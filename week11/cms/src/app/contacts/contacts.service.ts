import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';

import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  contact: Contact;
  maxContactId: number;
  // loadedContacts: Contact[];

  constructor(private http: HttpClient) {
    // this.getContacts();
  }

  getContacts(): Contact[] {
    // console.log('Getting all contacts.');
    this.http
      .get<{ message: string; contacts: Contact[] }>(
        // 'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/contacts.json'
        'http://127.0.0.1:3000/contacts'
      )
      .pipe(
        map((responseData) => {
          const contacts: Contact[] = responseData.contacts;
          return contacts;
        })
      )
      .subscribe((responseData) => {
        this.contacts = responseData;
        // console.log('Response: ' + this.contacts);
        this.sortAndSend();
      }),
      (error: any) => {
        console.log('Error: ', error);
      };
    return this.contacts;
  }

  // getContacts(): Contact[] {
  //     this.http
  //       .get<{ message: string; contacts: Contact[] }>(

  //         'http://127.0.0.1:3000/contacts'
  //       )
  //       .pipe(
  //         map((responseData) => {
  //           const contacts: Contact[] = responseData.contacts;
  //           return contacts;
  //         })
  //       )
  //       .subscribe({
  //         next: (n) => {
  //           // console.log(typeof (n));
  //           this.contacts = n;
  //           this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
  //           this.loadedContacts = this.contacts.slice();
  //         },
  //         error: (e) => console.error(e),
  //         complete: () => {
  //           this.contactListChangedEvent.next(this.loadedContacts);
  //         },
  //       });
  //     return this.loadedContacts;
  //   }

  // getContact(id: string) {
  //   // console.log('Getting a contact.');
  //   // return this.contacts.find((c) => c.id === id);
  //   return this.http.get<{ message: string; contact: string }>(
  //     'http://localhost:3000/contacts/' + id
  //   );
  // }

  // getContact(id: string): Contact {
  //   // this.http
  //   //   .get<{ message: string; contact: Contact }>(
  //   //     `http://127.0.0.1:3000/contacts/${id}`
  //   //   )
  //   //   .pipe(
  //   //     map((responseData) => {
  //   //       const contact: Contact = responseData.contact;
  //   //       return contact;
  //   //     })
  //   //   )
  //   //   .subscribe({
  //   //     next: (n) => {
  //   //       this.contact = n;
  //   //       console.log('N: ' + n);
  //   //     },
  //   //     error: (e) => console.error(e),
  //   //   });
  //   // return this.contact;
  // }

  // getContact(id: string): Contact {
  //   return this.contacts.find((contact) => contact.id === id);
  // }

  getContactId(id: string) {
    return this.http.get<{ message: string; contact: Contact }>(
      `http://127.0.0.1:3000/contacts/${id}`
    );
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id === id);
  }

  // getContact(id: string): Contact {
  //   this.http
  //     .get<{ message: string; contact: Contact }>(
  //       'http://localhost:3000/contacts/' + id
  //     )
  //     .subscribe((result) => {
  //       this.contact = result.contact;
  //     });
  //   return this.contact;
  // }

  getMaxId(): number {
    // console.log('Getting the contacts maxId.');
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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
    // this.contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    this.sortAndSend();
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

  sortAndSend() {
    // console.log('Sorting...');
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/JsonPipe'
    );
    this.http
      .put(
        // 'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/contacts.json'
        'http://localhost:3000/contacts',
        contacts,
        { headers }
      )
      .subscribe(() => {
        const cloneContacts = this.contacts.slice();
        this.contactListChangedEvent.next(cloneContacts);
      });
  }
}
