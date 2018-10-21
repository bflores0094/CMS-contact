import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();


   getDocuments(): Document[]{
    return this.documents.slice();
}
getDocument(id: string): Document{
      
  this.documents.forEach(element => {
    if (element.documentId == id){
          return element;
    } 
    
  });
  return null;
}

constructor() {
  this.documents = MOCKDOCUMENTS;
 }
}
