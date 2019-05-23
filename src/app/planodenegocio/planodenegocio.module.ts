import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PlanodenegocioComponent } from "./planodenegocio.component";
import { IntroducaoComponent } from './introducao/introducao.component';
import { MenulateralComponent } from './menulateral/menulateral.component';
import { PlanodenegocioRoutingModule } from './planodenegocio.routing.module';

import {planodengocioRoutes} from './planodenegocio.routing.module';
import { RouterModule } from '@angular/router';
import { DadosempComponent } from './dadosemp/dadosemp.component';

@NgModule(
    {
        imports:[
            CommonModule,
            NgbModule,
            RouterModule.forChild(planodengocioRoutes),
            PlanodenegocioRoutingModule
        ],
        exports:[],
        declarations:[PlanodenegocioComponent, IntroducaoComponent, MenulateralComponent, DadosempComponent ],
        providers:[]
    }
)

export class PlanodenegocioModule {}