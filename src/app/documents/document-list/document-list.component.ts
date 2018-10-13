import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [new Document(1, 'School file', 'Grade report for 1st semester', 'byui.edu', 'docs' ),
                          new Document(2, 'Work file', 'Tax return info', 'byui.edu', 'docs' ),
                          new Document(3, 'School file', 'Tuition payment receipt', 'byui.edu', 'docs' ),
                          new Document(4, 'Homework', 'CIT 365 Assignment', 'byui.edu', 'docs' ),
                      ];
  constructor() { }

  public onSelectedDocument(document: Document){

    this.selectedDocumentEvent.emit(document);
  }

  ngOnInit() {
  }

}
