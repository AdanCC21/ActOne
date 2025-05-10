export class Act {
    id: number;
    title: string;
    story_id: number;
    content: string;

    constructor(id: number, story_id: number, title?: string, content?: string) {
        this.id = id;
        this.title = title ?? 'Acto ' + id;
        this.story_id = story_id;
        this.content = content ?? '';
    }
}
