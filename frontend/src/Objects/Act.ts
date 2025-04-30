export class Act {
    id:number;
    title:string;
    content:string;

    constructor(id:number) {
        this.id = id;
        this.title = 'Acto ' + id;
        this.content = "";
    }
}