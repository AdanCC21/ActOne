import { PartialType } from "@nestjs/swagger";
import { Story } from "src/entities/Story.entity";

export class UpdateStoryDto extends PartialType(Story){}