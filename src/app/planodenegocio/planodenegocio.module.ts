import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PlanodenegocioComponent } from "./planodenegocio.component";
import { ResumoComponent } from './introducaoaoplano/resumo/resumo.component';
import { MenulateralComponent } from './menulateral/menulateral.component';
import { PlanodenegocioRoutingModule } from './planodenegocio.routing.module';

import {planodengocioRoutes} from './planodenegocio.routing.module';
import { RouterModule } from '@angular/router';
import { DadosempComponent } from './introducaoaoplano/dadosemp/dadosemp.component';
import { MissaoComponent } from './introducaoaoplano/missao/missao.component';
import { SetordeatvComponent } from './introducaoaoplano/setordeatv/setordeatv.component';
import { FormajuridicaComponent } from './introducaoaoplano/formajuridica/formajuridica.component';
import { EnqtribuComponent } from './introducaoaoplano/enqtribu/enqtribu.component';
import { CapitalsocialComponent } from './introducaoaoplano/capitalsocial/capitalsocial.component';
import { FonterecursosComponent } from './introducaoaoplano/fonterecursos/fonterecursos.component';
import { IntroplanoComponent } from './introducaoaoplano/introplano/introplano.component';
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
import { IntroplanosorganizacionaisComponent } from './planosorganizacionais/introplanosorganizacionais/introplanosorganizacionais.component';
import { LeiauteComponent } from './planosorganizacionais/leiaute/leiaute.component';
import { CapacidadeinstaladaComponent } from './planosorganizacionais/capacidadeinstalada/capacidadeinstalada.component';
import { ProcessooperacionalComponent } from './planosorganizacionais/processooperacional/processooperacional.component';
import { NecessidadepessoalComponent } from './planosorganizacionais/necessidadepessoal/necessidadepessoal.component';
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

@NgModule(
    {
        imports:[
            CommonModule,
            NgbModule,
            RouterModule.forChild(planodengocioRoutes),
            PlanodenegocioRoutingModule
        ],
        exports:[],
        declarations:[PlanodenegocioComponent, ResumoComponent, MenulateralComponent, DadosempComponent, MissaoComponent, SetordeatvComponent, FormajuridicaComponent, EnqtribuComponent, CapitalsocialComponent, FonterecursosComponent, IntroplanoComponent, IntroestudodemercadoComponent, EstudodosclientesComponent, EstudodosconcorrentesComponent, EstudodosfornecedoresComponent, IntroplanodemarketingComponent, ProdutoseservicosComponent, PrecoComponent, EstrategiapromocionalComponent, EstruturadecomercializacaoComponent, LocalizacaodonegocioComponent, IntroplanosorganizacionaisComponent, LeiauteComponent, CapacidadeinstaladaComponent, ProcessooperacionalComponent, NecessidadepessoalComponent, IntroplanomonetarioComponent, InvestimentosfixosComponent, EstoqueinicialComponent, CaixaminimoComponent, InvestimentospreopComponent, InvestimentototalComponent, FaturamentomensalComponent, CustounitarioComponent, CustosdecomercializacaoComponent, ApuracaodocustoComponent, CustosdemdoComponent, CustosdedepreComponent, CustosfixosopComponent, DemonstrativoderesultadosComponent, IndicadoresdeviabilidadeComponent, IntroperspectivaComponent, AcoesprevecorreComponent, IntroanalisecriticaComponent, MatrizfofaComponent, IntroconclusaoComponent, AnaliseplanoComponent ],
        providers:[]
    }
)

export class PlanodenegocioModule {}