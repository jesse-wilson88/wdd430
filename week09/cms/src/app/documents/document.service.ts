import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    // return this.documents.slice();
    // console.log("Getting the documents!")
    return (
      this.http
        .get<Document[]>(
          'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/documents.json'
        )
        .subscribe(
          (documents: Document[]) => {
            this.documents = documents.sort();
            // this.maxDocumentId = this.getMaxId();
            this.documents.sort((a, b) => a.name > b.name ? 1 : b.name ? -1 : 0)
            this.documentListChangedEvent.next(this.documents.slice());
        }),
      (error: any) => {
        console.log(error);
      }
    );
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
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
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
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
