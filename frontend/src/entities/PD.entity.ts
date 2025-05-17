export class E_Comment {
  id: number;
  user_id: number;
  publication_id: number;
  content: string;
  create_date: Date;
  modify_date: Date;

  // Default constructor
  constructor();

  // Overloaded constructor
  constructor(content: string, user_id: number, publication_id: number);

  // Unified implementation
  constructor(content?: string, user_id?: number, publication_id?: number) {
    this.id = 0; // You can update this when saving to DB
    this.user_id = user_id ?? 0;
    this.publication_id = publication_id ?? 0;
    this.content = content ?? '';
    const now = new Date();
    this.create_date = now;
    this.modify_date = now;
  }
}


export class E_PD {
    comments: Comment[];
    likes: number;

    constructor(comments?: Comment[], likes?: number) {
        this.comments = comments ?? [];
        this.likes = likes ?? 0;
    }
}
