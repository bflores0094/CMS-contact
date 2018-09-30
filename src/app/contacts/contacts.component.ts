import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contactId;
  public name;
  public email;
  public phone;
  public imageUrl;
  public group;

  constructor(contactId, name, email, phone, imageUrl, group) {
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
   }

  

  ngOnInit() {
  }
   
  storeData() {

  }

}
