import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroducaoComponent } from './introducao/introducao.component';
import { PlanodenegocioComponent } from './planodenegocio.component';
import { DadosempComponent } from './dadosemp/dadosemp.component';

export const planodengocioRoutes = [
    {path: 'planodenegocio', component: PlanodenegocioComponent, children: 
    [
        {path: 'introducao', component: IntroducaoComponent},
        {path: 'dadosempreendedores', component: DadosempComponent}
    ]
}
    
];

@NgModule({
    imports: [RouterModule.forChild(planodengocioRoutes)],
    exports: [RouterModule]
})
export class PlanodenegocioRoutingModule{}