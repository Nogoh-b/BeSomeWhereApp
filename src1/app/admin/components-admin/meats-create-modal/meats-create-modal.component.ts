import { HttpClient } from '@angular/common/http';
import { MealsService } from './../../../service/meals/meals.service';
import { MealCategory, SERVER_FOR_UPLOAD, ItemCategory } from './../../../../global';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { Item_Drive } from 'src/app/model/Model/Item_Drive';
import { UploadComponent } from 'src/app/shared/upload/upload.component';

@Component({
  selector: 'app-meats-create-modal',
  templateUrl: './meats-create-modal.component.html',
  styleUrls: ['./meats-create-modal.component.css']
})
export class MeatsCreateModalComponent implements OnInit {

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
  meatMeals: Item_Drive
  small_pleasures_type : string[]

  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(UploadComponent) upload_c: UploadComponent;

  formMeats: FormGroup
  constructor(private fb: FormBuilder, private mealsService: MealsService,private httpClient: HttpClient) {
  }

  ngOnInit(): void {

    this.createForm()
    this.httpClient.get<any>('./assets/conf/config.json').subscribe(res=>{
      console.log(res)
      localStorage.setItem("conf", JSON.stringify(res))
      this.small_pleasures_type =  res.small_pleasures_type
    });

  }


  createForm(meal:Item_Drive= null){
    this.meatMeals =meal
    this.formMeats = this.fb.group({});
    this.formMeats.addControl('name', new FormControl(meal ? meal.name: ''));
    this.formMeats.addControl('quantity', new FormControl(meal ? meal.quantity: ''));
    this.formMeats.addControl('price', new FormControl(meal ? meal.price: '', Validators.required));
    this.formMeats.addControl('category', new FormControl(meal ? meal.category :'0', Validators.required));
    this.formMeats.addControl('sub_category', new FormControl(meal ? meal.sub_category :'0', Validators.required));
    this.formMeats.addControl('src', new FormControl(meal ? meal.src: '', Validators.required));
    this.formMeats.addControl('description', new FormControl(meal ? meal.description: '', Validators.required));
    // this.attach_ad = {file_name : ad && ad.image}
    if(this.upload_c){
      this.upload_c.uploads_datas = meal && [{file_name : meal && SERVER_FOR_UPLOAD + meal.src}]
      console.log(this.upload_c.uploads_datas)
      this.upload_c.init()
    }
    console.log('form meats ',this.formMeats.value)
    this.formMeats.addControl('is_station', new FormControl(false));
    this.formMeats.addControl('type', new FormControl('0'));
  }
  onSumit(){
    console.log(this.formMeats.value)
    // return
    if(this.formMeats.valid){
      this.loading = true
      if(!this.meatMeals){
        this.mealsService.post(this.formMeats.value).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.loading =false
          this.toast_c.open('Be Somewhere', 'le peti plasir '+ p.name + 'à été ajoutée')
        })
      }
      else{
        this.mealsService.update(this.formMeats.value,this.meatMeals.id).subscribe(p =>{
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
      if(this.formMeats.get('src').value === "")
        this.toast_c.open("Be Somewhere", "L'image n'a pas encore été Uploader")
      else
        this.toast_c.open("Be Somewhere", "vérifiez la validité des champs !")
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  file_deleted(e){
    this.formMeats.get('src').setValue('')
    console.log(e.file_name)
  }
  file_uploaded(e){
    this.formMeats.get('src').setValue(e.file_name)
    console.log(e.file_name)
    console.log(this.formMeats.get('src').value)
  }
  can_screen_sub(){
    // console.log(this.formMeats.get('category').value + '=== ' +this.itemCategory.Meal.toString() , ' ', parseInt(this.formMeats.get('category').value) === parseInt(this.itemCategory.Meal.toString()))
    return parseInt(this.formMeats.get('category').value) === parseInt(this.itemCategory.Meal.toString())
  }
}
