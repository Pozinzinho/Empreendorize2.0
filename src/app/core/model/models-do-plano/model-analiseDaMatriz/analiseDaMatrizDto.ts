import { PlanoDto } from '../../model-plano/planoDto';

export class AnaliseDaMatrizDto{

    id?: string;
    plano: PlanoDto;
    forcas: string;
    oportunidades: string;
    fraquezas: string;
    ameacas: string;
}