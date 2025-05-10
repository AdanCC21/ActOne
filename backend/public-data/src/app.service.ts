import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { BlobOptions } from 'buffer';

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

  async SetLike(id: number, pubId: number, pubType: string, userId: number, state: boolean) {
    try {
      if (!id) {
        const newLike = await this.prismaSer.likes.create({
          data: {
            user_id: userId,
            publication_id:pubId,
            publication_type:pubType
          }
        })
        return newLike;
      }else{
        const res = await this.prismaSer.likes.update({ where: { id: id }, data: { state: !state } })
        return res;
      }
    } catch (e) {
      console.error(e.message);
      return e.message
    }
  }

  async AddComment(userId: number, publicationId: number, content: string) {
  try {
    const newComment = await this.prismaSer.comments.create({
      data: {
        user_id: userId,
        publication_id: publicationId,
        content: content
      }
    });

    return {
      message: 'Comment added successfully',
      data: newComment
    };
  } catch (e) {
    console.error('AddComment error:', e.message);
    return {
      message: e.message,
      data: null
    };
  }
}

  
}
