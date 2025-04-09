import { OmitType } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

// OmitType hace que al querer crear un nuevo usuario, ignore los siguientes atributos o campos, al querer enviarlo a la base de datos
// OmitType es parte del swagger de nest, osea una libreria
export class CreateUserDTO extends OmitType(User, ["id","profile_image_url","followers","following","published_stories"] as const) { }