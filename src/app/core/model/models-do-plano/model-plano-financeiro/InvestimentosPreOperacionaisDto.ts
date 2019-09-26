import { PlanoDto } from '../../model-plano/planoDto';

export class InvestimentosPreOperacionaisDto{

    id?: string;
    plano: PlanoDto;
    
    despesasLegais: number;
    obrasOuReformas: number;
    divulgacao: number;
    cursosETreinamentos: number;
    outrasDespesas: number;
    totalInvestimentos: number;
}