import { Role } from './role';


export class UserDto{

    id?: string;
    cpf: string;
    nomeusu: string;
    sobrenomeusu: string;
    email: string;
    password: string;
    enabled:boolean;
    roles?: Array<Role>;
}