import { PlanoDto } from '../../model-plano/planoDto';

export class EstoqueInicialDto{

    id?: string;
    plano: PlanoDto;
    
    descricaoME: string;
    qtdeME: number;
    valorUnitarioME: number;
    totalME: number;
}