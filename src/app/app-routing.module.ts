import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './telasiniciais/home/home.component'
import { CriarComponent } from './telasplano/criar/criar.component'
import { PerfilComponent } from './telasiniciais/perfil/perfil.component'
import { DescricaoComponent } from './telasiniciais/descricao/descricao.component'
import { GerenciarplanoComponent } from './telasplano/gerenciarplano/gerenciarplano.component'
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './components/resend-registration-token/resend-registration-token.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { EditarPlanoComponent } from './telasplano/editar-plano/editar-plano.component';
import { GerarRelatorioComponent } from './telasplano/gerar-relatorio/gerar-relatorio.component';
import { SuporteTecnicoComponent } from './telasiniciais/suporte-tecnico/suporte-tecnico.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChechIdUserTokenComponent } from './components/change-password/check-iduser-token.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterConfirmationComponent } from './components/register-user/register-confirmation.component';



export const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'loginUser', component: LoginUserComponent },

  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-confirmation', component: RegisterConfirmationComponent },
  { path: 'resend-register-token', component: ResendRegistrationTokenComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },

  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChechIdUserTokenComponent },
  { path: 'save-password/:id', component: ChangePasswordComponent },

  { path: 'suporte-tecnico', component: SuporteTecnicoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'criar', component: CriarComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'descricao', component: DescricaoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'gerenciarplano', component: GerenciarplanoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'gerarRelatorio/:id', component: GerarRelatorioComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'editarPlano/:id', component: EditarPlanoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
