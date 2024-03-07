import { AdminGuard } from './guards/admin.guard';
import { StartingPointComponent } from './orthers/starting-point/starting-point.component';
import { SecurityCovidPageComponent } from './orthers/security-covid-page/security-covid-page.component';
import { AboutUsComponent } from './orthers/about-us/about-us.component';
import { CommunityComponent } from './community/community.component';
import { ChecklistDetailsComponent } from './checklist/checklist-details/checklist-details.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './routes/list/list.component';
import { DetailsComponent } from './routes/details/details.component';
import { ChelcklistListComponent } from './checklist/chelcklist-list/chelcklist-list.component';
import { ChecklistAddComponent } from './checklist/checklist-add/checklist-add.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AuthGuard } from './guards/auth.guard';
import { SecurityNetworkComponent } from './orthers/security-network/security-network.component';
import { ConditionsOfSaleComponent } from './pages_utils/conditions-of-sale/conditions-of-sale.component';
import { LastCommunicationComponent } from './pages_utils/last-communication/last-communication.component';
import { TermsOfUseAndPrivacypolicyComponent } from './pages_utils/terms-of-use-and-privacypolicy/terms-of-use-and-privacypolicy.component';

const routes: Routes = [
  {
  path: '', component: HomeComponent
  },
  {
  path: 'trajets',
  loadChildren: () => import('../app/routes/routes.module').then( m => m.RoutesModule)
 },
  {
  path: 'back-office',
  loadChildren: () => import('../app/admin/admin.module').then( m => m.AdminModule)
 },
 {
 path: 'mes-trajets', component: ListComponent

 },
 {
 path: 'mes-trajets/:id', component: DetailsComponent,
 canActivate : [AuthGuard]
 },
 {
  path: 'checklist/creation', component: ChecklistAddComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'mes-checklists', component: ChelcklistListComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'mes-checklists/archivés', component: ChelcklistListComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'checklist/:id', component: ChecklistDetailsComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'edition-checklist/:id', component: ChecklistAddComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'profil', component: ProfileComponent,
  canActivate : [AuthGuard]
 },
 {
  path: 'communaute', component: CommunityComponent
 },
 {
  path: 'article/:id', component: ArticleDetailsComponent,
 },
 {
  path: 'article', component: ArticleListComponent,
 },
 {
  path: 'mieux-comprendre-les-points-de-départs', component: StartingPointComponent,
 },
  {
  path: 'a-propos', component: AboutUsComponent,
 },{
  path: 'nos-mesures-de-sécurité-contre-la-propagation-du-covid-19', component: SecurityCovidPageComponent,
 }
,
 {
  path: 'securite', component: SecurityNetworkComponent,
 }
,
 {
  path: 'conditions-de-vente', component:     ConditionsOfSaleComponent,
 }
,
 {
  path: 'dernieres-news', component:     LastCommunicationComponent,
 }
,
 {
  path: 'termes-utilisations', component:     TermsOfUseAndPrivacypolicyComponent,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],

})
export class AppRoutingModule { }
