import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaSer: PrismaService) { }

  /**
   * 
   * @param pubId 
   * @returns {message, data: [] || CommentList}
   */
  async GetComments(pubId: number) {
    try {
      const commentsList = await this.prismaSer.comments.findMany({ where: { publication_id: pubId } })
      if (commentsList.length === 0) return { message: "This publication doesn't have comments", data: [] };

      return { message: 'ok', data: commentsList };
    } catch (e) {
      console.error(e.message);
      return { message: e.message, data: [] };
    }

  }

  /**
   * 
   * @param userId 
   * @param pubId 
   * @param content 
   * @returns {Message, data:null || comment}
   */
  async AddComment(userId: number, pubId: number, content: string) {
    try {
      const newComment = await this.prismaSer.comments.create({
        data: {
          user_id: userId,
          publication_id: pubId,
          content: content
        }
      });

      await this.UpdateStory(pubId, { comments_count: +1 })

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

  // --------------------------------------------------------

  async GetLikes(pubId: number, pubType: string) {
    try {
      const likeCount = await this.prismaSer.likes.count({ where: { publication_id: pubId, publication_type: pubType, state: true } })

      return { message: 'ok', data: likeCount };
    } catch (e) {
      console.error(e.message);
      return {
        message: e.message,
        data: 0
      }
    }
  }

  /**
   * 
   * @param userId 
   * @returns 
   */
  async GetUserLikes(userId: number) {
    try {
      const likesList = await this.prismaSer.likes.findMany({ where: { user_id: userId } });
      return { message: "ok", data: likesList };
    } catch (e) {
      console.error(e);
      return { message: e.message, data: null };
    }

  }

  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @param pubType story || comment
   * @returns {message, data:null || like}
   */
  async InsertLike(userId: number, pubId: number, pubType: string) {
    try {
      console.log(userId);
      const likeExist = await this.prismaSer.likes.findFirst({ where: { user_id: userId, publication_id: pubId } });
      if (!likeExist) {
        const newLike = await this.prismaSer.likes.create({
          data: {
            user_id: userId,
            publication_id: pubId,
            publication_type: pubType
          }
        })

        if (pubType === 'story') {
          await this.UpdateStory(pubId, { likes_count: 1 })
        }

        return { message: "ok", data: newLike };
      } else {
        const res = await this.prismaSer.likes.update({ where: { id: likeExist.id }, data: { state: !likeExist.state } })

        likeExist.state ? await this.UpdateStory(pubId, { likes_count: -1 }) : await this.UpdateStory(pubId, { likes_count: 1 })

        return { message: "ok", data: res };
      }
    } catch (e) {
      console.error(e);
      return { message: e.message, data: null };
    }
  }

  // ------------------------------------------------------------------------
  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @returns {message, data:null || like}
   */
  async ReportPub(userId: number, pubId: number) {
    try {
      const reportExist = await this.prismaSer.reports.findFirst({ where: { user_id: userId, publication_id: pubId } });
      if (!reportExist) {
        const newReport = await this.prismaSer.reports.create({
          data: {
            user_id: userId,
            publication_id: pubId,
            content: ''
          }
        })

        await this.UpdateStory(pubId, { reports_count: 1 })

        return { message: "ok", data: newReport };
      } else {
        const res = await this.prismaSer.reports.update({ where: { id: reportExist.id }, data: { state: !reportExist.state } })

        reportExist.state ? await this.UpdateStory(pubId, { reports_count: -1 }) : await this.UpdateStory(pubId, { reports_count: 1 })

        return { message: "ok", data: res };
      }
    } catch (e) {
      console.error(e);
      return { message: e.message, data: null };
    }
  }


  async UpdateStory(storyId: number, data) {
    try {
      const fetchData = await fetch('http://localhost:3013/story/set/pd', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: storyId, pd: data })
      })
      if (!fetchData.ok) throw new Error('something is wrong with Story Update');

      return await fetchData.json();
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

}
