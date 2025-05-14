interface Comment {
    id: number;
    user_id: number;
    publication_id: number;
    content: string;
    create_date: Date;
    modify_date: Date;
}

export class E_PD {
    comments: Comment[];
    likes: number;

    constructor(comments?: Comment[], likes?: number) {
        this.comments = comments ?? [];
        this.likes = likes ?? 0;
    }
}
