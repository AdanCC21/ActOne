import { Controller, Get, Post, Body, ParseIntPipe, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { PushActsDto } from './DTO/push-act.dto';
import { NotFoundError } from 'rxjs';

@Controller('upd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('create')
  createUserPublic(@Body() userData: CreateUserDTO) {
    return this.appService.createUser(userData);
  }

  @Get('get/:id')
  async GetUPD(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'get' })
  async GetUPDApi(data: { id: number }) {
    return await this.appService.findOne(data.id);
  }

  @Post('update')
  async UpdateUPD(@Body() data: UpdateUserDTO) {
    return await this.appService.updateUser(data);
  }

  /**
   * 
   * @param acts acts id, only ids
   * @param user_id upd id
   * @returns the upd or null
   */
  @Post('push/act/:id')
  async PushActs(@Body() data: any, @Param('id', ParseIntPipe) user_id: number) {
    try {
      console.log('entro')
      const res = await this.appService.AddStory(user_id, data.storyId);
      if (!res) throw new NotFoundException('user not found, user id :' + user_id);

      return {
        message: 'ok',
        data: res
      };
    } catch (e) {
      console.error(e.message);
      return {
        message: e.message,
        data: null
      };
    }
  }
}
