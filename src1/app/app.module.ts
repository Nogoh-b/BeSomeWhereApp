import { ComponentsAdminModule } from './admin/components-admin/components-admin.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserServiceFireBase } from './service/core/user.service';
import { AuthService } from './service/core/auth.service';
import { ComponentsModule } from './components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChecklistModule } from './checklist/checklist.module';
import { ComponentsRoutingModule } from './components/components-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ProfileComponent } from './profile/profile.component';
import { CommunityComponent } from './community/community.component';
import { DatePipe } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgPipesModule } from 'ngx-pipes';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { AboutUsComponent } from './orthers/about-us/about-us.component';
import { SecurityCovidPageComponent } from './orthers/security-covid-page/security-covid-page.component';
import { StartingPointComponent } from './orthers/starting-point/starting-point.component';
import { SecurityNetworkComponent } from './orthers/security-network/security-network.component';
// import {JpImagePreloadModule} from 'ng-image-preload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CommunityComponent,
    ArticleListComponent,
    ArticleDetailsComponent,
    AboutUsComponent,
    SecurityCovidPageComponent,
    StartingPointComponent,
    SecurityNetworkComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // JpImagePreloadModule.forRoot(),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ComponentsModule.forRoot(),
    ReactiveFormsModule,
    NgPipesModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    SharedModule,
    ComponentsAdminModule,
    IvyCarouselModule,
    NgCircleProgressModule.forRoot({
      "radius": 40,
      "outerStrokeColor": "#1b7eba",
      "innerStrokeColor": "#a5dbfd",
      "showSubtitle": false}),
      ChecklistModule.forRoot(),
      ComponentsModule.forRoot()

    ],
    providers: [AuthService,{ provide: LocationStrategy, useClass: HashLocationStrategy }, UserServiceFireBase, DatePipe, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppModule { }
