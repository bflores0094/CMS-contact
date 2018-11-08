import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [new Message(1, 'Homework', 'Hey could you help me with homework?', 'Brandon'),
                         new Message(2, 'Homework', 'Yeah! What time?', 'Ash'),
                         new Message(3, 'Homework', 'How does 3 sound?', 'Brandon'),
                         new Message(4, 'Homework', 'That sounds great!', 'Ash')

];

onAddMessage(message: Message){
  this.messages.push(message);
}

  constructor() { }

  ngOnInit() {
  }

}
