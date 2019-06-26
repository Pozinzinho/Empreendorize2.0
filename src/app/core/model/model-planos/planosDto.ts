import { UserDto } from '../model-user/userDto';
import { Role } from '../model-user/role';


export class PlanosDto{

    id?: string;
    user: UserDto;
    nomePlano: string;
    dataConclusao: string;
    finalidade: string;
    role?: Array<Role>;
}