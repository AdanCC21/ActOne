import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class AppService {
    constructor(private readonly prismaSer: PrismaService) { }

    async FoundStoryById(id: number) {
        try {
            const story = await this.GetStory(id);
            const acts = await this.GetActs(story.id);
            const upd = await this.GetUPD(story.author_id);
            // Aqui se obtiene la cantidad de likes e interacciones que tenga, pero ya que tenga el microservicio de public-data

            return { story, acts, upd };
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async GetUPD(id: number) {
        try {
            const updExist = await fetch(`http://localhost:3011/upd/get/${id}`);
            if (!updExist.ok) {
                throw new Error('something is wrong with the UPD Microservice. fetch status: ' + updExist.status)
            }
            const data = await updExist.json();
            if (!data) {
                throw new Error('UPD Not found ' + data)
            }
            return data;
        } catch (e) {
            console.error(`Error in GetUPD with id ${id}:`, e);
            throw e;
        }
    }

    async GetStory(id: number) {
        const storyExist = await this.prismaSer.storieData.findUnique({ where: { id: id } });
        if (!storyExist) {
            throw new Error('Story not found');
        }
        // Aqui se obtiene la cantidad de likes e interacciones que tenga, pero ya que tenga el microservicio de public-data
        return storyExist;
    }

    async GetActs(story_id: number) {
        const acts = await this.prismaSer.actData.findMany({ where: { story_id: story_id } })
        if (acts.length === 0) {
            throw new Error("The story dont't have acts. Story id :" + story_id);
        }
        return acts;
    }
}
