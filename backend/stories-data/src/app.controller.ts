import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller('story')
export class AppController {
  constructor(private readonly appService: AppService, private readonly prismaSer: PrismaService) { }

  @MessagePattern({ cmd: 'get-story' })
  async FoundStoryById(@Payload() id: number) {
    return await this.appService.FoundStoryById(id);
  }

  @MessagePattern({ cmd: 'search/by/title' })
  async SearchByTitle(@Payload() title: string) {
    return await this.appService.SearchByTitle(title);
  }

  @MessagePattern({ cmd: 'get-list' })
  async ListStories() {
    return await this.appService.ListStories();
  }

  /**
   * 
   * @param data : {story:CreateStory, acts:CreateAct}
   * @returns {message :"", data: result || null}
   */
  @MessagePattern({ cmd: 'publish' })
  async PublishStory(data: any) {
    return await this.appService.PublishStory(data.story, data.acts)
  }

  /**
   * Suma o Resta la cantidad que enviemos a su pd
   * @param data {id:storyId, pd:{likes_count || comments_count || reports_count || marked_count}}
   * @returns True || false
   */
  @Post('set/pd')
  async UpdatePd(@Body() data) {
    return await this.appService.updatePD(data.id, data.pd);
  }

}
