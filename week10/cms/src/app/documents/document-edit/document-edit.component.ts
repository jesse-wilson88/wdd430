import { Component, OnDestroy, OnInit } from '@angular/core';
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
  id: string;
  documentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      // console.log(this.document);
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      '',
      value.name,
      value.description,
      value.url,
      value.children
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
}
