import { PlanoDto } from '../../model-plano/planoDto';

export class InvestimentosFixosDto{

    id?: string;
    plano: PlanoDto;
    
    descricaoME: string;
    qtdeME: number;
    valorUnitarioME: number;
    totalME: number;
}