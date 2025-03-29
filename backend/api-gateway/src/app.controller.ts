import { Controller, Get, Inject } from '@nestjs/common';
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

  @Get('user-hello')
  async getUserHello() {
    return this.userClient.send({ cmd: "user-hi" }, {});
  }

  @Get('story-hello')
  async getStorieHello() {
    return this.storyClient.send({ cmd: "story-hi" }, {});
  }

  @Get('up-all')
  async getAllUsers() {
    return this.userClient.send({ cmd: "get-all-users" }, {});
  }

  @Get('auth-hi')
  async getAuthHello() {
    return this.authClient.send({ cmd: "auth-hi" }, {});
  }

  @Get('try-upd')
  async tryAuthToUdp() {
    return this.authClient.send({ cmd: "try-upd" }, {});
  }
}
