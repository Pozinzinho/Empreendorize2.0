import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroducaoComponent } from './introducao/introducao.component';
import { PlanodenegocioComponent } from './planodenegocio.component';

export const planodengocioRoutes = [
    {path: 'planodenegocio', component: PlanodenegocioComponent},
    {path: 'planodenegocio/introducao', component: IntroducaoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(planodengocioRoutes)],
    exports: [RouterModule]
})
export class PlanodenegocioRoutingModule{}