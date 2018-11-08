import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

id: string;
document: Document; 
nativeWindow: any;

// @Output() selectedDocumentEvent = new EventEmitter<Document>();

// onSelected(document: Document){
//   this.selectedDocumentEvent.emit(document);
// }


  constructor(private documentsService: DocumentsService, private router: Router, private activeRoutes: ActivatedRoute,
              private windRefService: WindRefService) { 
                this.nativeWindow = windRefService.getNativeWindow();
              }

  onView(){
    if (this.document.url){
        this.nativeWindow.open(this.document.url);
    };
  }

  onDelete(){
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

  ngOnInit() {
    this.activeRoutes.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.document = this.documentsService.getDocument(this.id);
        console.log(this.document);
      }
    );
  }

}
