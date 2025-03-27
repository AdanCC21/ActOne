import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private appSer: AppService
  ) { }

  @Get('user-hello')
  async getUserHello() {
    return this.userClient.send({ cmd: "user-hi" },{});
  }
}
