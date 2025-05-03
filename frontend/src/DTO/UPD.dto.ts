export class UPD{
    id: number;
    user_name: string;
    description: string;
    profile_image_url: string;
    followers: number;
    following: number;
    published_stories: number[];
    modify_date: Date;

    constructor() {
        this.id = 0; 
        this.user_name = ""; 
        this.description = "";
        this.profile_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s";
        this.followers = 0;
        this.following = 0;
        this.published_stories = [];
        this.modify_date = new Date(); 
    }
}