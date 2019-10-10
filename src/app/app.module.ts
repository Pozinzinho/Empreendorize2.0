import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LayoutModule } from '@angular/cdk/layout';
import { GerenciarplanoComponent } from './telasplano/gerenciarplano/gerenciarplano.component';
import { PlanodenegocioModule } from './planodenegocio/planodenegocio.module';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './components/resend-registration-token/resend-registration-token.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AuthGuard } from './core/guards/auth.guard';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './core/api.service';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { InterceptorService } from './core/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from './core/message.service';
import { EditarPlanoComponent } from './telasplano/editar-plano/editar-plano.component';
import { ExcluirPlanoComponent } from './telasplano/excluir-plano/excluir-plano.component';
import { DeleteUserModalComponent } from './shared/components/modals/delete-user-modal/delete-user-modal.component';
import {NgxMaskModule} from 'ngx-mask';
import { MustMatchDirective } from './helpers/must-match.directive';
import { NgxSpinnerModule } from "ngx-spinner";
import { EmbedVideo } from 'ngx-embed-video';
import { MatVideoModule } from 'mat-video';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { NgxUiLoaderModule } from  'ngx-ui-loader';





@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    HomeComponent,
    RodapeComponent,
    TopoComponent,
    CriarComponent,
    PerfilComponent,
    DescricaoComponent,
    GerenciarplanoComponent,
    RegisterUserComponent,
    ResendRegistrationTokenComponent,
    EditUserComponent,
    ListUserComponent,
    LoginUserComponent,
    EditarPlanoComponent,
    ExcluirPlanoComponent,
    DeleteUserModalComponent
    
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgbModule,
    NgxUiLoaderModule,
    MatVideoModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    PlanodenegocioModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    RouterModule.forRoot(routes),  //forRoot para globais //forChild para filhas
    LayoutModule, MatButtonModule, MatSidenavModule, MatListModule, MatCheckboxModule,
    MatMenuModule, MatToolbarModule, MatIconModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({       
      timeOut: 4000,
      positionClass: 'toast-top-center'    
    }) 
  ],
  exports:[
    MatListModule,
    MatMenuModule
  ],
  providers: [ApiService, MessageService,
    {      
      provide: HTTP_INTERCEPTORS,       
      useClass: InterceptorService,       
      multi : true, 
    }, 
      FormsModule, AuthGuard],
      bootstrap: [AppComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
