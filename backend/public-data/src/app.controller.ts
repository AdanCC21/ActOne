import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('get/comments/:pubId')
  async GetComments(@Param('pubId', ParseIntPipe) pubId: number) {
    return await this.appService.GetComments(pubId);
  }

  @Get('get/likes/:pubId/:pubType')
  async GetLikes(@Param('pubId', ParseIntPipe) pubId: number, @Param('pubType') pubType: string) {
    return await this.appService.GetLikes(pubId, pubType);
  }

}
