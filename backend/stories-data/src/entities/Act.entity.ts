export class Act {
    id: number;
    act_number: number;
    title: string;
    story_id: number;
    content: string;

    constructor(id: number, story_id: number, title?: string, content?: string, act_number?: number) {
        this.id = id;
        this.act_number = act_number ?? 0;
        this.title = title ?? 'Act ' + id;
        this.story_id = story_id;
        this.content = content ?? '';
    }
}
