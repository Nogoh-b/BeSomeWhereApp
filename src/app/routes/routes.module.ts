import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../components/components.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { ChoosePointComponent } from './choose-point/choose-point.component';
import { ChooseSchedulesComponent } from './choose-schedules/choose-schedules.component';
import { ChoosePassengersComponent } from './choose-passengers/choose-passengers.component';
import { ChooseItemsComponent } from './choose-items/choose-items.component';
import { OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ChoosePointComponent,
    ChooseSchedulesComponent,
    ChoosePassengersComponent,
    ChooseItemsComponent,
    OrderComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class RoutesModule { }
