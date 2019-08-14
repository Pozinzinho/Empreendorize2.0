import { Role } from './role';


export class UserDto{

    id?: string;
    cpf: string;
    nomeusu: string;
    sobrenomeusu: string;
    fone1: string;
    fone2 : string;
    email: string;
    password: string;
    endereco: string;
    cidade: string;
    estado: string;
    curriculo: string;
    enabled:boolean;
    roles?: Array<Role>;
}