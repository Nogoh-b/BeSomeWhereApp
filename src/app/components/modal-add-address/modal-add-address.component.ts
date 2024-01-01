import { MapService } from 'src/app/service/map/map.service';
import { ToastComponent } from './../../shared/toast/toast.component';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/service/countries/countries.service';

@Component({
  selector: 'app-modal-add-address',
  templateUrl: './modal-add-address.component.html',
  styleUrls: ['./modal-add-address.component.css']
})
export class ModalAddAddressComponent implements OnInit {

  constructor(private mapService: MapService, private countriesService :CountriesService, private fb: FormBuilder,private userServiceFireBase: UserServiceFireBase, private userService: UserService) { }
  addressForm : FormGroup

  countries: any[]
  currentCountry: any
  currentCity: any
  cities: any[]
  loading = false
  saved= false
  @ViewChild(ToastComponent)  toast_c: ToastComponent
  ngOnInit(): void {
    this.createForm();
    this.countriesService.getCountry().subscribe(countries =>{
      this.countries = countries
    })
    this.countriesService.getCities().subscribe(cities =>{
      console.log("cityyyyyyyyyyyyyy ", cities[0])
      this.cities = cities
    })
  }
  createForm() {
    this.addressForm = this.fb.group({});
    // this.addressForm.addControl('for_disabled', new FormControl('0', Validators.required));
      this.addressForm.addControl('country', new FormControl( '', Validators.required));
      this.addressForm.addControl('city', new FormControl('', Validators.required));
      this.addressForm.addControl('address', new FormControl(''));
      this.addressForm.addControl('joined', new FormControl('0'));
      this.addressForm.addControl('lattitude', new FormControl(''));
      this.addressForm.addControl('longitude', new FormControl(''));

  }
  onSubmit(){
    if(!this.addressForm.valid){
      this.toast_c.open("Be Somewhere", "Formulaire non Valide veuillez le remplir")
      return
    }
    this.loading = true;
    console.log(this.addressForm.value)
   /* this.mapService.search({q:this.addressForm.value.address}).subscribe(result =>{
      if(result.items.length > 0){
        this.addressForm.value.lattitude = result.items[0].position.lat
        this.addressForm.value.longitude = result.items[0].position.lng
      }*/
      this.addressForm.get('joined').setValue(true)
      this.userService.update(this.addressForm.value, this.userServiceFireBase.getCurrentUser().id).subscribe(result =>{
        console.log('Utilisateur mis à jour', result)
        this.loading = false
        this.saved = true
        this.toast_c.open('Be Somewhere','Vous faite désormais parti de la comunauté')
        setTimeout(() => {
          window.location.reload()
        }, 1500);
        console.log('submit')
        this.close()
        this.userServiceFireBase.updateCurrentUser(result)
        this.setFirstresrvation()

      })
    // })
  }

  setFirstresrvation(){
    // this.is_first_reservation = false
    localStorage.setItem('first_reservation', 'true')
  }

  close(){
    var cb = document.getElementById("close_btn")
    // cb?.click()
  }
        //@ts-ignore
        getCities(iso2){
    // console.log(this.cities && this.currentCountry)
    if(this.cities && this.currentCountry){
      // console.log('this.currentCountry.iso2 ',this.currentCountry)
      let cities = this.cities.filter(result =>{
        return result.country_code === this.currentCountry.iso2
      })
      // console.log(this.cities[0].country_code +'==='+ this.currentCountry.iso2)
      // console.log(cities, ' ',this.currentCountry)
      return cities

    }
  }

  countrySelected(c){
    const i = this.countries.filter(result =>{
      let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
      return countryName  === c.target.value.toLowerCase()
    })
    // console.log(i)
    // this.countryIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCountry = i[0]
      this.addressForm.get('lattitude').setValue(this.currentCountry.latitude)
      this.addressForm.get('longitude').setValue(this.currentCountry.longitude)
     /* this.currentCity = null
      this.city = ''*/
      console.log(this.currentCountry.iso2)
    }
    else{
     /* // this.currentCountry = null
      this.currentCity = null
      this.currentAdress = null
      this.city = ''
      // this.country=''
      this.cityIsvalid = true*/
    }
  }
  citySelected(c){
    const i = this.cities.filter(result =>{
      let cityName = result.name.toLowerCase()
      return cityName  === c.target.value.toLowerCase()
    })
    // console.log(i)
    // this.cityIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCity = i[0]
      // this.currentAdress = null
      // this.address = ''
      this.addressForm.value.lattitude = this.currentCity.latitude
      this.addressForm.value.longitude = this.currentCity.longitude
      console.log(this.addressForm.value)
    }
    else{
      this.currentCity = null
      // this.address = ''
      // this.currentAdress = null
    }
  }

}
