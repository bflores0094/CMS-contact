
import {Injectable} from '@angular/core';

@Injectable()
export class Message{

    constructor(public messageId: string,
                public subject: string,
                public msgText: string,
                public sender: string){
                    

    }
}