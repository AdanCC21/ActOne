import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { PrismaService } from './prisma/prisma.service';
import { error } from 'console';

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
   * @param user Only the attributes your are going to change
   * @returns the user updated or null
   */
  async updateUser(user: UpdateUserDTO) {
    const userFound = await this.prismaSer.userPublicData.findUnique({ where: { id: user.id } });
    if (!userFound) return null;

    return await this.prismaSer.userPublicData.update({ where: { id: user.id }, data: user })
  }

  // --------------- Saved / Marked ------------------- //
  /**
   * 
   * @param userId // Id del usuario
   * @param storyId // Id de la historia
   * @param action // True = Add, False = Remove
   * @returns null or marked Story
   */
  async UpdateMarked(userId: number, storyId: number, action: boolean) {
    try {
      const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: userId } });

      if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      if (action && userExist.marked_stories.includes(storyId)) throw new Error('Story already marked');
      if (!action && !userExist.marked_stories.includes(storyId)) throw new Error('Story already unmarked');

      let listUpdated = new Array<number>;
      if (action) {
        userExist.marked_stories.push(storyId);
        listUpdated = userExist.marked_stories;
      } else {
        listUpdated = userExist.marked_stories.filter((current) => current !== storyId);
      }

      await this.prismaSer.userPublicData.update({ where: { id: userId }, data: { marked_stories: listUpdated } })
      return { message: "ok", data: listUpdated };
    } catch (e) {
      console.error(e.message);
      return { message: e.message, data: null };
    }
  }


  /**
   * 
   * @param userId User Id
   * @returns null or Marked Stories list
   */
  async GetMarkedList(userId: number,) {
    try {
      const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: userId } });

      if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return { message: "ok", data: userExist.marked_stories };
    } catch (e) {
      console.error(e.message);
      return { message: e.message, data: null };
    }
  }

  // --------------- Stories ------------------- //

  /**
   * 
   * @param user_id // id del usuario
   * @param storyId id de la historia
   * @returns 
   */
  async AddStory(user_id: number, storyId: number) {
    try {
      const userFound = await this.prismaSer.userPublicData.findUnique({ where: { id: user_id } });
      if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const updatedStories = [...userFound.published_stories, storyId];
      const data = await this.prismaSer.userPublicData.update({ where: { id: user_id }, data: { published_stories: updatedStories } })
      return { message: "ok", data: data };
    } catch (e) {
      console.error(e);
      return { message: e.message, data: null };
    }
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
