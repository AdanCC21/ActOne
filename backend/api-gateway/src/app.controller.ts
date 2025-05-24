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

  @Post("reg")
  async registerUser(@Body() data: any) {
    const { userData, user_name, description } = data;
    return firstValueFrom(this.authClient.send({ cmd: "reg/user" }, { userData, user_name, description }));
  }

  @Post("logIn")
  async logIn(@Body() data: JSON) {
    return await firstValueFrom(this.authClient.send({ cmd: "logIn" }, data));
  }

  /**
   * 
   * @param email 
   * @returns True if is in use, false if is free
   */
  @Get("email/used/:email")
  async EmailInUse(@Param('email') email: string) {
    return await firstValueFrom(this.authClient.send({ cmd: "email/used" }, email))
  }


  // -------------- UPD -------------- //

  @Get("upd/get/by/id/:id")
  async GetUser(@Param('id', ParseIntPipe) id: number) {
    return this.updClient.send({ cmd: 'get/by/id' }, { id: id });
  }

  @Get("upd/get/by/name/:name")
  async GetUserByName(@Param('name') name: string) {
    return this.updClient.send({ cmd: 'get/by/name' }, name);
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

  @Get('upd/validate/name/:name')
  async ValidateName(@Param('name') name: string) {
    return this.updClient.send({ cmd: 'validate/name' }, name);
  }

  @Post('upd/follow')
  async Follow(@Body() data: any) {
    return this.updClient.send({ cmd: "follow" }, data);
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
    return this.storyClient.send({ cmd: "get/list" }, {});
  }

  @Get('stories/liked/:id')
  async GetUserLikes(@Param('id', ParseIntPipe) id: number) {
    return this.storyClient.send({ cmd: 'get/liked/stories' }, id);
  }

  @Get("search/title/:title")
  async SearchByTitle(@Param('title') title: string) {
    return this.storyClient.send({ cmd: 'search/title' }, title)
  }

  @Get("search/duration/:duration")
  async SearchByDuration(@Param('duration') duration: string) {
    return this.storyClient.send({ cmd: "search/duration" }, duration);
  }

  @Get("search/author/:author")
  async SearchByAuthor(@Param('author') author: string) {
    const authorId = await firstValueFrom(this.updClient.send({ cmd: "get/by/name" }, author));
    if (authorId.status === 200) {
      return this.storyClient.send({ cmd: "search/author" }, authorId.data.id);
    }
    return { message: 'not found', data: null };
  }

  @Get("search/acts/:actsNumber")
  async SearchByActsNumber(@Param('actsNumber', ParseIntPipe) actsNumber: number) {
    return this.storyClient.send({ cmd: "search/actsNumber" }, actsNumber);
  }

  @Post("search/labels")
  async SearchByLabels(@Body() data: any) {
    return this.storyClient.send({ cmd: "search/labels" }, data);
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
  async PostLike(@Body() data: any) {
    /**
     * 
     * @param userId Id del usuario
     * @param pubId Id de la publicacion
     * @param pubType story || comment
     * @returns {message, data:null || like}
     */
    console.log(data);
    const pdFetch = await firstValueFrom(this.pdClient.send({ cmd: 'post/like' }, data.pd));
    if (pdFetch.data) {
      if (data.upd.stories_liked.includes(data.pd.pubId)) {
        const temp = data.upd.stories_liked.filter(current => current != data.pd.pubId);
        data.upd.stories_liked = temp;
      } else {
        data.upd.stories_liked.push(data.pd.pubId);
      }

      const dataToUpdate = { stories_liked: data.upd.stories_liked };
      const updFetch = await firstValueFrom(this.updClient.send({ cmd: 'update' }, { id: data.upd.id, data: dataToUpdate }));
      if (updFetch.data) {
        return { message: "ok", data: { pd: pdFetch, upd: updFetch } };
      }
      console.log("result :" + updFetch + " Data sended: ", data.upd.id + " ", data.upd)
      return { message: "Error updating the upd", data: null };
    }
    return { message: 'Error with the PD fetch', data: null };
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
