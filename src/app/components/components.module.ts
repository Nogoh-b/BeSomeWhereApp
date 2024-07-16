import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeTrajetComponent } from './home-trajet/home-trajet.component';
import { FooterComponent } from './footer/footer.component';
import { HomeChecklistComponent } from './home-checklist/home-checklist.component';
import { HomeCardBlogComponent } from './home-card-blog/home-card-blog.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { HomeVisitComponent } from './home-visit/home-visit.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeAdsComponent } from './home-ads/home-ads.component';
import { SharedModule } from '../shared/shared.module';
import { ChecklistStateComponent } from './checklist-state/checklist-state.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProposedChecklistComponent } from './proposed-checklist/proposed-checklist.component';
import { FolderStateComponent } from './folder-state/folder-state.component';
import { ToolsbarChecklistComponent } from './toolsbar-checklist/toolsbar-checklist.component';
import { FilesViewComponent } from './files-view/files-view.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { PreloaderHomeComponent } from './preloader-home/preloader-home.component';
import { PreloaderRouteDetailsComponent } from './preloader-route-details/preloader-route-details.component';
import { PreloaderRouteListComponent } from './preloader-route-list/preloader-route-list.component';
import { PreloaderChecklistListComponent } from './preloader-checklist-list/preloader-checklist-list.component';
import { PreloaderChecklistDetailsComponent } from './preloader-checklist-details/preloader-checklist-details.component';
import { PreloaderChecklistCreateComponent } from './preloader-checklist-create/preloader-checklist-create.component';
import { HomeSearch1Component } from './home-search1/home-search1.component';
import { InputSearchStationComponent } from './input-search-station/input-search-station.component';
import { InputSearchAdressComponent } from './input-search-adress/input-search-adress.component';
import { FirstReservationDivComponent } from './first-reservation-div/first-reservation-div.component';
import { ModalUserEditComponent } from './modal-user-edit/modal-user-edit.component';
import { ModalAddAddressComponent } from './modal-add-address/modal-add-address.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgPipesModule } from 'ngx-pipes';
import { ModalResetPwdComponent } from './modal-reset-pwd/modal-reset-pwd.component';
import { PricingComponent } from './pricing/pricing.component';
import { PaymentsComponent } from './payments/payments.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PreloaderComponent } from './preloader/preloader/preloader.component';
import { PreloaderImgComponent } from './preloader-img/preloader-img.component';
import { StripeFormComponent } from './stripe-form/stripe-form.component';
import { StripCardComponent } from './strip-card/strip-card.component';
import { StripeComponent } from './stripe-payment/stripe.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  declarations: [
    NavBarComponent, 
    HomeTrajetComponent,
    FooterComponent,
    HomeChecklistComponent,
    HomeCardBlogComponent,
    HomeSearchComponent,
    HomeVisitComponent,
    HomeAboutComponent,
    HomeAdsComponent,
    ChecklistStateComponent,
    ProposedChecklistComponent,
    FolderStateComponent,
    ToolsbarChecklistComponent,
    FilesViewComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    PreloaderHomeComponent,
    PreloaderRouteDetailsComponent,
    PreloaderRouteListComponent,
    PreloaderChecklistListComponent,
    PreloaderChecklistDetailsComponent,
    PreloaderChecklistCreateComponent,
    HomeSearch1Component,
    PreloaderComponent,
    InputSearchStationComponent,
    InputSearchAdressComponent,
    FirstReservationDivComponent,
    ModalUserEditComponent,
    ModalAddAddressComponent,
    ModalResetPwdComponent,
    PricingComponent,
    PaymentsComponent,
    ContactUsComponent,
    ContactListComponent,
    PreloaderImgComponent,
    PreloaderImgComponent,
    StripeFormComponent,
    StripCardComponent,
    StripeComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    // CarouselModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoibmlsb2JvYnkiLCJhIjoiY2t0bTY4ZWFzMG5pMDJubWp1dTQzaGo5NyJ9.AMsPtdLuutboBJivusJ9yA' // Remplacez par votre propre token
    }),
    ComponentsRoutingModule,
    CarouselModule.forRoot(),
    NgPipesModule,
    SharedModule,
    TooltipModule,
    // IvyCarouselModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "radius": 40,
      "outerStrokeColor": "#1b7eba",
      "innerStrokeColor": "#a5dbfd",
      "showSubtitle": false}),
    ],
    exports: [
      ContactUsComponent,
      ModalUserEditComponent,
      ModalAddAddressComponent,
      InputSearchStationComponent,
      FirstReservationDivComponent,
      ModalResetPwdComponent,
      InputSearchAdressComponent,
      PreloaderHomeComponent,
      HomeSearch1Component,
      PricingComponent,
      ContactListComponent,
      PaymentsComponent,
      PreloaderComponent,
      PreloaderRouteDetailsComponent,
      PreloaderRouteListComponent,
      PreloaderChecklistListComponent,
      PreloaderChecklistDetailsComponent,
      PreloaderChecklistCreateComponent,
      ChecklistStateComponent,
      FolderStateComponent,
      ModalLoginComponent,
      ModalRegisterComponent,
      ToolsbarChecklistComponent,
      FilesViewComponent,
      ProposedChecklistComponent,
      NavBarComponent,
      HomeAboutComponent,
      HomeAdsComponent,
      HomeTrajetComponent,
      HomeCardBlogComponent,
      HomeVisitComponent,
      FooterComponent,
      HomeChecklistComponent,
      HomeSearchComponent,
      StripeFormComponent,
      PreloaderImgComponent,
      StripCardComponent,
      LanguageSelectorComponent,
      StripeComponent
    ]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders <ComponentsModule>  {
    return {
      //At this point I can set any other class than FeatureModuleA for root
      //So lets create a FeatureRootModuleA class: see below!
      ngModule: ComponentsModule //should be: FeatureRootModuleA
    };
  }
 }
