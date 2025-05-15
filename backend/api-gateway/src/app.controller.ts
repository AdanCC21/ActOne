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
    private appSer: AppService
  ) { }

  @Post("reg-user")
  async registerUser(@Body() data: any) {
    const { userData, user_name, description } = data;
    return this.authClient.send({ cmd: "reg-user" }, { userData, user_name, description });
  }

  @Post("login")
  async logIn(@Body() data: JSON) {
    const userData = data;
    const resData = await firstValueFrom(this.authClient.send({ cmd: "logIn" }, { userData }));
    console.log(resData);
    return resData;
  }

  @Get("upd/get/:id")
  async GetUser(@Param('id', ParseIntPipe) id: number) {
    return this.updClient.send({ cmd: 'get' }, { id: id });
  }

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
    return this.storyClient.send({cmd:"get-list"},{});
  }
}
