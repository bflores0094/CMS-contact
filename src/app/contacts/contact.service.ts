import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


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
  
  getContacts(){
    this.http.get('https://cmscontacts-bd452.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      }, (error: any) => {
        console.log('Error getting documents');
      }
    );
  }

  storeContacts(contacts: Contact[]){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://cmscontacts-bd452.firebaseio.com/contacts.json', contacts, 
    {headers: headers})
    .subscribe(
      (response: Response) => {
      this.contactListChangedEvent.next(contacts.slice());
      }
    );
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
   // this.contactsClone = this.contacts.slice();
    this.storeContacts(this.contacts);
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

  constructor(private http: HttpClient) { 
  }
}
