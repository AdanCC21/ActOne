import { Injectable } from '@nestjs/common';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaSer: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async createNewUser(userData: CreateAuthDTO) {
    const userExist = this.prismaSer.authentication.findUnique({ where: { email: userData.email } });
    if (!userExist)
      // Hay que crear el usuario privado y usario publico      
      await this.prismaSer.authentication.create({
        data: {
          email:userData.email,
          type_authentication:"email",
          authentication:userData.authentication,
          user_id: // Aquii la funcion que cree el usuario public
        }
      })

  }
}
