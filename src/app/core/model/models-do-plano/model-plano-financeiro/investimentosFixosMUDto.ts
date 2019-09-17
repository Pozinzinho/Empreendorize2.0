import { PlanoDto } from '../../model-plano/planoDto';

export class InvestimentosFixosMUDto{

    id?: string;
    plano: PlanoDto;

    descricaoMU: string;
    qtdeMU: number;
    valorUnitarioMU: number;
    totalMU: number;
}