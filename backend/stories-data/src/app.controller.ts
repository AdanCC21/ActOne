import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prismaSer: PrismaService) { }

  @MessagePattern({ cmd: "hi" })
  async testMic() {
    return { message: "Hi from thew storie-data microservice" };
  }

}
