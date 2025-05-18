import { Injectable } from '@nestjs/common';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { PrismaService } from './prisma/prisma.service';

import { LogIn } from './DTO/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private prismaSer: PrismaService) { }

  private hashSaltRounds: number = 10

  /**
   * 
   * @param userData email and authentication (password or google id)
   * @returns the user or null
   */
  async logIn(userData: LogIn) {
    const userExist = await this.prismaSer.authentication.findUnique({ where: { email: userData.email } });

    if (userExist) {
      if (userData.type_authentication === 'google') return { message: 'Success', status: 200, data: userExist };

      // Bycrypt compara primero la contraseña plana con la hasheada
      if (await bcrypt.compare(userData.authentication, userExist.authentication)) return { message: 'Success', status: 200, data: userExist };

      throw { message: "Wrong Password, try again", status: 401 };
    }
    throw { message: "User not found, please register", status: 404 };

  }

  /**
   * 
   * @param userData email, type_authentication and authentication
   * @param user_name 
   * @param description 
   * @returns The user created with the upd id
   */
  async createNewUser(userData: CreateAuthDTO, user_name: string, description: string) {
    const userExist = await this.prismaSer.authentication.findUnique({ where: { email: userData.email } });
    if (!userExist) {
      const upd = await this.getUPD(user_name, description);

      if (userData.type_authentication === "email") {
        const password = await bcrypt.hash(userData.authentication, this.hashSaltRounds);

        return await this.prismaSer.authentication.create({
          data: {
            email: userData.email,
            type_authentication: userData.type_authentication,
            authentication: password,
            user_profile_id: upd.id
          }
        })
      } else {
        console.log('create google account');
        return await this.prismaSer.authentication.create({
          data: {
            email: userData.email,
            type_authentication: userData.type_authentication,
            authentication: userData.authentication,
            user_profile_id: upd.id
          }
        })
      }
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

  /**
   * 
   * @param email 
   * @returns True if is in use, false if is free
   */
  async EmailAlredyInUse(email: string) {
    const emailUsed = await this.prismaSer.authentication.findUnique({ where: { email: email } });
    if (!emailUsed) return { message: 'Email ok', data: false };
    return { message: 'Email in use', data: true };
  }

}
