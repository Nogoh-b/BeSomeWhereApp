import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../components/components.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChelcklistListComponent } from './chelcklist-list/chelcklist-list.component';
import { ChecklistDetailsComponent } from './checklist-details/checklist-details.component';
import { ChecklistAddComponent } from './checklist-add/checklist-add.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    ChelcklistListComponent,
    ChecklistDetailsComponent,
    ChecklistAddComponent
  ],
  imports: [
    ComponentsModule,
    SharedModule,
    NgPipesModule,
    RouterModule,
    CommonModule,
            // Specify ng-circle-progress as an import
            NgCircleProgressModule.forRoot({
              "radius": 40,
              "outerStrokeColor": "#1b7eba",
              "innerStrokeColor": "#a5dbfd",
              "showSubtitle": false}),
    ReactiveFormsModule,

  ],
  exports: [
    ChecklistAddComponent
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
