import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { LogIn } from './DTO/login-auth.dto';
import { log } from 'console';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: "reg/user" })
  async registerUser(data: { userData: CreateAuthDTO, user_name: string, description: string, profile_image_url:string }) {
    const createdUser = await this.appService.createNewUser(data.userData, data.user_name, data.description,  data.profile_image_url);
    if (createdUser != null) {
      return { message: "ok", data: createdUser };
    }
    return { message: "Error, user already registered", data: null }
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

  /**
   * 
   * @param email 
   * @returns True if is in use, false if is free
   */
  @MessagePattern({ cmd: 'email/used' })
  async EmailAlreadyInUse(email: string) {
    return await this.appService.EmailAlredyInUse(email);
  }
}
