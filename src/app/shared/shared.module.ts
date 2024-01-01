import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { InputComponentComponent } from './input-component/input-component.component';
import { SwitchComponent } from './switch/switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteCardComponent } from './route-card/route-card.component';
import { ButtonComponent } from './button/button.component';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';
import { SpinnerBoutonComponent } from './spinner-bouton/spinner-bouton.component';
import { ChecklistCardComponent } from './checklist-card/checklist-card.component';
import { ModalNewFileComponent } from './modal-new-file/modal-new-file.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalNewFolderComponent } from './modal-new-folder/modal-new-folder.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { UploadComponent } from './upload/upload.component';
import { ModalEditFolderComponent } from './modal-edit-folder/modal-edit-folder.component';



@NgModule({
  declarations: [
    TimelineComponent,
    InputSearchComponent,
    InputComponentComponent,
    SwitchComponent,
    RouteCardComponent,
    ButtonComponent,
    LoadingComponent,
    ToastComponent,
    SpinnerBoutonComponent,
    ChecklistCardComponent,
    ModalNewFileComponent,
    ModalDeleteComponent,
    ModalNewFolderComponent,
    ModalEditFolderComponent,
    EmptyPageComponent,
    LoadingPageComponent,
    UploadComponent,
    ModalEditFolderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    LoadingPageComponent,
    EmptyPageComponent,
    UploadComponent,
    ModalNewFileComponent,
    ModalDeleteComponent,
    ModalNewFolderComponent,
    ModalEditFolderComponent,
    InputComponentComponent,
    ChecklistCardComponent,
    SpinnerBoutonComponent,
    ToastComponent,
    LoadingComponent,
    ButtonComponent,
    RouteCardComponent,
    TimelineComponent,
    SwitchComponent,
    InputSearchComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
