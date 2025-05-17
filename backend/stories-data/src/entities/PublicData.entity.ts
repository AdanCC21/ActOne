export class PublicData {
  likes_count: number;
  comments_count: number;
  reports_count: number;
  marked_count: number;

  constructor(
    likesC: number = 0,
    commentsC: number = 0,
    reportC: number = 0,
    markedC: number = 0
  ) {
    this.likes_count = likesC;
    this.comments_count = commentsC;
    this.reports_count = reportC;
    this.marked_count = markedC;
  }
}
