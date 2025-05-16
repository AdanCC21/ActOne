export class E_Story {
    id: number;
    title: string;
    authorId: number;
    synopsis: string;
    acts: Array<number>;

    likesCount: number;
    commentsCount: number;
    reportsCount: number;

    visibility: boolean;
    creation_date: Date;
    mody_date: Date;

    constructor();
    constructor(title: string, acts: Array<number>, authorId: number, synopsis: string, visibility: boolean);

    constructor(title?: string, acts?: Array<number>, authorId?: number, synopsis?: string, visibility?: boolean) {
        this.id = 0;
        this.title = title ?? '';
        this.authorId = authorId ?? 0;
        this.synopsis = synopsis ?? '';
        this.acts = acts ?? [];

        this.likesCount = 0;
        this.commentsCount = 0;
        this.reportsCount = 0;

        this.visibility = visibility ?? false;
        this.creation_date = new Date();
        this.mody_date = new Date();
    }
}
