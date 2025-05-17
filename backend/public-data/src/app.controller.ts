import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('pd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
   * 
   * @param pubId 
   * @returns {message, data: [] || CommentList}
   */
  @MessagePattern({ cmd: "get/comments" })
  async GetComments(@Payload() pubId: number) {
    return await this.appService.GetComments(pubId);
  }

  /**
   * Agregar un comentario
   * @param data userId, pubId, content
   * @returns {Message, data:null || comment}
   */
  @MessagePattern({ cmd: "post/comment" })
  async PostComment(@Payload() data) {
    return await this.appService.AddComment(data.userId, data.pubId, data.content);
  }

  // -------- Likes -------- //

  @Get('get/likes/:pubId/:pubType')
  async GetLikes(@Param('pubId', ParseIntPipe) pubId: number, @Param('pubType') pubType: string) {
    return await this.appService.GetLikes(pubId, pubType);
  }

  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @param pubType story || comment
   * @returns {message, data:null || like}
   */
  @MessagePattern({ cmd: 'post-like' })
  async PostLike(data: any) {
    return await this.appService.InsertLike(data.userId, data.pubId, data.pubType);
  }


  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @returns {message, data:null || like}
   */
  @MessagePattern({ cmd: 'report' })
  async ReportPub(data: any) {
    return await this.appService.ReportPub(data.userId, data.pubId);
  }
}
