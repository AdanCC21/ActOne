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
   * @param name 
   * @returns True if is already use, false if is Free to use
   */
  async NameAlreadyUse(name: string) {
    const nameExist = await this.prismaSer.userPublicData.findUnique({ where: { user_name: name } });
    if (!nameExist) return false;
    return true;
  }

  // --------------- CRUD ------------------- //

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
 * El usuario origen sigue o deja de seguir a target
 * @param originId ID del usuario que realiza la acción
 * @param targetId ID del usuario que será seguido o dejado de seguir
 * @param action true = seguir, false = dejar de seguir
 */
  async Follow(originId: number, targetId: number, action: boolean) {
    if (originId === targetId) {
      return { message: "cannot follow self", data: null };
    }

    const [origin, target] = await this.prismaSer.$transaction([
      this.prismaSer.userPublicData.findUnique({ where: { id: originId } }),
      this.prismaSer.userPublicData.findUnique({ where: { id: targetId } }),
    ]);

    if (!origin) return { message: "origin not found", data: null };
    if (!target) return { message: "target not found", data: null };

    let updatedOriginFollowing = origin.following ?? [];
    let updatedTargetFollowers = target.followers ?? [];

    if (action) {
      if (!updatedOriginFollowing.includes(targetId)) {
        updatedOriginFollowing.push(targetId);
      }
      if (!updatedTargetFollowers.includes(originId)) {
        updatedTargetFollowers.push(originId);
      }
    } else {
      updatedOriginFollowing = updatedOriginFollowing.filter(id => id !== targetId);
      updatedTargetFollowers = updatedTargetFollowers.filter(id => id !== originId);
    }

    const [updatedOrigin, updatedTarget] = await this.prismaSer.$transaction([
      this.prismaSer.userPublicData.update({
        where: { id: originId },
        data: { following: updatedOriginFollowing },
      }),
      this.prismaSer.userPublicData.update({
        where: { id: targetId },
        data: { followers: updatedTargetFollowers },
      }),
    ]);

    return { message: "ok", data: [updatedOrigin, updatedTarget] };
  }

  /**
   * 
   * @param id 
   * @param user 
   * @returns {message , data:user || null}
   */
  async UpdateUPD(id: number, user: UpdateUserDTO) {
    const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: id } });
    if (!userExist) return { message: "user not found", data: null };

    const { id: _, ...userDataWithoutId } = user;
    console.log("UPD ACTUALIZAR INFOR");
    console.log(user);
    const result = await this.prismaSer.userPublicData.update({ where: { id: userExist.id }, data: userDataWithoutId })
    if (result) return { message: "ok", data: result };
    return { message: "Something is wrong", data: null };
  }

  // --------------- Saved / Marked ------------------- //
  /**
   * 
   * @param userId // Id del usuario
   * @param storyId // Id de la historia
   * @returns null or updUpdated
   */
  async UpdateMarked(userId: number, storyId: number) {
    try {
      const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: userId } });

      if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      let listUpdated = new Array<number>;

      if (!userExist.marked_stories.includes(storyId)) {
        userExist.marked_stories.push(storyId);
        listUpdated = userExist.marked_stories;
        await this.UpdateStory(storyId, { marked_count: 1 })
      } else {
        listUpdated = userExist.marked_stories.filter((current) => current !== storyId);
        await this.UpdateStory(storyId, { marked_count: -1 })
      }

      const result = await this.prismaSer.userPublicData.update({ where: { id: userId }, data: { marked_stories: listUpdated } })
      return { message: "ok", data: result };
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
   * Send the data to Story DataBase
   * @param storyId Story Id
   * @param data  {likes_count, comments_count, reports_count, marked_count }
   * @returns null or the data
   */
  async UpdateStory(storyId: number, data) {
    try {
      const fetchData = await fetch('http://localhost:3013/story/set/pd', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: storyId, pd: data })
      })
      if (!fetchData.ok) throw new Error('something is wrong with Story Update');

      return await fetchData.json();
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

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

  // --------------- Find ------------------- //

  /**
   * @param id user ID
   * @returns the user found or null
   */
  async findOne(id: number) {
    const userExist = await this.prismaSer.userPublicData.findUnique({ where: { id: id } });
    if (!userExist) {
      return { message: 'user not found', status: 404, data: null }
    }
    return { message: 'success', status: 200, data: userExist };
  }

  async findByName(name: string) {
    const userExist = await this.prismaSer.userPublicData.findUnique({ where: { user_name: name } });
    if (!userExist) {
      return { message: 'user not found', status: 404, data: null }
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
