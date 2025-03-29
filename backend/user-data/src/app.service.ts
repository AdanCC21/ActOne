import { Injectable, Param } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaSer: PrismaService) { }

  /**
   * 
   * @param user Only need the user_name, because this database is only the public user data
   * @returns the user create
   */
  async createUser(user: CreateUserDTO) {
    return await this.prismaSer.user.create({
      data: {
        user_name: user.user_name
      }
    })
  }

  /**
   * 
   * @param id 
   * @description This need to comunicate with the authentication microservice, to change the state
   * @returns null or the user
   */
  async deleteUser(id:number) {
    const userFound = await this.prismaSer.user.findUnique({ where: { id: id } }) || null;
    if (userFound != null){
      const newUs = userFound;
      // return await this.prismaSer.user.update({where:{id:id}})
    }
  }

  /**
   * 
   * @param user Only the attributes your are going to change
   * @returns the user updated or null
   */
  async updateUser(user: UpdateUserDTO) {
    const userFound = await this.prismaSer.user.findUnique({ where: { id: user.id } }) || null;
    if (userFound != null) {
      return await this.prismaSer.user.update({ where: { id: user.id }, data: user })
    }
    return null;
  }

  /**
   * @param id user ID
   * @returns the user found or null
   */
  findOne(id: number) {
    return this.prismaSer.user.findUnique({
      where: { id: Number(id) }
    });
  }

  /**
   * @returns All public data users
   */
  findAll() {
    return this.prismaSer.user.findMany();
  }

}
