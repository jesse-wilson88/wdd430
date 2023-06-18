// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

// import { Message } from "./message.model";
// import { DataStorageService } from "../shared/data-Storage.service";

// @Injectable({ providedIn: 'root' })
// export class MessageResolverService implements Resolve<Message[] {
//   constructor(private dataStorageService: DataStorageService) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
//   }
// }

import { Injectable } from '@angular/core';
import { Message } from './message.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesResolverService implements Resolve<Message[]> {
  constructor(private messageService: MessageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Message[] | Observable<Message[]> | Promise<Message[]> {
    const messages = this.messageService.getMessages();
    if (messages.length === 0) {
      return this.messageService.getMessages();
    } else {
      return messages;
    }
  }
}