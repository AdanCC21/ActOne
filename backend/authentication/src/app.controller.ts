import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { LogIn } from './DTO/login-auth.dto';
import { log } from 'console';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: "reg-user" })
  async registerUser(data: { userData: CreateAuthDTO, user_name: string, description: string }) {
    const createdUser = this.appService.createNewUser(data.userData, data.user_name, data.description);
    if (createdUser != null) {
      return createdUser;
    }
    return { message: "Error, something is wrong with the auth service" }
  }

  @MessagePattern({ cmd: "logIn" })
  async logIn(@Payload() data: any) {
    try {
      return await this.appService.logIn(data);
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }
}
