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
    if (!userExist) {
      // we have to do the private data and public data at the same time
      return await this.prismaSer.authentication.create({
        data: {
          email: userData.email,
          type_authentication: "email",
          authentication: userData.authentication,
          user_id: await this.getUPD()
        }
      })
    }
    return null;
  }

  /**
   * @param nothing
   * @returns the user public data or error
   */
  async getUPD() {
    try {
      const response = await fetch("http://localhost:3011", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: "new user" }),
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
