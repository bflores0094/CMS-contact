import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../messages/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[];
  messageChangeEmitter = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  private messagesClone: Message[] = [];

  constructor(private http: HttpClient) { 
    this.getMessages();

  }

  getMaxId(): number{
    this.maxMessageId = 0;
    for (let message of this.messages){
      var currentId = +[message.messageId];
      if (currentId > this.maxMessageId){
        this.maxMessageId = currentId
      }
    }
    return this.maxMessageId;
  }

  //initMessages(){
 
  //}

  storeMessages(messagesClone: Message[]){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.put('https://cmscontacts-bd452.firebaseio.com/messages.json', messagesClone, 
      {headers: headers})
      .subscribe(
        (response: Response) => {
        this.messageListChangedEvent.next(messagesClone.slice());
        }
      );
  }

  getMessages(){
    this.http.get('https://cmscontacts-bd452.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      }, (error: any) => {
        console.log('Error getting messages');
      }
    );
  }

  getMessage(id: string){

    for(const message of this.messages){
      if(message.messageId === id){
        return message;
      }
    }
    

  }

  addMessage(message: Message){
    if (!message){
      return;
    }
    this.maxMessageId++;
    message.messageId = this.maxMessageId.toString();
    this.messages.push(message);
    //this.documentsClone = this.documents.slice();
    this.storeMessages(this.messages);
      
  }
}
