import { Controller, Get, Post, Body, ParseIntPipe, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/create-user.dto';

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
}
