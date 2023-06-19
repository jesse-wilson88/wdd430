import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

import { Message } from './message.model';
import { MessageService } from './message.service';
// import { DataStorageService } from '../shared/data-Storage.service';

@Injectable({ providedIn: 'root' })
export class MessagesResolverService implements Resolve<Message[]> {
  constructor(private messageService: MessageService) {}
  // constructor(private dataStorageService: DataStorageService) {}

  // public resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Message[] | Observable<Message[]> | Promise<Message[]> {
  //   return this.messageService.getMessages().pipe(
  //     map((messages: Message[]) => {
  //       if (messages.length === 0) {
  //         return this.messageService.getMessages();
  //       } else {
  //         return messages;
  //       }
  //     })
  //   );
  // }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Message[] | Observable<Message[]> | Promise<Message[]> {
  //   const messages = this.messageService.getMessages();
  //   // console.log('Messages length: ', messages.length);
  //   if (messages.length === 0) {
  //     return this.messageService.getMessages();
  //   } else {
  //     return messages;
  //   }
  // }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Message[] | Observable<Message[]> | Promise<Message[]> {
    return this.messageService.getMessages();
    // return this.dataStorageService.fetchMessages();
  }
}
