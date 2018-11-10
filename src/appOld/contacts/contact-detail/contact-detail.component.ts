import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
 
  constructor() { }

  ngOnInit() {
  }

}
