import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PlanodenegocioComponent } from "./planodenegocio.component";
import { PlanodenegocioRoutingModule } from './planodenegocio.routing.module';

import {planodengocioRoutes} from './planodenegocio.routing.module';
import { RouterModule } from '@angular/router';
import { DadosempComponent } from './introducaoaoplano/dadosemp/dadosemp.component';
import { MissaoComponent } from './introducaoaoplano/missao/missao.component';
import { SetordeatvComponent } from './introducaoaoplano/setordeatv/setordeatv.component';
import { CapitalsocialComponent } from './introducaoaoplano/capitalsocial/capitalsocial.component';
import { FonterecursosComponent } from './introducaoaoplano/fonterecursos/fonterecursos.component';
import { IntroplanoComponent } from './introducaoaoplano/introplano/introplano.component';
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
import { MatrizfofaComponent } from './analisecritica/matrizfofa/matrizfofa.component';
import { IntroconclusaoComponent } from './conclusao/introconclusao/introconclusao.component';
import { AnaliseplanoComponent, DialogContentExampleDialog } from './conclusao/analiseplano/analiseplano.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from '../planodenegocio/side-nav/side-nav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
MatIconModule, MatListModule, MatExpansionModule, MatOptionModule, MatSelectModule, MatInputModule, MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatCardModule, MatFormField, MatFormFieldModule, MatMenuModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import { SimpleSidenavModule } from 'simple-sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DadosempAddComponent } from './introducaoaoplano/dadosemp/dadosemp-add/dadosemp-add.component';
import { DadosempEditComponent } from './introducaoaoplano/dadosemp/dadosemp-edit/dadosemp-edit.component';
import { DadosempDetailComponent } from './introducaoaoplano/dadosemp/dadosemp-detail/dadosemp-detail.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';
import { MatVideoModule } from 'mat-video';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';

@NgModule(
    {
        imports:[
            BrowserModule,
            VgCoreModule,
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
            MatInputModule,
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
            MDBBootstrapModule.forRoot(),
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
            DadosempComponent, 
            DadosempAddComponent,
            DadosempEditComponent,
            DadosempDetailComponent,
            MissaoComponent, 
            SetordeatvComponent,
            CapitalsocialComponent, 
            FonterecursosComponent, 
            IntroplanoComponent, 
            IntroestudodemercadoComponent, 
            EstudodosclientesComponent, 
            EstudodosconcorrentesComponent, 
            EstudodosfornecedoresComponent, 
            IntroplanodemarketingComponent, 
            ProdutoseservicosComponent, 
            PrecoComponent, 
            EstrategiapromocionalComponent, 
            EstruturadecomercializacaoComponent, 
            LocalizacaodonegocioComponent,
            IntroplanomonetarioComponent, 
            InvestimentosfixosComponent, 
            InvestimentospreopComponent, 
            InvestimentototalComponent, 
            FaturamentomensalComponent, 
            CustounitarioComponent, 
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
            DialogContentExampleDialog
        ],
        entryComponents: [DialogContentExampleDialog],
        providers:[],
        bootstrap:[PlanodenegocioComponent]
    }
)

export class PlanodenegocioModule {}