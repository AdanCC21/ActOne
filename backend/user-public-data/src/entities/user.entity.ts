export class User {
    id: number;
    user_name: string;
    description: string;
    profile_image_url: string;
    
    followers: number;
    following: number;
    
    published_stories: Array<number>;
    marked_stories: Array<number>;
}