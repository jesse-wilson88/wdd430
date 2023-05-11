import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('id1', 'docName1', 'docDesc1', 'docUrl1', null),
    new Document('id2', 'docName2', 'docDesc2', 'docUrl2', null),
    new Document('id3', 'docName3', 'docDesc3', 'docUrl3', null),
    new Document('id4', 'docName4', 'docDesc4', 'docUrl4', null),
    new Document('id5', 'docName5', 'docDesc5', 'docUrl5', null),
  ];
  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
