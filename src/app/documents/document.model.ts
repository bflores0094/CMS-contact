import {Injectable} from '@angular/core';

@Injectable()
export class Document{

    constructor(public documentId: string,
                public documentName: string,
                public description: string,
                public docUrl: string,
                public children: string){

    }
}