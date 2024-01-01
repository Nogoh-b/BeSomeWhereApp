import { SERVER_FOR_UPLOAD } from './../../../../global';
import { UploadComponent } from './../../../shared/upload/upload.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapService } from './../../../service/map/map.service';
import { CountriesService } from './../../../service/countries/countries.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ads } from 'src/app/model/Model/Ads';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { AdsService } from 'src/app/service/ads/ads.service';
@Component({
  selector: 'app-modal-ads-c-u',
  templateUrl: './modal-ads-c-u.component.html',
  styleUrls: ['./modal-ads-c-u.component.css']
})
export class ModalAdsCUComponent implements OnInit {

  id:string
  ad: Ads

  countries : any[]
  cities : any[]
  ads : any []
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
  attach_ad: any
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(UploadComponent) upload_c: UploadComponent;

  formAds: FormGroup
  constructor(private fb: FormBuilder, private adService: AdsService ,private countriesService: CountriesService, private mapService: MapService, private route:ActivatedRoute) {


  }

  ngOnInit(): void {

      this.createForm()

  }


  createForm(ad?: Ads){
    this.ad = ad
    this.attach_ad = {file_name : ad && ad.image}
    this.formAds = this.fb.group({});
    this.formAds.addControl('title', new FormControl(ad && ad.title));
    this.formAds.addControl('description', new FormControl(ad && ad.description));
    this.formAds.addControl('link', new FormControl(ad && ad.link, Validators.required));
    this.formAds.addControl('image', new FormControl(ad && ad.image, Validators.required));
    if(this.upload_c){
      this.upload_c.uploads_datas = ad && [this.attach_ad]
      this.upload_c.init()
    }
  }
  onSumit(){
    console.log(this.formAds.value)
    if(this.formAds.valid){
      this.loading = true
      let ad: Ads = this.formAds.value


      console.log(ad);
      // return
      if(this.ad){
        this.adService.update(ad, this.ad.id).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.close()
          this.toast_c.open('Be Somewhere', 'la publicité '+ p.id + ' à été Mis à jour')
        })
      }else{
        this.adService.post(ad).subscribe(p =>{
          console.log(p, ' à été enregistré')
          this.close()
          this.toast_c.open('Be Somewhere', 'la publicité '+ p.id + ' à été ajoutée')
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
    this.formAds.get('image').setValue(SERVER_FOR_UPLOAD+ f.file_name)
    console.log(this.formAds.get('image').value)
  }

  file_deleted(f){
    this.formAds.get('image').setValue('')
    console.log(this.formAds.get('image').value)
  }
}
