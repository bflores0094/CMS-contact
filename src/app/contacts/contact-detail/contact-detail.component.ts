import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  
  //@Output() selectedContactEvent = new EventEmitter<Contact>();
  

  contact: Contact;
  id: string;

  // onSelected(contact: Contact){
  //   this.selectedContactEvent.emit(contact);
  // }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
 
  constructor(private contactService: ContactService, private router: Router, private activeRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoutes.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log("test " + this.id);
        this.contact = this.contactService.getContact(this.id);
        console.log("here " + this.contact.name);
      }
    );
  }

}
