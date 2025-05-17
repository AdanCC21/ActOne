import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('pd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('get/comments/:pubId')
  async GetComments(@Param('pubId', ParseIntPipe) pubId: number) {
    return await this.appService.GetComments(pubId);
  }

  @Post('post/comment/:pubId')
  async PostComment(@Param('pubId', ParseIntPipe) pubId: number, @Body() data: any) {
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
}
