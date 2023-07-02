import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { ContactsService } from '../contacts/contacts.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(
    private http: HttpClient,
    private contactsService: ContactsService
  ) {}

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages(): Message[] {
    this.http
      .get<Message[]>('http://127.0.0.1:3000/messages')
      .pipe(
        map((responseData) => {
          const messages: Message[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messages.push({ ...responseData[key], id: key });
            }
          }
          return messages;
        })
      )
      .subscribe({
        next: (n) => {
          this.maxMessageId = this.getMaxId();
          this.messages = n;
          this.messages.sort((a: Message, b: Message) => +a.id - +b.id);
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (e) => console.error(e),
        complete: () => {
          this.messages;
        },
      });
    // .subscribe((responseData) => {
    //   this.messages = responseData;
    //   this.sortAndSend();
    // });
    return this.messages;
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
    if (!newMessage) {
      return;
    }

    this.maxMessageId = this.getMaxId();
    this.maxMessageId++;

    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);

    // this.storeMessages();
  }

  // sortAndSend() {
  //   // console.log('Sorting...');
  //   this.messages.sort((a, b) =>
  //     a.id > b.id ? 1 : b.id > a.id ? -1 : 0
  //   );
  //   this.messageChangedEvent.next(this.messages.slice());
  // }

  // storeMessages() {
  //   const messages = JSON.stringify(this.messages);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/Json');
  //   this.http
  //     .put(
  //       // 'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json',
  //       'http://127.0.0.1:3000/messages',
  //       messages,
  //       { headers }
  //     )
  //     .subscribe(() => {
  //       const cloneMessages = this.messages.slice();
  //       this.messageChangedEvent.next(cloneMessages);
  //     });
  // }
}
