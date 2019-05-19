import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatSlideToggleChange} from '@angular/material';
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';

import { HomeComponent } from './telasiniciais/home/home.component'
import { CriarComponent } from './telasplano/criar/criar.component'
import { PerfilComponent } from './telasiniciais/perfil/perfil.component'
import { DescricaoComponent } from './telasiniciais/descricao/descricao.component'
import { GerenciarplanoComponent } from './telasplano/gerenciarplano/gerenciarplano.component'



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'criar', component: CriarComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'descricao', component: DescricaoComponent},
    {path: 'gerenciarplano', component: GerenciarplanoComponent},
    

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
