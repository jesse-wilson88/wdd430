import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: number;
  documentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

      const originalDocument = this.documentService.getDocument('id');

      if (!originalDocument) {
        return;
      }

      this.editMode = true;

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      console.log(this.document);
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    }
  }
}
