import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DndModule } from 'ng2-dnd';


@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contact: Contact;
  //@Output() selectedContactEvent = new EventEmitter<void>();
  

  constructor(private contactService: ContactService) { 
    
  }

  ngOnInit() {
  }

}
