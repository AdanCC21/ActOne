export class E_UPD {
    id: number;
    user_name: string;
    description: string;
    profile_image_url: string;
    followers: number[];
    following: number[];

    published_stories: number[];
    marked_stories: number[];
    stories_liked: number[];

    modify_date: Date;

    constructor()
    constructor(json?:any);
    constructor(json?: any) {
        this.id = json?.id ?? 0;
        this.user_name = json?.user_name ?? "";
        this.description = json?.description ?? "";
        this.profile_image_url = json?.profile_image_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s";

        this.followers = json?.followers ?? [];
        this.following = json?.following ?? [];

        this.published_stories = json?.published_stories ?? [];
        this.marked_stories = json?.marked_stories ?? [];
        this.stories_liked = json?.stories_liked ?? [];

        this.modify_date = json?.modify_date ? new Date(json.modify_date) : new Date();
    }
}
