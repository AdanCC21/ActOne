import { PickType } from "@nestjs/swagger";
import { Story } from "src/entities/Story.entity";

export class CreateStoryDto extends PickType(Story, ['title','author_id','visibility'] as const) { }