import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsResolverService implements Resolve<Contact[]> {
  constructor(private contactService: ContactService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contact[]> | Promise<Contact[]> | Contact[] {
    const contacts = this.contactService.getContacts();
    if (contacts.length === 0) {
      return this.contactService.getContacts();
    } else {
      return contacts;
    }
  }
}
