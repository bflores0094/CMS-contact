import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contactId: number;
  public name: string;
  public email: string;
   public phone: string;
    public imageUrl: string;
  public group: string;

  constructor() {
    this.contactId;
    this.name;
    this.email;
    this.phone;
    this.imageUrl;
    this.group;

    
   }

  

  ngOnInit() {
  }
   
  storeData() {

  }

}
