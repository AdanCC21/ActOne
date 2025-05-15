export class Story {
    id: number
    title: string
    // upd_id
    author_id: number
    synopsis: String
    // ids
    acts: Array<number>

    likes_count: number
    comments: number
    reports: number

    visibility: boolean
    creation_date: Date
    mody_date: Date

    constructor(title: string, acts: Array<number>, authorId: number, synopsis: string, visibility: boolean) {
        this.id = 0
        this.title = title ?? '';
        this.author_id = authorId ?? 0;
        this.synopsis = synopsis ?? "";
        this.acts = acts ?? [];
        this.likes_count = 0
        this.comments = 0
        this.reports = 0
        this.visibility = visibility ?? false;
        this.creation_date = new Date()
        this.mody_date = new Date()
    }
}

