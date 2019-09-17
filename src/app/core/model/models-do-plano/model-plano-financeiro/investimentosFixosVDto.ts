import { PlanoDto } from '../../model-plano/planoDto';

export class InvestimentosFixosVDto{

    id?: string;
    plano: PlanoDto;
    
    descricaoV: string;
    qtdeV: number;
    valorUnitarioV: number;
    totalV: number;
}