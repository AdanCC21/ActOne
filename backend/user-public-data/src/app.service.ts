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
    return await this.prismaSer.userPublicData.create({
      data: {
        user_name: user.user_name,
        description: user.description
      }
    })
  }

  /**
   * 
   * @param id 
   * @description This need to comunicate with the authentication microservice, to change the state
   * @returns null or the user
   */
  async deleteUser(id: number) {
    const userFound = await this.prismaSer.userPublicData.findUnique({ where: { id: id } }) || null;
    if (userFound != null) {
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
    const userFound = await this.prismaSer.userPublicData.findUnique({ where: { id: user.id } });
    if (!userFound) return null;

    return await this.prismaSer.userPublicData.update({ where: { id: user.id }, data: user })
  }

  async AddStory(user_id: number, storyId: number) {
    const userFound = await this.prismaSer.userPublicData.findUnique({ where: { id: user_id } });
    if (!userFound) return null;

    const updatedStories = [...userFound.published_stories, storyId];
    return await this.prismaSer.userPublicData.update({ where: { id: user_id }, data: { published_stories: updatedStories } })
  }

  /**
   * @param id user ID
   * @returns the user found or null
   */
  async findOne(id: number) {
    const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: id } });
    if (!userExist) {
      return { message: 'user not found', status: 404 }
    }
    return { message: 'success', status: 200, data: userExist };
  }

  /**
   * @returns All public data users
   */
  async findAll() {
    return await this.prismaSer.userPublicData.findMany();
  }

}
