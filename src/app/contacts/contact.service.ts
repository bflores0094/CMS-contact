import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Contact[] = [];
  private contactsClone: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxId = new Number();
  maxContactId: any;
  
  getContacts(): Contact[]{
      return this.contacts.slice();
  }

  getContact(id: string): Contact{
      
    for(const contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
  
  }

  getMaxId(): Number {
    this.maxId = 0;
    for (let contact of this.contacts){
      var currentId = +[contact.id];
      if (currentId > this.maxId){
        this.maxId = currentId
      } 
    }
    return this.maxId;
  }

  deleteContact(contact: Contact){
    if (contact === null){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactsClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsClone);
  }

  addContact(newContact: Contact){
    if (newContact == null || !newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    this.contactsClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (originalContact == null || newContact == null){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0){
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsClone);
  }

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
}
