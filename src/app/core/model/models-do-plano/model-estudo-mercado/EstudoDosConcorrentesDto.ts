import { PlanoDto } from '../../model-plano/planoDto';

export class EstudoDosConcorrentesDto{

    id?: string;
    plano: PlanoDto;
    descricaoAnalise: string;
    qualidade: string;
    preco: string;
    condicoesDePag: string;
    localizacao: string;
    atendimento: string;
    servicos: string;
    garantiasOferecidas: string;
    conclusoes: string;
}