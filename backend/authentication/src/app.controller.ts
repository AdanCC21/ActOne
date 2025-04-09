import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { LogIn } from './DTO/login-auth.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @MessagePattern({ cmd: "auth-hi" })
  // getHi() {
  //   return { message: "Auth ok" }
  // }

  // @MessagePattern({ cmd: "try-upd" })
  // tryUPD() {
  //   return fetch("http://localhost:3011/user-pd/test-user")
  //     .then(data => data.json())
  //     .catch(err => console.error(err));
  // }

  @MessagePattern({ cmd: "reg-user" })
  async registerUser(data: { userData: CreateAuthDTO, user_name:string, description:string }) {
    const createdUser = this.appService.createNewUser(data.userData, data.user_name, data.description);
    if (createdUser != null) {
      return createdUser;
    }
    return { message: "Error, something is wrong with the auth service" }
  }

  @MessagePattern({cmd:"logIn"})
  async logIn(data:{userData:LogIn}){
    return await this.appService.logIn(data.userData);
  }
}
