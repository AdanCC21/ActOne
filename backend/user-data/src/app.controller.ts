import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/create-user.dto';

@Controller('user-pd')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'user-hi' })
  sayHello() {
    return { message: "Hi from the users microservice" };
  }

  @MessagePattern({ cmd: 'get-all-users' })
  getAllUsers() {
    return this.appService.findAll();
  }

  @Get('test-user')
  test() {
    return { message: "Hi from the usaer microservice :D" };
  }

  @Post('create-upd')
  createUserPublic(@Body() userData: CreateUserDTO) {
    return this.appService.createUser(userData);
  }
}
