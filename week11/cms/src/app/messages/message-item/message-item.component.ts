import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactsService } from 'src/app/contacts/contacts.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  // inputMessage can be message. but it needs to be in the following locations
  // -- message-item.component.html
  // -- message-list.component.html
  @Input() inputMessage: Message;
  messageSender: string;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    // const contact: Contact = this.contactsService.getContact(
    //   this.inputMessage.sender
    // );
    // this.messageSender = contact?.name;
  }
}
