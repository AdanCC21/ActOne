import { Controller, Get, Post, Body, ParseIntPipe, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { PushActsDto } from './DTO/push-act.dto';
import { NotFoundError } from 'rxjs';

@Controller('upd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Post Get
  @Post('create')
  async createUserPublic(@Body() userData: CreateUserDTO) {
    return await this.appService.createUser(userData);
  }

  @Get('get/:id')
  async GetUPD(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.findOne(id);
  }

  /**
   * 
   * @param acts acts id, only ids
   * @param user_id upd id
   * @returns the upd or null
   */
  @Post('push/act/:id')
  async PushActs(@Body() data: any, @Param('id', ParseIntPipe) user_id: number) {
    return await this.appService.AddStory(user_id, data.storyId);
  }

  // Microservice Exclusive ---------------

  @MessagePattern({ cmd: 'validate/name' })
  async ValidateUser(data: any) {
    const used = await this.appService.NameAlreadyUse(data);
    if (used) {
      return { message: "Name already in use", data: true };
    } else {
      return { message: "Name free to use", data: false };
    }
  }

  @MessagePattern({ cmd: 'get/by/id' })
  async GetUPDApi(data: { id: number }) {
    return await this.appService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'get/by/name' })
  async GetByName(@Payload() name: string) {
    return await this.appService.findByName(name);
  }

  @MessagePattern({ cmd: 'follow' })
  async Follow(@Payload() data: any) {
    return await this.appService.Follow(data.origin, data.target, data.action);
  }

  /**
   * Actualizar upd
   * @param data {id:id, data:{informacion a actualizar}}
   * @returns upd || null
   */
  @MessagePattern({ cmd: "update" })
  async UpdateUPD(@Payload() data: any) {
    return await this.appService.UpdateUPD(data.id, data.data);
  }

  /**
   * @param userId // Id del usuario
   * @param storyId // Id de la historia
   * @returns null or marked Story
   */
  @MessagePattern({ cmd: "update-mark" })
  async MarkStory(data: any) {
    return await this.appService.UpdateMarked(data.userId, data.storyId);
  }

  /**
   * 
   * @param userId 
   * @returns null or MarkedList(ids)
   */
  @MessagePattern({ cmd: "get-mark" })
  async GetMarkedList(@Payload() userId: number) {
    return await this.appService.GetMarkedList(userId)
  }
}
