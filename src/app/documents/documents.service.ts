import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  private documentsClone: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxId = new Number();
  maxDocumentId: any;


  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getMaxId(): Number {
    this.maxId = 0;
    for (let document of this.documents){
      var currentId = +[document.id];
      if (currentId > this.maxId){
        this.maxId = currentId
      }
    }
    return this.maxId;
  }

  getDocument(id: string): Document {

    for (const document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document){
      if (document === null){
        return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0){
        return;
      }
      this.documents.splice(pos, 1);
      this.documentsClone = this.documents.slice();
      this.documentListChangedEvent.next(this.documentsClone);
  }

  addDocument(newDocument: Document){
    if (newDocument == null || !newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    this.documentsClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (originalDocument == null || newDocument == null){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsClone);
  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
}
