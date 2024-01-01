import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoosePointComponent } from './choose-point/choose-point.component';
import { ChooseSchedulesComponent } from './choose-schedules/choose-schedules.component';
import { ChoosePassengersComponent } from './choose-passengers/choose-passengers.component';
import { ChooseItemsComponent } from './choose-items/choose-items.component';
import { OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NgPipesModule } from 'ngx-pipes';
import { RoutesRoutingModule } from 'src/app/routes/routes-routing.module';
import { ComponentsAdminModule } from '../components-admin/components-admin.module';


@NgModule({
  declarations: [
    ChoosePointComponent,
    ChooseSchedulesComponent,
    ChoosePassengersComponent,
    ChooseItemsComponent,
    OrderComponent,
    ListComponent

  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule,
    ComponentsAdminModule, 
    FormsModule,
    NgPipesModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RoutesModule { }
