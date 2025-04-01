import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAuthDTO } from './DTO/create-auth.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: "auth-hi" })
  getHi() {
    return { message: "Auth ok" }
  }

  @MessagePattern({ cmd: "try-upd" })
  tryUPD() {
    return fetch("http://localhost:3011/user-pd/test-user")
      .then(data => data.json())
      .catch(err => console.error(err));
  }

  // @MessagePattern({ cmd: "create-user" })
  // registerUser(data: { name: string }) {
  //   return data.name;
  // }

  @MessagePattern({ cmd: "reg-user" })
  async registerUser(data: { userData: CreateAuthDTO }) {
    // let createUser = this.appService.createNewUser(data.userData);
  }
}
