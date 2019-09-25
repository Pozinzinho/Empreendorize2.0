import { PlanoDto } from '../../model-plano/planoDto';

export class EstimativaDosCustosFixosMensaisDto{

    id?: string;
    plano: PlanoDto;
    
    valorAluguel: number;
    valorCondominio: number;
    valorIPTU: number;
    valorAgua: number;
    valorEnergia: number;
    valorTelefone: number;
    valorManutencaoDeEquipamentos: number;
    valorMaterialDeLimpeza: number;
    valorMaterialDeEscritorio: number;
    valorCombustivel: number;
    valorTaxasDiversas: number;
    valorServicosTerceiros: number;
    valorOutrasDespesas: number;

}