export class Document {
    public documentId: number;
    public documentName: string;
    public description: string;
    public docUrl: string;
    public children: string;

    constructor(documentId: number, documentName: string, description: string,
        docUrl: string, children: string){

        this.documentId = documentId;
        this.documentName = documentName;
        this.description = description;
        this.docUrl = docUrl;
        this.children = children;    
    }
}