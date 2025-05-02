import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prismaSer: PrismaService) { }

  @MessagePattern({ cmd: "hi" })
  async testMic() {
    return { message: "Hi from thew storie-data microservice" };
  }

  @MessagePattern({ cmd: 'get-story' })
  async FoundStoryById(@Payload() id: number) {
    return await this.appService.FoundStoryById(id);
  }

  // @MessagePattern({ cmd: 'get-act' })
  // async GetActs(@Payload() story_id: number) {
  //   return await this.appService;
  // }
}
