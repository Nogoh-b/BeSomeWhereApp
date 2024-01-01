import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../components/components.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChelcklistListComponent } from './chelcklist-list/chelcklist-list.component';
import { ChecklistDetailsComponent } from './checklist-details/checklist-details.component';
import { ChecklistAddComponent } from './checklist-add/checklist-add.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ItemsChecklistListComponent } from './items-checklist-list/items-checklist-list.component';
import { ItemsChecklistDetailsComponent } from './items-checklist-details/items-checklist-details.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ChelcklistListComponent,
    ChecklistDetailsComponent,
    ChecklistAddComponent,
    ChecklistListComponent,
    ItemsChecklistListComponent,
    ItemsChecklistDetailsComponent
  ],
  imports: [
    ComponentsModule,
    SharedModule,
    BrowserModule,
    NgPipesModule,
    RouterModule,
    FormsModule,
    CommonModule,
            // Specify ng-circle-progress as an import
            NgCircleProgressModule.forRoot({
              "radius": 40,
              "outerStrokeColor": "#1b7eba",
              "innerStrokeColor": "#a5dbfd",
              "showSubtitle": false}),
    ReactiveFormsModule,

  ]
})
export class ChecklistModule {
  static forRoot(): ModuleWithProviders <ChecklistModule>  {
    return {
      //At this point I can set any other class than FeatureModuleA for root
      //So lets create a FeatureRootModuleA class: see below!
      ngModule: ChecklistModule //should be: FeatureRootModuleA
    };
  }
 }
