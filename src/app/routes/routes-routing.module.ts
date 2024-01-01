import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { ChooseItemsComponent } from './choose-items/choose-items.component';
import { ChoosePassengersComponent } from './choose-passengers/choose-passengers.component';
import { ChooseSchedulesComponent } from './choose-schedules/choose-schedules.component';
import { ChoosePointComponent } from './choose-point/choose-point.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
  path: 'creation/1', component: ChoosePointComponent
  },
  {
  path: 'creation/2', component: ChooseSchedulesComponent,
  },
  {
  path: 'creation/3', component: ChoosePassengersComponent,
  canActivate : [AuthGuard]
  },
  {
  path: 'creation/4', component: ChooseItemsComponent,
  canActivate : [AuthGuard]
  },
  {
  path: 'creation/5', component: OrderComponent,
  canActivate : [AuthGuard]
  },
  {
  path: 'mes-trajets', component: ListComponent,
  canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
