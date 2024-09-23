import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalDeleteAdminComponent } from './modal-delete-admin/modal-delete-admin.component';
import { ModalCreateDriveComponent } from './modal-create-drive/modal-create-drive.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { RoutedetailsComponent } from './routedetails/routedetails.component';
import { ModalEditPlaceTrajetComponent } from './modal-edit-place-trajet/modal-edit-place-trajet.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { MeatsCreateModalComponent } from './meats-create-modal/meats-create-modal.component';
import { ModalUserDetailsComponent } from './modal-user-details/modal-user-details.component';
import { ModalAddProposedChecklistComponent } from './modal-add-proposed-checklist/modal-add-proposed-checklist.component';
import { ModalAddItemProposedCategoryComponent } from './modal-add-item-proposed-category/modal-add-item-proposed-category.component';
import { ModalAdsCUComponent } from './modal-ads-c-u/modal-ads-c-u.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UploadComponent } from './upload/upload.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    ModalDeleteComponent,
    ModalDeleteAdminComponent,
    ModalCreateDriveComponent,
    RoutelistComponent,
    RoutedetailsComponent,
    ModalEditPlaceTrajetComponent,
    NavBarAdminComponent,
    NavBarAdminComponent,
    MeatsCreateModalComponent,
    ModalUserDetailsComponent,
    ModalAddProposedChecklistComponent,
    ModalAddItemProposedCategoryComponent,
    ModalAdsCUComponent,
    ModalCreateDriveComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    QuillModule.forRoot(),ReactiveFormsModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    ModalDeleteAdminComponent,
    RoutelistComponent,
    RoutedetailsComponent,
    ModalEditPlaceTrajetComponent,
    NavBarAdminComponent,
    MeatsCreateModalComponent,
    ModalUserDetailsComponent,
    ModalAddProposedChecklistComponent,
    ModalAddItemProposedCategoryComponent,
    ModalAdsCUComponent,
    ModalCreateDriveComponent,
    UploadComponent
  ]
})
export class ComponentsAdminModule { }
