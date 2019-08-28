import { PlanoDto } from '../../model-plano/planoDto';

export class IntroducaoAoPlanoDto{

    id?: string;
    plano: PlanoDto;
    descricaoMissao: string;
    agro: string;
    serv: string;
    indu: string;
    comer: string;
    outros: string;
}