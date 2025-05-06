import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { get } from 'http';

@Controller('api')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
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
    const resData = this.authClient.send({ cmd: "logIn" }, { userData });
    console.log(resData);
  }

  @Get("user/:id")
  async GetUser(@Param('id', ParseIntPipe) id: number) {

  }

  @Get("story/:id")
  async getStory(@Param('id', ParseIntPipe) id: number) {
    return this.storyClient.send({ cmd: 'get-story' }, id);
  }
}
