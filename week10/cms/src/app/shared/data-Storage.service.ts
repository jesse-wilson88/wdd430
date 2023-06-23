import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //   storeMessages() {
  //     const messages = this.messageService.getMessages();
  //     this.http
  //       .put(
  //         'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json',
  //         messages
  //       )
  //       .subscribe((response) => {
  //         console.log(response);
  //       });
  //   }

//   fetchMessages() {
//     // const messages = this.messageService.getRecipes();
//     return this.http
//       .get<Message[]>(
//         'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/messages.json'
//       )
//       .pipe(
//         map((messages) => {
//           return messages.map((message) => {
//             return {
//               ...message,
//               sender: message.sender ? message.sender : [],
//             };
//           });
//         }),
//         tap((messages) => {
//           this.messageService.setMessages(messages);
//         })
//       );
//   }
}
