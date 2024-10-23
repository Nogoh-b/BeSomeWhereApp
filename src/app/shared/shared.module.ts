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
import { TranslatePipe } from '../pipe/translation/translation.pipe';
import { ToastrModule } from 'ngx-toastr';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    TimelineComponent,
    InputSearchComponent,
    InputComponentComponent,
    TranslatePipe,
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
    ModalEditFolderComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  exports:[
    LoadingPageComponent,
    EmptyPageComponent,
    UploadComponent,
    ModalNewFileComponent,
    ModalDeleteComponent,
    TranslatePipe,
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
    DropdownComponent,
    InputSearchComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
