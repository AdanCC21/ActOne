import { PartialType } from "@nestjs/swagger";
import { Auth } from "src/entities/auth.entity";

export class UpdateAuthDTO extends PartialType(Auth){}