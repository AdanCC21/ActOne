import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';


@Controller('user')
export class AppController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy, private readonly appService: AppService) {}

  @Get(':id')
  async getUser() {
    return this.client.send({ cmd: 'get_user' }, { id: '123' });
  }
}
