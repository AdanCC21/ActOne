export class E_Act {
    id: number;
    title: string;
    author: string;
    content: string;

    constructor(id?: number, title?: string, content?: string) {
        this.id = id ?? 0;
        this.title = title ?? 'Acto ' + id;
        this.author = '';
        this.content = content ?? '';
    }
}
