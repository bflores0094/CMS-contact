import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Document } from '../document.model';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  values: Document;
  newDocument: Document;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params) => {
        if (!params.id){
          this.editMode = false;
          
        } else {
          this.originalDocument = this.documentService.getDocument(params.id);
        
        }
        if (!this.originalDocument){
          return
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onSubmit(form: NgForm){
    this.newDocument = form.value;
    console.log("New Doc Id:" + this.newDocument.id);

    if (this.editMode){
        this.documentService.updateDocument(this.originalDocument, this.newDocument);
    } else {
      this.documentService.addDocument(this.newDocument);
    }
    this.router.navigate(["/documents"]);

  }

  onCancel(){
    this.router.navigate(["/documents"]);
  }

}
