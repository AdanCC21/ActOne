import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateStoryDto } from './DTO/CreateStory.dto';
import { CreateActDto } from './DTO/CreateAct.dto';
import { UpdatePdDTO } from './DTO/UpdatePd.dto';

@Injectable()
export class AppService {
    constructor(private readonly prismaSer: PrismaService) { }

    async SearchByTitle(title: string) {
        try {
            const results = await this.prismaSer.storieData.findMany({
                where: {
                    title: {
                        contains: title,
                        mode: 'insensitive'
                    }
                }
            })
            return { message: 'ok', data: results };
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async SearchByDuration(duration: string) {
        try {
            const results = await this.prismaSer.storieData.findMany({
                where: {
                    duration: duration
                }
            })
            return { message: 'ok', data: results };
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async SearchByAuthor(author: number) {
        try {
            const results = await this.prismaSer.storieData.findMany({
                where: {
                    author_id: author
                }
            })
            return { message: 'ok', data: results };
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // async SearchByLabels(labels:string) {
    //     try {
    //         const results = await this.prismaSer.storieData.findMany({
    //             where: {
    //                 labels:{
                        
    //                 }
    //             }
    //         })
    //         return { message: 'ok', data: results };
    //     } catch (e) {
    //         console.error(e);
    //         return false;
    //     }
    // }

    async ListStories() {
        try {
            const stories = await this.prismaSer.storieData.findMany();
            return stories;
        } catch (e) {
            console.error(e);
            throw new HttpException({ message: e.message }, HttpStatus.NOT_FOUND);
        }
    }

    async FoundStoryById(id: number) {
        try {
            const story = await this.GetStory(id);
            const acts = await this.GetActs(story.id);
            const upd = await this.GetUPD(story.author_id);

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

    /**
     * 
     * @param storyId 
     * @param data 
     * @returns True || False
     */
    async updatePD(storyId: number, data: UpdatePdDTO) {
        try {
            const storyExist = await this.prismaSer.storieData.findUnique({ where: { id: storyId } });
            if (!storyExist) throw new Error('User Not Found');

            const updatedData = {
                likes_count: storyExist.likes_count + (data.likes_count ?? 0),
                comments_count: storyExist.comments_count + (data.comments_count ?? 0),
                marked_count: storyExist.marked_count + (data.marked_count ?? 0),
                reports_count: storyExist.reports_count + (data.reports_count ?? 0),
            };

            await this.prismaSer.storieData.update({
                where: { id: storyId },
                data: updatedData,
            });
            return { message: "ok", data: true };
        } catch (e) {
            console.error(e);
            return { message: e.message, data: false };
        }

    }
}
