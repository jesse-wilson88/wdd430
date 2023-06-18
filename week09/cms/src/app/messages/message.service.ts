import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
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

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages(): Message[] {
    // return this.messages.slice();
    this.http
      .get<Message[]>(
        'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json'
      )
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
