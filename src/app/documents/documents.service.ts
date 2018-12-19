import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


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


 getDocuments() {
    this.http.get('https://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }, (error: any) => {
          console.log('Error getting documents');
        }
      );
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
      this.storeDocuments(this.documents);
      //this.documentsClone = this.documents.slice();
      //this.documentListChangedEvent.next(this.documentsClone);
  }

  addDocument(newDocument: Document){
    if (!newDocument){
      return;
    }
    const headers = new Headers({
      'Content-Type':'application/json'
    });
   newDocument.id = '';
   const strDocument = JSON.stringify(newDocument);

   this.http.post('https://localhost:3000/documents', strDocument, {headers: headers})
   .map(
     (response: Response) => {
        return response.json().obj;

     })
     .subscribe(
       (documents: Document[]) => {
         this.documents = documents;
         this.documentChangedEvent.next(this.documents.slice());
       }
     )
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    //this.documentsClone = this.documents.slice();
    this.storeDocuments(this.documents);
  }

  storeDocuments(documentsClone: Document[]){
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.put('https://cmscontacts-bd452.firebaseio.com/documents.json', documentsClone, 
      {headers: headers})
      .subscribe(
        (response: Response) => {
        this.documentListChangedEvent.next(documentsClone.slice());
        }
      );
    
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
    this.storeDocuments(this.documents);
    //this.documentsClone = this.documents.slice();
    //this.documentListChangedEvent.next(this.documentsClone);
  }

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
  }
}
