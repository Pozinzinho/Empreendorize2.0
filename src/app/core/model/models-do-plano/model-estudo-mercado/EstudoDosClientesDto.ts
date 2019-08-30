import { PlanoDto } from '../../model-plano/planoDto';

export class EstudoDosClientesDto{

    id?: string;
    plano: PlanoDto;
    publicoAlvo: string;
    comportamentoClientes: string;
    areaAbrangencia: string;
}