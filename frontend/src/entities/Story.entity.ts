export class E_Story {
    id: number;
    title: string;
    author_id: number;
    synopsis: string;
    acts: Array<number>;

    likes_count: number;
    comments_count: number;
    reports_count: number;
    marked_count: number;

    visibility: boolean;
    creation_date: Date;
    mody_date: Date;

    constructor();
    constructor(title: string, acts: Array<number>, author_id: number, synopsis: string, visibility: boolean);

    constructor(title?: string, acts?: Array<number>, author_id?: number, synopsis?: string, visibility?: boolean) {
        this.id = 0;
        this.title = title ?? '';
        this.author_id = author_id ?? 0;
        this.synopsis = synopsis ?? '';
        this.acts = acts ?? [];

        this.likes_count = 0;
        this.comments_count = 0;
        this.reports_count = 0;
        this.marked_count = 0;

        this.visibility = visibility ?? false;
        this.creation_date = new Date();
        this.mody_date = new Date();
    }
}
