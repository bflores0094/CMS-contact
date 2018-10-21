import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];
  contactSelectedEvent = new EventEmitter<Contact>();
  
  getContacts(): Contact[]{
      return this.contacts.slice();
  }

  getContact(id: string): Contact{
      
    this.contacts.forEach(element => {
      if (element.id == id){
            return element;
      } 
      
    });
    return null;
  }

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
}
