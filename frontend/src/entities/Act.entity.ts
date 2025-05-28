export class E_Act {
    id: number;
    act_number: number;
    title: string;
    author: string;
    content: string;

    constructor(id?: number, title?: string, content?: string, act_number?: number) {
        this.id = id ?? 0;
        this.act_number = act_number ?? this.id;
        this.title = title ?? 'Act ' + id;
        this.author = '';
        this.content = content ?? '';
    }
}
