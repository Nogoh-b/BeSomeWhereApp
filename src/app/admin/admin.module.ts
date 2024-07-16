import { ReservationsComponent } from './reservations/reservations.component';
import { PointCreateComponent } from './point/point-create/point-create.component';
import { QuillModule } from 'ngx-quill';
import { NgPipesModule } from 'ngx-pipes';
import { ComponentsAdminModule } from './components-admin/components-admin.module';
import { AuthGuard } from './../guards/auth.guard';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { AuthService } from './../service/core/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ComponentsModule } from './../components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { SharedModule } from '../shared/shared.module';
import { PointDetailsComponent } from './point/point-details/point-details.component';
import { PointListComponent } from './point/point-list/point-list.component';
import { PointShedludesListComponent } from './point/point-shedludes-list/point-shedludes-list.component';
import { DetailsComponent } from './routes/details/details.component';
import { MeatsListComponent } from './meat/meats-list/meats-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ChecklistListComponent } from './checklist/checklist-list/checklist-list.component';
import { ChecklistDetailsComponent } from './checklist/checklist-details/checklist-details.component';
import { ItemsChecklistListComponent } from './checklist/items-checklist-list/items-checklist-list.component';
import { ItemsChecklistDetailsComponent } from './checklist/items-checklist-details/items-checklist-details.component';
import { ReservationByRouteComponent } from './reservation-by-route/reservation-by-route.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CKEditorModule } from 'ngx-ckeditor';
import { ReservationsComponent1 } from './reservations1/reservations.component';
import { ReservationByRouteComponent1 } from './reservation-by-route1/reservation-by-route.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    PointDetailsComponent,
    PointCreateComponent,
    PointShedludesListComponent,
    PointListComponent,
    MeatsListComponent,
    UserListComponent,
    UserDetailsComponent,
    ChecklistListComponent,
    ChecklistDetailsComponent,
    ItemsChecklistListComponent,
    ItemsChecklistDetailsComponent,
    ReservationByRouteComponent,
    ReservationByRouteComponent1,
    DetailsComponent,
    PaymentComponent,
    AdsListComponent,
    ReservationsComponent,
    ReservationsComponent1

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    ComponentsAdminModule,
    SharedModule,
    FormsModule,
    AngularFireAuthModule,
    // CKEditorModule,// BrowserAnimationsModule,
    // AppRoutingModule,
    EditorModule,
    QuillModule.forRoot(),
    RouterModule,
    NgPipesModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
     UserServiceFireBase, DatePipe, AuthGuard],
})

export class AdminModule {

  // static forRoot(): ModuleWithProviders <AdminModule>  {
  //   return {
  //     //At this point I can set any other class than FeatureModuleA for root
  //     //So lets create a FeatureRootModuleA class: see below!
  //     ngModule: AdminModule //should be: FeatureRootModuleA
  //   };
  // }
 }
