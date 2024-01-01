import { MealCategory, SERVER_FOR_UPLOAD, ItemCategory } from './../../../../global';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { Item_Checklist_Categorie } from 'src/app/model/Model/Item_Checklist_Categorie';
import { UploadComponent } from 'src/app/shared/upload/upload.component';
import { ItemChecklistCategoryService } from 'src/app/service/item_checklist_category/item-checklist-category.service';

@Component({
  selector: 'app-modal-add-item-proposed-category',
  templateUrl: './modal-add-item-proposed-category.component.html',
  styleUrls: ['./modal-add-item-proposed-category.component.css']
})
export class ModalAddItemProposedCategoryComponent implements OnInit {

  id:string
  point: Point

  countries : any[]
  cities : any[]
  points : any []
  countryIsvalid = true
  cityIsvalid = true
  addressIsvalid = true
  loading = false
  country: string
  city: string
  address: string
  currentCountry: any
  currentAddress: any
  currentCity: any
  typeMeals = MealCategory
  itemCategory = ItemCategory
  itemCategories: Item_Checklist_Categorie
  @Output() onCreated = new EventEmitter<Item_Checklist_Categorie>()
  @Output() onUpdated = new EventEmitter<Item_Checklist_Categorie>()


  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(UploadComponent) upload_c: UploadComponent;
  formItemCategories: FormGroup

  constructor(private fb: FormBuilder, private itemChecklistCategoryService: ItemChecklistCategoryService) { }


  ngOnInit(): void {

    this.createForm()

  }


  createForm(itemCategory:Item_Checklist_Categorie= null){
    this.itemCategories =itemCategory
    this.formItemCategories = this.fb.group({});
    this.formItemCategories.addControl('name', new FormControl(itemCategory ? itemCategory.name: ''));
    this.formItemCategories.addControl('src', new FormControl(itemCategory ? itemCategory.src: '', Validators.required));
    // this.attach_ad = {file_name : ad && ad.image}
    if(this.upload_c){
      this.upload_c.uploads_datas = itemCategory && [{file_name : itemCategory && SERVER_FOR_UPLOAD + itemCategory.src}]
      console.log(this.upload_c.uploads_datas)
      this.upload_c.init()
    }

    this.formItemCategories.addControl('is_station', new FormControl(false));
    this.formItemCategories.addControl('type', new FormControl('0'));
  }
  onSumit(){
    console.log('this.formItemCategories.value ', this.formItemCategories.value)
    // return
    if(this.formItemCategories.valid){
      this.loading = true
      if(!this.itemCategories){
        this.itemChecklistCategoryService.post(this.formItemCategories.value).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.loading =false
          this.toast_c.open('Be Somewhere', 'le peti plasir '+ p.name + 'à été ajoutée')
        })
      }
      else{
        this.itemChecklistCategoryService.update(this.formItemCategories.value,this.itemCategories.id).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.loading =false
          this.toast_c.open('Be Somewhere', 'le peti plasir '+ p.name + ' à été mis à jour')
        })

      }
      setTimeout(() => {
        this.loading=false
      }, 6000);
    }
    else{
      this.toast_c.open("Be Somewhere", "vérifiez la validité des champs !")
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  file_deleted(e){
    this.formItemCategories.get('src').setValue('')
    console.log(e.file_name)
  }
  file_uploaded(e){
    this.formItemCategories.get('src').setValue(e.file_name)
    console.log(e.file_name)
    console.log(this.formItemCategories.get('src').value)
  }
}
