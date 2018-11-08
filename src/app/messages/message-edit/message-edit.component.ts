import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  currentSender: string = '1';

  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage(){
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    const newMsg: Message = new Message("1", subjectValue, msgTextValue, this.currentSender);
    this.messagesService.addMessage(newMsg);

    this.addMessageEvent.emit(newMsg);
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";

    
  }

  onClear(){
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
