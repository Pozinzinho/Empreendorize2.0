import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';



import {routes} from '../app/app-routing.module';

import {
  MatToolbarModule,
  MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { 
  LoginModule, 
  LoginRoutingModule, 
  CadastroPjModule,
  CadastroPjRoutingModule,
  CadastroPfModule,
  CadastroPfRoutingModule
} from './autenticacao';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './telasiniciais/home/home.component';
import { RodapeComponent } from './telasiniciais/rodape/rodape.component';
import { TopoComponent } from './telasiniciais/topo/topo.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { CriarComponent } from './telasplano/criar/criar.component';
import { PerfilComponent } from './telasiniciais/perfil/perfil.component';
import { DescricaoComponent } from './telasiniciais/descricao/descricao.component';
import { from } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { GerenciarplanoComponent } from './telasplano/gerenciarplano/gerenciarplano.component';
import { PlanodenegocioModule } from './planodenegocio/planodenegocio.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RodapeComponent,
    TopoComponent,
    CriarComponent,
    PerfilComponent,
    DescricaoComponent,
    GerenciarplanoComponent

    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    PlanodenegocioModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPjModule,
    CadastroPjRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    RouterModule.forRoot(routes),  //forRoot para globais //forChild para filhas
    AppRoutingModule, LayoutModule, MatButtonModule, MatSidenavModule, MatListModule, MatCheckboxModule,
    MatMenuModule, MatToolbarModule, MatIconModule,
  ],
  exports:[
    MatListModule,
    MatMenuModule
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
