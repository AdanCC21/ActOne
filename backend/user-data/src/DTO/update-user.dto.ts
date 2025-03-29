import { PartialType } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

// PartialType hace que al querer acutalizar un registro, los campos sean opcionales, esto para evitar tener que actualizar todo
// como lo hace?, quien fokin sabe, pero PartialType es parte del swagger de nest, osea una libreria
export class UpdateUserDTO extends PartialType(User) { }