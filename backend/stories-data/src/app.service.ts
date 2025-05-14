import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateStoryDto } from './DTO/CreateStory.dto';
import { CreateActDto } from './DTO/CreateAct.dto';
import { error } from 'console';
import { create } from 'domain';

@Injectable()
export class AppService {
    constructor(private readonly prismaSer: PrismaService) { }

    async FoundStoryById(id: number) {
        try {
            const story = await this.GetStory(id);
            const acts = await this.GetActs(story.id);
            const upd = await this.GetUPD(story.author_id);
            const pd = await this.GetPD(story.id);

            return { story, acts, upd, pd };
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
            const upd = await updExist.json();
            if (!upd) {
                throw new Error('UPD Not found ' + upd)
            }
            return upd.data;
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

    async GetPD(story_id: number) {
        try {
            const likesFetch = await fetch(`http://localhost:3014/pd/get/likes/${story_id}/story`);
            const likes = await likesFetch.json();

            const commentsFetch = await fetch(`http://localhost:3014/pd/get/comments/${story_id}`);
            const comments = await commentsFetch.json();

            return {
                comments: comments,
                likes: likes
            }
        } catch (e) {
            console.error(e);
            return e;
        }
    }

    async PublishStory(story: CreateStoryDto, acts: CreateActDto[]) {
        try {
            const storyRes = await this.prismaSer.storieData.create({ data: story });

            const actsId = await Promise.all(
                acts.map(async (act) => {
                    const temp = await this.prismaSer.actData.create({
                        data: {
                            title: act.title,
                            story_id: storyRes.id,
                            content: act.content
                        }
                    })
                    return temp.id;
                }
                )
            );


            // Update Story Acts Id
            const updatedActs = await this.prismaSer.storieData.update({ where: { id: storyRes.id }, data: { acts: actsId } })
            if (!updatedActs) throw new Error('Story acts not updated');

            // Update UPD
            const updUser = await fetch(`http://localhost:3011/upd/push/act/${story.author_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ storyId: storyRes.id })
            });

            if (!updUser.ok) throw new Error('something is wrong with updUser: id ' + story.author_id + '\n status : ' + updUser.status);
            const updRes = await updUser.json();

            return {
                message: 'ok',
                data: [updatedActs, actsId, updRes.data]
            }
        } catch (e) {
            console.error('Something is wrong : ' + e.message)
            return { message: e.message, data: null };
        }
    }
}
