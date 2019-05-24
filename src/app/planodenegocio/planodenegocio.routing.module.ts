import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumoComponent } from './introducaoaoplano/resumo/resumo.component';
import { PlanodenegocioComponent } from './planodenegocio.component';
import { DadosempComponent } from './introducaoaoplano/dadosemp/dadosemp.component';
import { IntroplanoComponent } from './introducaoaoplano/introplano/introplano.component';
import { MissaoComponent } from './introducaoaoplano/missao/missao.component';
import { SetordeatvComponent } from './introducaoaoplano/setordeatv/setordeatv.component';
import { FormajuridicaComponent } from './introducaoaoplano/formajuridica/formajuridica.component';
import { EnqtribuComponent } from './introducaoaoplano/enqtribu/enqtribu.component';
import { CapitalsocialComponent } from './introducaoaoplano/capitalsocial/capitalsocial.component';
import { FonterecursosComponent } from './introducaoaoplano/fonterecursos/fonterecursos.component';
import { IntroestudodemercadoComponent } from './estudodemercado/introestudodemercado/introestudodemercado.component';
import { EstudodosclientesComponent } from './estudodemercado/estudodosclientes/estudodosclientes.component';
import { EstudodosconcorrentesComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes.component';
import { EstudodosfornecedoresComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores.component';
import { IntroplanodemarketingComponent } from './planodemarketing/introplanodemarketing/introplanodemarketing.component';
import { ProdutoseservicosComponent } from './planodemarketing/produtoseservicos/produtoseservicos.component';
import { PrecoComponent } from './planodemarketing/preco/preco.component';
import { EstrategiapromocionalComponent } from './planodemarketing/estrategiapromocional/estrategiapromocional.component';
import { EstruturadecomercializacaoComponent } from './planodemarketing/estruturadecomercializacao/estruturadecomercializacao.component';
import { LocalizacaodonegocioComponent } from './planodemarketing/localizacaodonegocio/localizacaodonegocio.component';
import { LeiauteComponent } from './planosorganizacionais/leiaute/leiaute.component';
import { CapacidadeinstaladaComponent } from './planosorganizacionais/capacidadeinstalada/capacidadeinstalada.component';
import { ProcessooperacionalComponent } from './planosorganizacionais/processooperacional/processooperacional.component';
import { NecessidadepessoalComponent } from './planosorganizacionais/necessidadepessoal/necessidadepessoal.component';
import { IntroplanosorganizacionaisComponent } from './planosorganizacionais/introplanosorganizacionais/introplanosorganizacionais.component';
import { IntroplanomonetarioComponent } from './planomonetario/introplanomonetario/introplanomonetario.component';
import { InvestimentosfixosComponent } from './planomonetario/investimentosfixos/investimentosfixos.component';
import { EstoqueinicialComponent } from './planomonetario/estoqueinicial/estoqueinicial.component';
import { CaixaminimoComponent } from './planomonetario/caixaminimo/caixaminimo.component';
import { InvestimentospreopComponent } from './planomonetario/investimentospreop/investimentospreop.component';
import { InvestimentototalComponent } from './planomonetario/investimentototal/investimentototal.component';
import { FaturamentomensalComponent } from './planomonetario/faturamentomensal/faturamentomensal.component';
import { CustounitarioComponent } from './planomonetario/custounitario/custounitario.component';
import { CustosdecomercializacaoComponent } from './planomonetario/custosdecomercializacao/custosdecomercializacao.component';
import { ApuracaodocustoComponent } from './planomonetario/apuracaodocusto/apuracaodocusto.component';
import { CustosdemdoComponent } from './planomonetario/custosdemdo/custosdemdo.component';
import { CustosdedepreComponent } from './planomonetario/custosdedepre/custosdedepre.component';
import { CustosfixosopComponent } from './planomonetario/custosfixosop/custosfixosop.component';
import { DemonstrativoderesultadosComponent } from './planomonetario/demonstrativoderesultados/demonstrativoderesultados.component';
import { IndicadoresdeviabilidadeComponent } from './planomonetario/indicadoresdeviabilidade/indicadoresdeviabilidade.component';
import { IntroperspectivaComponent } from './perspectivaestrategica/introperspectiva/introperspectiva.component';
import { AcoesprevecorreComponent } from './perspectivaestrategica/acoesprevecorre/acoesprevecorre.component';
import { IntroanalisecriticaComponent } from './analisecritica/introanalisecritica/introanalisecritica.component';
import { MatrizfofaComponent } from './analisecritica/matrizfofa/matrizfofa.component';
import { IntroconclusaoComponent } from './conclusao/introconclusao/introconclusao.component';
import { AnaliseplanoComponent } from './conclusao/analiseplano/analiseplano.component';

export const planodengocioRoutes = [
    {path: 'planodenegocio', component: PlanodenegocioComponent, children: 
    [

        //COMPONENTES INTROCUÇÃO AO PLANO ----------------------------------------
        {path: 'introplano', component: IntroplanoComponent},
        {path: 'resumo', component: ResumoComponent},
        {path: 'dadosempreendedores', component: DadosempComponent},
        {path: 'missao', component: MissaoComponent},
        {path: 'setordeatv', component: SetordeatvComponent},
        {path: 'formajuridica', component: FormajuridicaComponent},
        {path: 'enqtribu', component: EnqtribuComponent},
        {path: 'capitalsocial', component: CapitalsocialComponent},
        {path: 'fonterecursos', component: FonterecursosComponent},
        //-------------------------------------------------------------------------

        //COMPONENTES ESTUDO DE MERCADO -------------------------------------------
        {path: 'introestudodemercado', component: IntroestudodemercadoComponent},
        {path: 'estudocliente', component: EstudodosclientesComponent},
        {path: 'estudoconcorrente', component: EstudodosconcorrentesComponent},
        {path: 'estudofornecedores', component: EstudodosfornecedoresComponent},
        //-------------------------------------------------------------------------

        //COMPONENTES PLANO DE MARKETING ------------------------------------------
        {path: 'introplanodemarketing', component: IntroplanodemarketingComponent},
        {path: 'produtoseservicos', component: ProdutoseservicosComponent},
        {path: 'preco', component: PrecoComponent},
        {path: 'estrategiaspromocionais', component: EstrategiapromocionalComponent},
        {path: 'estruturacomercializacao', component: EstruturadecomercializacaoComponent},
        {path: 'localizacaonegocio', component: LocalizacaodonegocioComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES PLANOS ORGANIZACIONAIS ---------------------------------------
        {path: 'introplanoorganizacional', component: IntroplanosorganizacionaisComponent},
        {path: 'leiaute', component: LeiauteComponent},
        {path: 'capacidadeinstalada', component: CapacidadeinstaladaComponent},
        {path: 'processosop', component: ProcessooperacionalComponent},
        {path: 'necessidadedepessoal', component: NecessidadepessoalComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES PLANO MONETÁRIO ----------------------------------------------
        {path: 'introplanomonetario', component: IntroplanomonetarioComponent},
        {path: 'investimentosfixos', component: InvestimentosfixosComponent},
        {path: 'estoqueinicial', component: EstoqueinicialComponent},
        {path: 'caixaminimo', component: CaixaminimoComponent},
        {path: 'investimentospreop', component: InvestimentospreopComponent},
        {path: 'investimentototal', component: InvestimentototalComponent},
        {path: 'faturamentomensal', component: FaturamentomensalComponent},
        {path: 'custouni', component: CustounitarioComponent},
        {path: 'custosdecomerc', component: CustosdecomercializacaoComponent},
        {path: 'apuracao', component: ApuracaodocustoComponent},
        {path: 'custosmdo', component: CustosdemdoComponent},
        {path: 'custodedepre', component: CustosdedepreComponent},
        {path: 'custosfixosop', component: CustosfixosopComponent},
        {path: 'demonstrativoresultados', component: DemonstrativoderesultadosComponent},
        {path: 'indicadoresviabilidade', component: IndicadoresdeviabilidadeComponent},
        //---------------------------------------------------------------------------

        //COMPONENTES PERSPECTIVA ESTRATÉGICA ---------------------------------------
        {path: 'introperspectiva', component: IntroperspectivaComponent},
        {path: 'acoespec', component: AcoesprevecorreComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES ANÁLISE CRÍTICA ----------------------------------------------
        {path: 'introanalisecritica', component: IntroanalisecriticaComponent},
        {path: 'matrizfofa', component: MatrizfofaComponent},
        //--------------------------------------------------------------------------

        //COMPONENTES CONCLUSÃO ----------------------------------------------------
        {path: 'introconclusao', component: IntroconclusaoComponent},
        {path: 'analiseplano', component: AnaliseplanoComponent}
        //--------------------------------------------------------------------------
    ]
}
    
];

@NgModule({
    imports: [RouterModule.forChild(planodengocioRoutes)],
    exports: [RouterModule]
})
export class PlanodenegocioRoutingModule{}