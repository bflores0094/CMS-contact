import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(1, 'Brandon Flores', '703-340-0795', 'flo@gmail.com', 
    'https://www.facebook.com/photo.php?fbid=10155660764359477&set=a.431361704476&type=3&theater', null),
    new Contact(2, 'Bro Barzee', '208-496-3768', 'barzeer@byui.edu', 
    'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }

  constructor() { }

  ngOnInit() {
  }

}
