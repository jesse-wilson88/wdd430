import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';
// import { DataStorageService } from '../shared/data-Storage.service';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    // this.messages = this.messages;
    this.getMessages();
  }

  // setMessages(messages: Message[]) {
  //   this.messages = messages;
  //   this.messageChangedEvent.next(this.messages.slice());
  // }

  getMessages() {
    // return this.messages.slice();
    return (
      this.http
        .get<Message[]>(
          'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json'
        )
        .subscribe((messages: Message[]) => {
          this.messages = messages;
          // this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        }),
      (error: any) => {
        console.log('Error: ', error);
      }
    );
  }

  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = Number(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(newMessage: Message) {
    // console.log('Trying to add a message!');
    // this.messages.push(newMessage);
    // this.messageChangedEvent.next(this.messages.slice());
    if (!newMessage) {
      // console.log('No messages found!');
      return;
    }

    this.maxMessageId = this.getMaxId();
    this.maxMessageId++;

    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);

    this.storeMessages();
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders().set('Content-Type', 'application/Json');
    this.http
      .put(
        'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers }
      )
      .subscribe(() => {
        const cloneMessages = this.messages.slice();
        this.messageChangedEvent.next(cloneMessages);
      });
  }
}
