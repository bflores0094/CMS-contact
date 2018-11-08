import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../messages/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[];
  messageChangeEmitter = new EventEmitter<Message[]>();

  constructor() { 

    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string){

    for(const message of this.messages){
      if(message.messageId === id){
        return message;
      }
    }
    

  }

  addMessage(message: Message){
      this.messages.push(message);
      this.messageChangeEmitter.emit(this.messages.slice());
      
  }
}
