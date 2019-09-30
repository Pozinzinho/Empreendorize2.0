import { PlanoDto } from '../../model-plano/planoDto';

export class FaturamentoMensalDto{

    id?: string;
    plano: PlanoDto;
    
    produtoServicos: string;
    quantidadeVendas: number;
    precoVenda: number;
    faturamentoTotal: number;
}