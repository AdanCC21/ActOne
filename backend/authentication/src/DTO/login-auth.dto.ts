import { PickType } from "@nestjs/swagger";
import { Auth } from "src/entities/auth.entity";

export class LogIn extends PickType(Auth,["email","type_authentication","authentication"]){};