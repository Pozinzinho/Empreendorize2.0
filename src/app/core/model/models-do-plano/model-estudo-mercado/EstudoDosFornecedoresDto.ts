import { PlanoDto } from '../../model-plano/planoDto';

export class EstudoDosFornecedoresDto{

    id?: string;
    plano: PlanoDto;
    descricaoItens: string;
    nomeFornecedor: string;
    preco: string;
    condicoesDePag: string;
    prazoEntrega: string;
    localizacao: string;
}