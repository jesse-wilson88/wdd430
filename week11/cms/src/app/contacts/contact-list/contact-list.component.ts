import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: String;
  private subscription: Subscription;

  constructor(private contactsSevice: ContactsService) {}

  ngOnInit() {
    this.subscription = this.contactsSevice.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        // if (Array.isArray(contacts)) {
        this.contacts = contacts;
        // } else {
        // Handle the error case appropriately
        // console.error('Error retrieving documents: ', contacts);
        // }
      }
    );
    this.contactsSevice.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
