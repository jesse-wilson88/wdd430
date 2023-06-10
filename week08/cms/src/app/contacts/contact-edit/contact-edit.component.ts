import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent {
  contact: Contact;
  onCancel() { }
  
  onSubmit(form: NgForm) { }

}
