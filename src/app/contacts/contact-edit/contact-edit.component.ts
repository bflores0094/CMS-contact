import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DndModule } from 'ng2-dnd';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact: Contact = null;
  originalContact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  newContact: Contact = null;
  invalidGroupContact: boolean = null;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params) => {
        if (!params.id){
          this.editMode = false;
          
        } else {
          this.originalContact = this.contactService.getContact(params.id);
        
        }
        if (!this.originalContact){
          return
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    )
  }

  onSubmit(form: NgForm){
    this.newContact = form.value;
    console.log("New Contact Id:" + this.newContact.id);

    if (this.editMode){
        this.contactService.updateContact(this.originalContact, this.newContact);
    } else {
      this.contactService.addContact(this.newContact);
    }
    this.router.navigate(["/contacts"]);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact){
    if (!this.newContact){
      return true;
    }
    if (this.newContact.id === this.contact.id){
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (this.newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedCOntact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedCOntact);
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedCOntact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
