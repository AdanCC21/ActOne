export class Act {
    id: number;
    title: string;
    author: string;
    content: string;

    constructor(id: number);
    constructor(id: number, title: string);
    constructor(id: number, title: string, content: string);

    constructor(id: number, title?: string, content?: string) {
        this.id = id;
        this.title = title ?? 'Acto ' + id;
        this.author = '';
        this.content = content ?? '';
    }
}
