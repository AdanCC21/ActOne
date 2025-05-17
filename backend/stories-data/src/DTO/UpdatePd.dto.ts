import { PartialType } from "@nestjs/swagger";
import { PublicData } from "src/entities/PublicData.entity";

export class UpdatePdDTO extends PartialType(PublicData) { }