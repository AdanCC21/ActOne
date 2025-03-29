import { OmitType } from "@nestjs/swagger";
import { Auth } from "src/entities/auth.entity";

export class CreateAuthDTO extends OmitType(Auth,["id","create_date","hidden"] as const){}