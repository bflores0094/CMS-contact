export class Contact {
    public contactId: number;
    public name: string;
    public phone: string;
    public email: string;
    public imageUrl: string;
    public group: string;

    constructor(contactId: number, name: string, phone: string,
        email: string, imageUrl: string, group: string){

        this.contactId = contactId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.imageUrl = imageUrl;
        this.group = group;
    
    }
}