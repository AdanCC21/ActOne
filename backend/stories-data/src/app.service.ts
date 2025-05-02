import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private readonly prismaSer: PrismaService) { }

    async FoundStoryById(id: number) {
        try {
            const story = await this.GetStory(id);
            const acts = await this.GetActs(story.id);

            // Aqui se obtiene la cantidad de likes e interacciones que tenga, pero ya que tenga el microservicio de public-data

            return { story, acts };
        } catch (e) {
            throw new Error(e.message)
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
