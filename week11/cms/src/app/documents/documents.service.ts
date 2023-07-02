import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  document: Document;
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.getDocuments();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(
        'http://localhost:3000/documents'
      )
      .subscribe((responseData) => {
        this.documents = responseData;
        this.sortAndSend();
      }),
      (error: any) => {
        console.log('Error: ', error);
      };
    return this.documents;
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
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

    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
  }

  sortAndSend() {
    // console.log('Sorting...');
    this.documents.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // storeDocuments() {
  //   const documents = JSON.stringify(this.documents);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/Json');
  //   this.http
  //     .put(
  //       'https://ng-cms-project-e0b45-default-rtdb.firebaseio.com/documents.json',
  //       // 'http://127.0.0.1:3000/documents',
  //       documents,
  //       { headers }
  //     )
  //     .subscribe(() => {
  //       const cloneDocuments = this.documents.slice();
  //       this.documentListChangedEvent.next(cloneDocuments);
  //     });
  // }
}
