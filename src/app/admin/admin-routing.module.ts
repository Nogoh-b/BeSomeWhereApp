import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ChecklistDetailsComponent } from './checklist/checklist-details/checklist-details.component';
import { ChecklistListComponent } from './checklist/checklist-list/checklist-list.component';
import { ItemsChecklistDetailsComponent } from './checklist/items-checklist-details/items-checklist-details.component';
import { ItemsChecklistListComponent } from './checklist/items-checklist-list/items-checklist-list.component';
import { MeatsListComponent } from './meat/meats-list/meats-list.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { PointDetailsComponent } from './point/point-details/point-details.component';
import { PointListComponent } from './point/point-list/point-list.component';
import { PointShedludesListComponent } from './point/point-shedludes-list/point-shedludes-list.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DetailsComponent } from './routes/details/details.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ReservationsComponent1 } from './reservations1/reservations.component';
import { ModalAddProposedChecklistComponent } from './components-admin/modal-add-proposed-checklist/modal-add-proposed-checklist.component';
import { ReservationByRouteComponent } from './reservation-by-route/reservation-by-route.component';
import { ReservationByRouteComponent1 } from './reservation-by-route1/reservation-by-route.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthGuardReservation } from '../guards/guards-reservation.guard';

const routes: Routes = [
  {
    path: '', component:ArticleListComponent,
  },
  {
    path: 'article/creation', component:ArticleDetailsComponent,
  },
  {
    path: 'points', component: PointListComponent
   },
   {
    path: 'petits-plaisirs', component: MeatsListComponent
  },
   {
    path: 'points/point/:id', component: PointDetailsComponent
   },
    {
   path: 'points/horraires_stations/:id', component: PointShedludesListComponent
 },
 {
  path: 'points/horraires_stations/:id/trajet/:id', component: DetailsComponent
  },
  {
  path: 'users', component: UserListComponent
  },
  {
  path: 'user/:id', component: UserDetailsComponent
  },
  {
  path: 'checklists', component: ChecklistListComponent
  },
  {
  path: 'checklist/:id', component: ChecklistDetailsComponent
  },
  {
  path: 'items-checklists', component: ItemsChecklistListComponent
  },
  {
  path: 'items-checklists/c', component: ModalAddProposedChecklistComponent
  },
  {
  path: 'item-checklist/:id', component: ItemsChecklistDetailsComponent
  },
  {
    path: 'reservations_par_trajets', component: ReservationByRouteComponent
  },
  {
    path: 'reservations_par_trajets-1', component: ReservationByRouteComponent1,
      canActivate : [AuthGuardReservation]
  },
  {
    path: 'paiements', component: PaymentComponent
  },
  {
    path: 'ads', component: AdsListComponent
  },
  {
    path: 'reservations', component: ReservationsComponent
   },
  {
    path: 'reservations-1', component: ReservationsComponent1
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
