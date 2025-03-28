import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    @Inject('STORY_SERVICE') private storyClient: ClientProxy,
    private appSer: AppService
  ) { }

  @Get('user-hello')
  async getUserHello() {
    return this.userClient.send({ cmd: "user-hi" },{});
  }
  
  @Get('story-hello')
  async getStorieHello() {
    return this.storyClient.send({ cmd: "story-hi" },{});
  }
}
