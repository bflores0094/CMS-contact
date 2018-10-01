import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1, 'Brandon Flores', '703-340-0795', 'flo@gmail.com', 
    '../img/brandon.jpg', null),
    new Contact(2, 'Bro Barzee', '208-496-3768', 'barzeer@byui.edu', 
    'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
  }

}
