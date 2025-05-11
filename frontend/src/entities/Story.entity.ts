export class E_Story {
    id: number
    title: string
    author: string
    acts: Array<number>
    likes_count: number
    comments: number
    reports: number
    visibility: boolean
    creation_date: Date
    mody_date: Date
    
    constructor() {
        this.id = 0
        this.title = ''
        this.author = ''
        this.acts = []
        this.likes_count = 0
        this.comments = 0
        this.reports = 0
        this.visibility = true
        this.creation_date = new Date()
        this.mody_date = new Date()
    }
}
