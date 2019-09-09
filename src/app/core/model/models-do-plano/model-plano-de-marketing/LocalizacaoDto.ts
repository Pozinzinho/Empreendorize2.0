import { PlanoDto } from '../../model-plano/planoDto';

export class LocalizacaoDto{

    id?: string;
    plano: PlanoDto;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    fone1: string;
    fone2: string;
    fax: string;
    consideracoesPonto: string;
}