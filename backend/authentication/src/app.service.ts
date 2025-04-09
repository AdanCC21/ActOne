import { Injectable } from '@nestjs/common';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaSer: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async createNewUser(userData: CreateAuthDTO, user_name: string, description: string) {
    const userExist = await this.prismaSer.authentication.findUnique({ where: { email: userData.email } });
    if (!userExist) {
      const upd = await this.getUPD(user_name, description);

      return await this.prismaSer.authentication.create({
        data: {
          email: userData.email,
          type_authentication: "email",
          authentication: userData.authentication,
          user_id: upd.id
        }
      })
    }
    return null;
  }

  /**
   * @param nothing
   * @returns the user public data or error
   */
  async getUPD(user_name: string, description: string) {
    try {
      const response = await fetch("http://localhost:3011/upd/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: user_name, description: description }),
      });

      if (!response.ok) {
        throw new Error(`Something is wrong with the microservices ${response.status}`);
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
