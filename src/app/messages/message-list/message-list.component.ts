import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[];

onAddMessage(message: Message){
  this.messages.push(message);
}

  constructor(private messagesService: MessagesService) {

    this.messages = messagesService.getMessages();
   }

  ngOnInit() {
    this.messagesService.messageChangeEmitter.subscribe(
      (messagesUpdate: Message[])=>{
        this.messages = messagesUpdate;
      }
    );
  }

}
