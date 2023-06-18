import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private messageServices: MessageService
  ) {}

  storeMessages() {
    const messages = this.messageServices.getMessages();
    this.http
      .put(
        'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/documents.json',
        messages
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // fetchMessages() {
  //   this.http
  //     .get<Message[]>(
  //       'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/documents.json'
  //     )
  //     .pipe(
  //       map((messages) => {
  //         return messages.map((message) => {
  //           return {
  //             ...message,
  //             sender: message.sender ? String(message.sender) : '',
  //           };
  //         });
  //       })
  //     )
  //     .subscribe((messages) => {
  //       this.messageServices.setMessages(messages);
  //     });
  // }
}
