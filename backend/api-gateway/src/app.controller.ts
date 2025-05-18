import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { firstValueFrom, retry } from 'rxjs';

@Controller('api')
export class AppController {
  constructor(
    @Inject('UPD_SERVICE') private updClient: ClientProxy,
    @Inject('STORY_SERVICE') private storyClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('PD_SERVICE') private pdClient: ClientProxy,
    private appSer: AppService
  ) { }

  // -------------- AUTH -------------- //

  @Post("reg-user")
  async registerUser(@Body() data: any) {
    const { userData, user_name, description } = data;
    return this.authClient.send({ cmd: "reg-user" }, { userData, user_name, description });
  }

  @Post("logIn")
  async logIn(@Body() data: JSON) {
    return await firstValueFrom(this.authClient.send({ cmd: "logIn" }, data));
  }


  // -------------- UPD -------------- //

  @Get("upd/get/:id")
  async GetUser(@Param('id', ParseIntPipe) id: number) {
    return this.updClient.send({ cmd: 'get' }, { id: id });
  }

  /**
   * 
   * @param data userId,storyId,action
   * @returns {message, data:null or [markedList]}
   */
  @Post('upd/mark/update')
  async UpdateMark(@Body() data: any) {
    return this.updClient.send({ cmd: 'update-mark' }, data)
  }

  /**
   * 
   * @param id userId
   * @returns 
   */
  @Get('upd/mark/get/:id')
  async GetMark(@Param('id', ParseIntPipe) id: number) {
    return this.updClient.send({ cmd: "get-mark" }, id);
  }

  // -------------- Story -------------- //

  @Get("story/:id")
  async getStory(@Param('id', ParseIntPipe) id: number) {
    return this.storyClient.send({ cmd: 'get-story' }, id);
  }

  @Post("story/publish")
  async PublishStory(@Body() data: JSON) {
    return await firstValueFrom(this.storyClient.send({ cmd: 'publish' }, data));
  }

  @Get("list/stories")
  async GetStories() {
    return this.storyClient.send({ cmd: "get-list" }, {});
  }

  // -------------- PD -------------- //
  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @param pubType story || comment
   * @returns {message, data:null || like}
   */
  @Post('pd/like')
  async PostLike(@Body() data) {
    return this.pdClient.send({ cmd: 'post-like' }, data)
  }

  /**
   * 
   * @param userId Id del usuario
   * @param pubId Id de la publicacion
   * @returns {message, data:null || like}
   */
  @Post('pd/report')
  async Report(@Body() data) {
    return this.pdClient.send({ cmd: 'report' }, data)
  }

  /**
   * 
   * @param id PublicationId
   * @returns {message, data: [] || CommentList}
   */
  @Get('pd/comments/get/:id')
  async GetComments(@Param('id', ParseIntPipe) id: number) {
    return this.pdClient.send({ cmd: "get/comments" }, id);
  }

  /**
   * Agregar un comentario
   * @param data userId, pubId, content
   * @returns {Message, data:null || comment}
   */
  @Post('pd/comment/post')
  async PostComment(@Body() data) {
    return this.pdClient.send({ cmd: 'post/comment' }, data);
  }
}
