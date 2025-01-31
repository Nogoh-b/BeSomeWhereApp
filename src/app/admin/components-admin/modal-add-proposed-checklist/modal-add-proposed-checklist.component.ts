import { UploadComponent } from './../../../shared/upload/upload.component';
import { ItemChecklistCategoryService } from './../../../service/item_checklist_category/item-checklist-category.service';
import { SERVER_FOR_UPLOAD } from './../../../../global';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapService } from './../../../service/map/map.service';
import { CountriesService } from './../../../service/countries/countries.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { ItemProposedService } from 'src/app/service/item_proposed/item-proposed.service';
import { Item_Proposed } from 'src/app/model/Model/Item_Proposed';
import { Item_Checklist_Categorie } from 'src/app/model/Model/Item_Checklist_Categorie';

@Component({
  selector: 'app-modal-add-proposed-checklist',
  templateUrl: './modal-add-proposed-checklist.component.html',
  styleUrls: ['./modal-add-proposed-checklist.component.css']
})
export class ModalAddProposedChecklistComponent implements OnInit, AfterViewInit {

  id:string
  item: Item_Proposed

  categories : Item_Checklist_Categorie[] = []
  loading = false

  attach_ad: any
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(UploadComponent) upload_c: UploadComponent;
  @Output() onCreated = new EventEmitter<Item_Proposed>()
  @Output() onUpdated = new EventEmitter<Item_Proposed>()
  formItem_Proposed: FormGroup
  constructor(private fb: FormBuilder, private itemCatService: ItemChecklistCategoryService, private itemService: ItemProposedService  ,private countriesService: CountriesService, private mapService: MapService, private route:ActivatedRoute) {


  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.createForm()
    this.itemCatService.get().subscribe(res => {
      this.categories = res
      console.log( this.categories)
      this.createForm()
      } )

  }


  createForm(item?: Item_Proposed){
    this.item = item
    this.formItem_Proposed = this.fb.group({});
    this.formItem_Proposed.addControl('name', new FormControl(item ? item.name :''));
    this.formItem_Proposed.addControl('name_en', new FormControl(item && item.name_en  ? item.name_en :''));
    this.formItem_Proposed.addControl('category_id', new FormControl(item ? item.category_id : this.categories[0] && this.categories[0].id));
  }
  onSumit(){
    console.log(this.formItem_Proposed.value)
    if(this.formItem_Proposed.valid){
      this.loading = true
      let item: Item_Proposed = this.formItem_Proposed.value


      console.log(item);
      
      // return
      if(this.item){
        this.itemService.update(item, this.item.id).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.loading = false
          this.formItem_Proposed.reset()
          this.close()
          this.toast_c.open('Be Somewhere', 'l\'élément '+ p.id + ' à été Mis à jour')
          this.onUpdated.emit(p)
        })
      }else{
        this.itemService.post(item).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.loading = false
          this.formItem_Proposed.reset()
          this.close()
          this.toast_c.open('Be Somewhere', 'l\'élément '+ p.id + ' à été ajoutée')
          this.onCreated.emit(p)
        })
      }
    }
    else{
      this.toast_c.open("Be Somewhere", "vérifiez la validité des champs !")
    }
  }

  close(){
    this.loading =false
    var btnclose = document.getElementById("close_btn")
    setTimeout(() => {
      btnclose?.click()
    }, 1500);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  file_uploaded(f){
    this.formItem_Proposed.get('image').setValue(SERVER_FOR_UPLOAD+ f.file_name)
    console.log(this.formItem_Proposed.get('image').value)
  }

  file_deleted(f){
    this.formItem_Proposed.get('image').setValue('')
    console.log(this.formItem_Proposed.get('image').value)
  }
}
