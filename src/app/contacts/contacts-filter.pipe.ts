import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let newContacts: Contact[] = [];
    if (term && term.length > 0){
      newContacts = contacts.filter((contact: Contact) => 
      
        contact.name.toLowerCase().includes(term.toLowerCase()));
    }

    if (newContacts.length > 0){
      return newContacts;
    }
    return contacts;
  }

}
