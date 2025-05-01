export class Act {
    id:number;
    title:string;
    author:string;
    content:string;
    

    constructor(id:number) {
        this.id = id;
        this.title = 'Acto ' + id;
        this.content = "";
    }
}