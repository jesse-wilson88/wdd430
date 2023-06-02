import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id === id);
  }
}
