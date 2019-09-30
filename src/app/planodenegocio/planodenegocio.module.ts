import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PlanodenegocioComponent } from "./planodenegocio.component";
import { PlanodenegocioRoutingModule } from './planodenegocio.routing.module';

import {planodengocioRoutes} from './planodenegocio.routing.module';
import { RouterModule } from '@angular/router';
import { MissaoComponent, DicasMissao } from './introducaoaoplano/missao/missao.component';
import { IntroplanoComponent } from './introducaoaoplano/introplano/introplano.component';
import { IntroestudodemercadoComponent } from './estudodemercado/introestudodemercado/introestudodemercado.component';
import { EstudodosclientesComponent, DicasClientes } from './estudodemercado/estudodosclientes/estudodosclientes.component';
import { EstudodosconcorrentesComponent, ExplicaMercado } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-list/estudodosconcorrentes.component';
import { EstudodosfornecedoresComponent, ExplicaFornecedores } from './estudodemercado/estudodosfornecedores/estudodosfornecedores.component';
import { IntroplanodemarketingComponent } from './planodemarketing/introplanodemarketing/introplanodemarketing.component';
import { ProdutoseservicosComponent, DicaProdutos } from './planodemarketing/produtoseservicos/produtoseservicos.component';
import { PrecoComponent, DicaPreco } from './planodemarketing/preco/preco.component';
import { EstrategiapromocionalComponent, DicaPromocional } from './planodemarketing/estrategiapromocional/estrategiapromocional.component';
import { EstruturadecomercializacaoComponent, DicaComercializacao } from './planodemarketing/estruturadecomercializacao/estruturadecomercializacao.component';
import { LocalizacaodonegocioComponent, DicaLocalizacao } from './planodemarketing/localizacaodonegocio/localizacaodonegocio.component';
import { IntroplanomonetarioComponent } from './planomonetario/introplanomonetario/introplanomonetario.component';
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
import { MatrizfofaComponent, DicasFOFA } from './analisecritica/matrizfofa/matrizfofa.component';
import { IntroconclusaoComponent } from './conclusao/introconclusao/introconclusao.component';
import { AnaliseplanoComponent, DialogContentExampleDialog } from './conclusao/analiseplano/analiseplano.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from '../planodenegocio/side-nav/side-nav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
MatIconModule, MatListModule, MatExpansionModule, MatOptionModule, MatSelectModule, MatInputModule, MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatCardModule, MatFormField, MatFormFieldModule, MatMenuModule, MatTooltipModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import { SimpleSidenavModule } from 'simple-sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';
import { MatVideoModule } from 'mat-video';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { EstudodosconcorrentesEditarComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-editar/estudodosconcorrentes-editar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EstudodosconcorrentesExcluirComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-excluir/estudodosconcorrentes-excluir.component';
import { DeleteConcorrenteModalComponent } from '../shared/components/modals/delete-concorrente-modal/delete-concorrente-modal.component';
import { EstudodosconcorrentesAddComponent } from './estudodemercado/estudodosconcorrentes/estudodosconcorrentes-add/estudodosconcorrentes-add.component';
import { EstudoProprioAddComponent } from './estudodemercado/estudodosconcorrentes/estudo-proprio-add/estudo-proprio-add.component';
import { EstudoProprioEditarComponent } from './estudodemercado/estudodosconcorrentes/estudo-proprio-editar/estudo-proprio-editar.component';
import { EstudodosfornecedoresEditarComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores-editar/estudodosfornecedores-editar.component';
import { DeleteFornecedorModalComponent } from '../shared/components/modals/delete-fornecedor-modal/delete-fornecedor-modal.component';
import { EstudodosfornecedoresAddComponent } from './estudodemercado/estudodosfornecedores/estudodosfornecedores-add/estudodosfornecedores-add.component';
import {NgxMaskModule} from 'ngx-mask';
import { InvestimentosFixosEditarComponent } from './planomonetario/investimentosfixos/tabela1/investimentos-fixos-editar/investimentos-fixos-editar.component';
import { InvestimentosFixosAddComponent } from './planomonetario/investimentosfixos/tabela1/investimentos-fixos-add/investimentos-fixos-add.component';
import { NgxCurrencyModule } from "ngx-currency";
import { InvestimentosFixosEditarMuComponent } from './planomonetario/investimentosfixos/tabela2/investimentos-fixos-editar-mu/investimentos-fixos-editar-mu.component';
import { InvestimentosFixosEditarVComponent } from './planomonetario/investimentosfixos/tabela3/investimentos-fixos-editar-v/investimentos-fixos-editar-v.component';
import { InvestimentosFixosAddMuComponent } from './planomonetario/investimentosfixos/tabela2/investimentos-fixos-add-mu/investimentos-fixos-add-mu.component';
import { InvestimentosFixosAddVComponent } from './planomonetario/investimentosfixos/tabela3/investimentos-fixos-add-v/investimentos-fixos-add-v.component';
import { DeleteInvestimentosFixosMeComponent } from '../shared/components/modals/delete-investimentos-fixos/delete-investimentos-fixos-me/delete-investimentos-fixos-me.component';
import { DeleteInvestimentosFixosVComponent } from '../shared/components/modals/delete-investimentos-fixos/delete-investimentos-fixos-v/delete-investimentos-fixos-v.component';
import { DeleteInvestimentosFixosMuComponent } from '../shared/components/modals/delete-investimentos-fixos/delete-investimentos-fixos-mu/delete-investimentos-fixos-mu.component';
import { CapitalDeGiroComponent } from './planomonetario/capital-de-giro/capital-de-giro.component';
import { EstoqueInicialEditComponent } from './planomonetario/capital-de-giro/estoqueInicial/estoque-inicial-edit/estoque-inicial-edit.component';
import { EstoqueInicialSaveComponent } from './planomonetario/capital-de-giro/estoqueInicial/estoque-inicial-save/estoque-inicial-save.component';
import { DeleteEstoqueInicialModalComponent } from '../shared/components/modals/delete-estoque-inicial-modal/delete-estoque-inicial-modal.component';
import { FaturamentoMensalAddComponent } from './planomonetario/faturamentomensal/faturamento-mensal-add/faturamento-mensal-add.component';
import { FaturamentoMensalEditComponent } from './planomonetario/faturamentomensal/faturamento-mensal-edit/faturamento-mensal-edit.component';
import { CustoUnitarioAddComponent } from './planomonetario/custounitario/custo-unitario-add/custo-unitario-add.component';
import { CustoUnitarioEditComponent } from './planomonetario/custounitario/custo-unitario-edit/custo-unitario-edit.component';
import { DeleteCustoUnitarioModalComponent } from '../shared/components/modals/delete-custo-unitario-modal/delete-custo-unitario-modal.component';
import { DeleteFaturamentoMensalModalComponent } from '../shared/components/modals/delete-faturamento-mensal-modal/delete-faturamento-mensal-modal.component';


@NgModule(
    {
        imports:[
            BrowserModule,
            MDBBootstrapModule.forRoot(),
            NgxCurrencyModule,
            VgCoreModule,
            NgxUiLoaderModule,
            VgControlsModule,
            VgOverlayPlayModule,
            VgBufferingModule,
            FormsModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            MatVideoModule,
            AppRoutingModule,
            SimpleSidenavModule,
            LayoutModule,
            HttpClientModule,
            EmbedVideo.forRoot(),
            NgbModule.forRoot(),
            MatInputModule,
            MatCheckboxModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatProgressSpinnerModule,
            MatCardModule,
            MatFormFieldModule,
            MatDividerModule,
            MatDialogModule,
            MatSelectModule,
            MatOptionModule,
            MatToolbarModule,
            MatExpansionModule,
            MatButtonModule,
            MatSidenavModule,
            MatIconModule,
            MatListModule,
            MatTooltipModule,
            CommonModule,
            NgbModule,
            BrowserModule,
            FlexLayoutModule,
            NgxMaskModule.forRoot(),
            MatMenuModule,
            RouterModule.forChild(planodengocioRoutes),
            PlanodenegocioRoutingModule,
            ToastrModule.forRoot({       
                timeOut: 4000, 
                positionClass: 'toast-top-center'    
              })
        ],
        exports:[
            MatToolbarModule,
            MatListModule,
            MatMenuModule
        ],
        declarations:[
            PlanodenegocioComponent,
            MissaoComponent, 
            IntroplanoComponent, 
            IntroestudodemercadoComponent, 
            EstudodosclientesComponent, 
            EstudodosconcorrentesComponent,
            EstudodosconcorrentesEditarComponent, 
            EstudodosfornecedoresComponent, 
            EstoqueInicialEditComponent,
            EstoqueInicialSaveComponent, 
            IntroplanodemarketingComponent, 
            ProdutoseservicosComponent, 
            PrecoComponent, 
            EstrategiapromocionalComponent, 
            EstruturadecomercializacaoComponent, 
            LocalizacaodonegocioComponent,
            IntroplanomonetarioComponent, 
            InvestimentosfixosComponent, 
            InvestimentosFixosEditarComponent,
            InvestimentosFixosEditarMuComponent,
            InvestimentosFixosEditarVComponent,
            InvestimentosFixosAddComponent,
            InvestimentosFixosAddMuComponent,
            InvestimentosFixosAddVComponent,
            InvestimentospreopComponent, 
            InvestimentototalComponent, 
            FaturamentomensalComponent,
            FaturamentoMensalAddComponent,
            FaturamentoMensalEditComponent,
            CapitalDeGiroComponent, 
            CustounitarioComponent,
            CustoUnitarioAddComponent,
            CustoUnitarioEditComponent, 
            CustosdecomercializacaoComponent,
            CustosdedepreComponent, 
            CustosfixosopComponent, 
            DemonstrativoderesultadosComponent,
            IndicadoresdeviabilidadeComponent,
            IntroanalisecriticaComponent, 
            MatrizfofaComponent, 
            IntroconclusaoComponent, 
            AnaliseplanoComponent,
            SideNavComponent,
            DialogContentExampleDialog,
            DicasFOFA,
            DicasMissao,
            DicasClientes,
            EstudodosconcorrentesExcluirComponent,
            EstudodosconcorrentesAddComponent,
            DeleteConcorrenteModalComponent,
            EstudoProprioAddComponent,
            EstudoProprioEditarComponent,
            ExplicaMercado,
            EstudodosfornecedoresAddComponent,
            EstudodosfornecedoresEditarComponent,
            DeleteFornecedorModalComponent,
            ExplicaFornecedores,
            DicaProdutos,
            DicaPreco,
            DicaLocalizacao,
            DicaPromocional,
            DicaComercializacao,
            DeleteInvestimentosFixosMeComponent,
            DeleteInvestimentosFixosMuComponent,
            DeleteInvestimentosFixosVComponent,
            DeleteEstoqueInicialModalComponent,
            DeleteCustoUnitarioModalComponent,
            DeleteFaturamentoMensalModalComponent
            
        ],
        entryComponents: [DialogContentExampleDialog, DicasFOFA, DicasMissao, DicasClientes, ExplicaMercado, DicaProdutos,
            ExplicaFornecedores, DicaPreco, DicaLocalizacao, DicaPromocional, DicaComercializacao],
        providers:[],
        bootstrap:[PlanodenegocioComponent]
    }
)

export class PlanodenegocioModule {}