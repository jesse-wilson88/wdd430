import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Message } from "./message.model";
import { DataStorageService } from "../shared/data-Storage.service";

@Injectable({ providedIn: 'root' })
export class MessageResolverService implements Resolve<Message[] {
  constructor(private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
  }
}