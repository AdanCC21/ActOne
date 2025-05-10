import { OmitType } from "@nestjs/swagger";
import { Act } from "src/entities/Act.entity";

export class CreateActDto extends OmitType(Act, ['id','story_id'] as const) { }