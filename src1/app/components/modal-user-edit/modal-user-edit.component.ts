import { SERVER_FOR_UPLOAD } from './../../../global';
import { DatePipe } from '@angular/common';
import { ToastComponent } from './../../shared/toast/toast.component';
import { UserService } from 'src/app/service/user/user.service';
import { CountriesService } from 'src/app/service/countries/countries.service';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/model/Model/Utilisateur';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
declare let bootstrap: any;

@Component({
  selector: 'app-modal-user-edit',
  templateUrl: './modal-user-edit.component.html',
  styleUrls: ['./modal-user-edit.component.css']
})
export class ModalUserEditComponent implements OnInit {
  @Input() user: User
  countries: any[]
  currentCountry: any
  currentCity: any
  cities: any[]
  loading = false
  formUser: FormGroup
  @Output() profil_updated = new EventEmitter<User>();
  @ViewChild(ToastComponent) toas_c : ToastComponent
  constructor(private userServiceFireBase: UserServiceFireBase,
     private fb: FormBuilder,
      private datepipe: DatePipe,
     private userService: UserService,
     private countriesService :CountriesService) { }

  ngOnInit(): void {
    console.log('user edit user ' , this.user)

    var myModal = new bootstrap.Modal(document.getElementById('modal1'));
    console.log(myModal)
    myModal._element.addEventListener('shown.bs.modal', function (e) {
      // alert("fffff")
      // do something...
    });
    myModal._element.addEventListener('hidden.bs.modal', function (e) {
        // do something...
        // alert("fffff")
    });
    this.createForm()
    this.countriesService.getCountry().subscribe(countries =>{
      this.countries = countries
    })
    this.countriesService.getCities().subscribe(cities =>{
      this.cities = cities
    })
    setTimeout(() => {
      console.log('user edit user ' , this.user)
    }, 2000);
  }
  createForm(){
    this.formUser = this.fb.group({});
    this.formUser.addControl('name', new FormControl(this.user.name, Validators.required));
    this.formUser.addControl('first_name', new FormControl(this.user.first_name, Validators.required));
    this.formUser.addControl('last_name', new FormControl(this.user.last_name, Validators.required));
    this.formUser.addControl('email', new FormControl(this.user.email, Validators.required));
    this.formUser.addControl('country', new FormControl(this.user.country, Validators.required));
    this.formUser.addControl('city', new FormControl(this.user.city, Validators.required));
    this.formUser.addControl('address', new FormControl(this.user.address, Validators.required));
    this.formUser.addControl('phone', new FormControl(this.user.phone, Validators.required));
    this.formUser.addControl('image', new FormControl(this.user.image, Validators.required));
    this.formUser.addControl('birthday', new FormControl(this.formatDateOrToday() , Validators.required));
    this.formUser.addControl('gender', new FormControl(this.user.gender.toString(), Validators.required));
    this.formUser.addControl('longitude', new FormControl(this.user.longitude));
    this.formUser.addControl('lattitude', new FormControl(this.user.lattitude));
  }

  getImage(d){
    this.formUser.get('image').setValue(SERVER_FOR_UPLOAD+d.file_name)
    this.onSubmit(true)
  }
  formatDateOrToday(): string {
    if (this.user && this.user.birthday) {
      // Essayez de parser la date de naissance
      const birthdayDate = new Date(this.user.birthday);

      if (!isNaN(birthdayDate.getTime())) {
        // La date de naissance est valide, formatez-la
        return this.datepipe.transform(birthdayDate, 'yyyy-MM-dd') || '';
      }
    }
    
    // Si la date de naissance est invalide ou non définie, renvoyez la date actuelle formatée
    const currentDate = new Date();
    return this.datepipe.transform(currentDate, 'yyyy-MM-dd') || '';
  }
        //@ts-ignore
  getCities(iso2){
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
    if(i.length > 0){
      this.currentCountry = i[0]

      console.log(this.currentCountry.iso2)
    }
  }
  citySelected(c){
    const i = this.cities.filter(result =>{
      let cityName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
      return cityName  === c.target.value.toLowerCase()
    })

    if(i.length > 0){
      this.currentCity = i[0]
    this.formUser.get('longitude').setValue(this.currentCity.longitude)
    this.formUser.get('lattitude').setValue(this.currentCity.latitude)

      console.log(this.currentCity.iso2)
    }
  }

  onSubmit(fr ?: boolean){
    this.loading = true
    console.log('utilisateur mis à jour ', this.formUser.value,)
    // return
    this.userService.update(this.formUser.value, this.user.id).subscribe(result =>{
      console.log('utilisateur mis à jour ', result)
      this.user = result
      setTimeout(() => {
        this.userServiceFireBase.updateCurrentUser(result)
        this.profil_updated.emit(this.userServiceFireBase.getCurrentUser())
        if(!fr){
          var c_b = document.getElementById("close_btn")
          c_b?.click()
          // window.location.reload()
        }
      }, 2000);


      this.toas_c.open("Be Somewhere", "Profil Mis à jour")
      this.loading = false
    })
  }


}
