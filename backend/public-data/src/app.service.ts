import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaSer: PrismaService) { }

  async GetComments(pubId: number) {
    try {
      const commentsList = await this.prismaSer.comments.findMany({ where: { publication_id: pubId } })
      if (commentsList.length === 0) throw new Error("This publication doesn't have comments");

      return commentsList;
    } catch (e) {
      console.error(e.message);
      return {
        message: e.message,
        data: null
      }
    }
  }

  async GetLikes(pubId: number, pubType: string) {
    try {
      const likeCount = await this.prismaSer.likes.count({ where: { publication_id: pubId, publication_type: pubType, state: true } })

      return likeCount;
    } catch (e) {
      console.error(e.message);
      return {
        message: e.message,
        data: null
      }
    }
  }
}
