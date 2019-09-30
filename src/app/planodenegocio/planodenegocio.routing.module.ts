import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanodenegocioComponent } from './planodenegocio.component';
import { IntroplanoComponent } from './introducaoaoplano/introplano/introplano.component';
import { MissaoComponent } from './introducaoaoplano/missao/missao.component';
import { IntroestudodemercadoComponent } from './estudodemercado/introestudodemercado/introestudodemercado.component';
import { EstudodosclientesComponent } from './estudodemercado/estudodosclientes/estudodosclientes.component';
import { EstudodosconcorrentesComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-list/estudodosconcorrentes.component';
import { EstudodosfornecedoresComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores.component';
import { IntroplanodemarketingComponent } from './planodemarketing/introplanodemarketing/introplanodemarketing.component';
import { ProdutoseservicosComponent } from './planodemarketing/produtoseservicos/produtoseservicos.component';
import { PrecoComponent } from './planodemarketing/preco/preco.component';
import { EstrategiapromocionalComponent } from './planodemarketing/estrategiapromocional/estrategiapromocional.component';
import { EstruturadecomercializacaoComponent } from './planodemarketing/estruturadecomercializacao/estruturadecomercializacao.component';
import { LocalizacaodonegocioComponent } from './planodemarketing/localizacaodonegocio/localizacaodonegocio.component';
import { InvestimentosfixosComponent } from './planomonetario/investimentosfixos/investimentosfixos.component';
import { InvestimentospreopComponent } from './planomonetario/investimentospreop/investimentospreop.component';
import { InvestimentototalComponent } from './planomonetario/investimentototal/investimentototal.component';
import { FaturamentomensalComponent } from './planomonetario/faturamentomensal/faturamentomensal.component';
import { CustounitarioComponent } from './planomonetario/custounitario/custounitario.component';
import { CustosdecomercializacaoComponent } from './planomonetario/custosdecomercializacao/custosdecomercializacao.component';
import { CustosdedepreComponent } from './planomonetario/custosdedepre/custosdedepre.component';
import { CustosfixosopComponent } from './planomonetario/custosfixosop/custosfixosop.component';
import { DemonstrativoderesultadosComponent } from './planomonetario/demonstrativoderesultados/demonstrativoderesultados.component';
import { IndicadoresdeviabilidadeComponent } from './planomonetario/indicadoresdeviabilidade/indicadoresdeviabilidade.component';
import { IntroanalisecriticaComponent } from './analisecritica/introanalisecritica/introanalisecritica.component';
import { MatrizfofaComponent } from './analisecritica/matrizfofa/matrizfofa.component';
import { IntroconclusaoComponent } from './conclusao/introconclusao/introconclusao.component';
import { AnaliseplanoComponent } from './conclusao/analiseplano/analiseplano.component';
import { IntroplanomonetarioComponent } from './planomonetario/introplanomonetario/introplanomonetario.component';
import { EstudodosconcorrentesEditarComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-editar/estudodosconcorrentes-editar.component';
import { EstudodosconcorrentesAddComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-add/estudodosconcorrentes-add.component';
import { EstudoProprioAddComponent } from './estudodemercado/estudodosconcorrentes/estudo-proprio-add/estudo-proprio-add.component';
import { EstudoProprioEditarComponent } from './estudodemercado/estudodosconcorrentes/estudo-proprio-editar/estudo-proprio-editar.component';
import { EstudodosfornecedoresEditarComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores-editar/estudodosfornecedores-editar.component';
import { EstudodosfornecedoresAddComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores-add/estudodosfornecedores-add.component';
import { InvestimentosFixosEditarComponent } from './planomonetario/investimentosfixos/tabela1/investimentos-fixos-editar/investimentos-fixos-editar.component';
import { InvestimentosFixosEditarMuComponent } from './planomonetario/investimentosfixos/tabela2/investimentos-fixos-editar-mu/investimentos-fixos-editar-mu.component';
import { InvestimentosFixosEditarVComponent } from './planomonetario/investimentosfixos/tabela3/investimentos-fixos-editar-v/investimentos-fixos-editar-v.component';
import { InvestimentosFixosAddComponent } from './planomonetario/investimentosfixos/tabela1/investimentos-fixos-add/investimentos-fixos-add.component';
import { InvestimentosFixosAddMuComponent } from './planomonetario/investimentosfixos/tabela2/investimentos-fixos-add-mu/investimentos-fixos-add-mu.component';
import { InvestimentosFixosAddVComponent } from './planomonetario/investimentosfixos/tabela3/investimentos-fixos-add-v/investimentos-fixos-add-v.component';
import { CapitalDeGiroComponent } from './planomonetario/capital-de-giro/capital-de-giro.component';
import { EstoqueInicialEditComponent } from './planomonetario/capital-de-giro/estoqueInicial/estoque-inicial-edit/estoque-inicial-edit.component';
import { EstoqueInicialSaveComponent } from './planomonetario/capital-de-giro/estoqueInicial/estoque-inicial-save/estoque-inicial-save.component';
import { FaturamentoMensalAddComponent } from './planomonetario/faturamentomensal/faturamento-mensal-add/faturamento-mensal-add.component';
import { FaturamentoMensalEditComponent } from './planomonetario/faturamentomensal/faturamento-mensal-edit/faturamento-mensal-edit.component';
import { CustoUnitarioAddComponent } from './planomonetario/custounitario/custo-unitario-add/custo-unitario-add.component';
import { CustoUnitarioEditComponent } from './planomonetario/custounitario/custo-unitario-edit/custo-unitario-edit.component';
export const planodengocioRoutes = [
    {path: 'planodenegocio/:id', component: PlanodenegocioComponent, children: 
    [

        //COMPONENTES INTROCUÇÃO AO PLANO ----------------------------------------
        {path: 'introplano', component: IntroplanoComponent},
        {path: 'missao/:id', component: MissaoComponent},
        //-------------------------------------------------------------------------

        //COMPONENTES ESTUDO DE MERCADO -------------------------------------------
        {path: 'introestudodemercado', component: IntroestudodemercadoComponent},
        {path: 'estudocliente/:id', component: EstudodosclientesComponent},
        {path: 'add-proprio', component: EstudoProprioAddComponent},
        {path: 'editar-proprio/:id', component: EstudoProprioEditarComponent},
        {path: 'estudoconcorrente/:id', component: EstudodosconcorrentesComponent},
        {path: 'add-concorrente', component: EstudodosconcorrentesAddComponent},
        {path: 'editar-concorrente/:id', component: EstudodosconcorrentesEditarComponent},
        {path: 'estudofornecedores/:id', component: EstudodosfornecedoresComponent},
        {path: 'add-fornecedor', component: EstudodosfornecedoresAddComponent},
        {path: 'editar-fornecedor/:id', component: EstudodosfornecedoresEditarComponent},
        //-------------------------------------------------------------------------

        //COMPONENTES PLANO DE MARKETING ------------------------------------------
        {path: 'introplanodemarketing', component: IntroplanodemarketingComponent},
        {path: 'produtoseservicos/:id', component: ProdutoseservicosComponent},
        {path: 'preco/:id', component: PrecoComponent},
        {path: 'estrategiaspromocionais/:id', component: EstrategiapromocionalComponent},
        {path: 'estruturacomercializacao/:id', component: EstruturadecomercializacaoComponent},
        {path: 'localizacaonegocio/:id', component: LocalizacaodonegocioComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES PLANO MONETÁRIO ----------------------------------------------
        {path: 'introplanomonetario', component: IntroplanomonetarioComponent},
        {path: 'investimentosfixos/:id', component: InvestimentosfixosComponent},
        {path: 'editar-investimentosfixos/:id', component: InvestimentosFixosEditarComponent},
        {path: 'editar-investimentosfixosMU/:id', component: InvestimentosFixosEditarMuComponent},
        {path: 'editar-investimentosfixosV/:id', component: InvestimentosFixosEditarVComponent},
        {path: 'add-investimentosfixos', component: InvestimentosFixosAddComponent},
        {path: 'add-investimentosfixosMU', component: InvestimentosFixosAddMuComponent},
        {path: 'add-investimentosfixosV', component: InvestimentosFixosAddVComponent},

        {path: 'capitalDeGiro/:id', component: CapitalDeGiroComponent},
        {path: 'editar-estoqueInicial/:id', component: EstoqueInicialEditComponent},
        {path: 'add-estoqueInicial', component: EstoqueInicialSaveComponent},

        {path: 'investimentospreop/:id', component: InvestimentospreopComponent},
        {path: 'investimentototal', component: InvestimentototalComponent},
        {path: 'faturamentomensal', component: FaturamentomensalComponent},
        {path: 'faturamentomensal-add', component: FaturamentoMensalAddComponent},
        {path: 'faturamentomensal-edit/:id', component: FaturamentoMensalEditComponent},
        {path: 'custouni', component: CustounitarioComponent},
        {path: 'custouni-add', component: CustoUnitarioAddComponent},
        {path: 'custouni-edit/:id', component: CustoUnitarioEditComponent},
        {path: 'custosdecomerc', component: CustosdecomercializacaoComponent},
        {path: 'custodedepre', component: CustosdedepreComponent},
        {path: 'custosfixosop', component: CustosfixosopComponent},
        {path: 'demonstrativoresultados', component: DemonstrativoderesultadosComponent},
        {path: 'indicadoresviabilidade', component: IndicadoresdeviabilidadeComponent},
        //---------------------------------------------------------------------------


        //COMPONENTES ANÁLISE CRÍTICA ----------------------------------------------
        {path: 'introanalisecritica', component: IntroanalisecriticaComponent},
        {path: 'matrizfofa/:id', component: MatrizfofaComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES CONCLUSÃO ----------------------------------------------------
        {path: 'introconclusao', component: IntroconclusaoComponent},
        {path: 'analiseplano/:id', component: AnaliseplanoComponent}
        //--------------------------------------------------------------------------

    ]
}
    
];

@NgModule({
    imports: [RouterModule.forChild(planodengocioRoutes)],
    exports: [RouterModule]
})
export class PlanodenegocioRoutingModule{}