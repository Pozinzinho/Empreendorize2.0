import { PlanoDto } from '../../model-plano/planoDto';

export class CustoUnitarioDto{

    id?: string;
    plano: PlanoDto;
    
    materialInsumos: string;
    quantidade: number;
    tipo: string;
    custoUnitario: number;
    total: number;
}