import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { DndModule } from 'ng2-dnd';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { 

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  //  this.contactService.contactChangedEvent.subscribe(
  //    (contacts: Contact[])=>{
  //      this.contacts = contacts;
  //   }
  //  )

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
)
  }

}
