import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('stories')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'hello' })
  sayHello() {
    return 'Hello from Public Service';
  }
}
