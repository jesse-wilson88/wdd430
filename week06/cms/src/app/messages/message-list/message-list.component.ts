import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  // Lifecycle hook/method
  ngOnInit() {
    // this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });

    // load messages
    this.messages = this.messageService.getMessages();
  }

  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  // }
}
