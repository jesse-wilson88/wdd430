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
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    const documentsCloneList = this.documents.slice()
    this.documentListChangedEvent.next(documentsCloneList);
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id === id);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = Number(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsCloneList = this.documents.slice();
    this.documentListChangedEvent.next(documentsCloneList);
  }
}
