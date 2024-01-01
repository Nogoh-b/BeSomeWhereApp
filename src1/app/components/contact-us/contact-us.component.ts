import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { ContactService } from 'src/app/service/contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/service/countries/countries.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private countriesService: CountriesService, private userServiceFireBase: UserServiceFireBase, private fb: FormBuilder, private contactService: ContactService) { }
  countries : any[]
  cities : any[]
  currentCity: any
  currentCountry: any
  countryIsvalid = true
  city: string
  country:string
  conf = JSON.parse(localStorage.getItem("conf"))
  contactForm : FormGroup
  loading = false
  price = 0
  ngOnInit(): void {
    this.countriesService.getCountry().subscribe(result =>{
      this.countries = result
      console.log(this.currentCountry)
    })
    this.countriesService.getCities().subscribe(result =>{
      this.cities = result
        console.log( this.cities)
    })
    this.createForm()
  }

  createForm(){
    this.contactForm = this.fb.group({})
    this.contactForm.addControl('country', new FormControl('France',Validators.required))
    this.contactForm.addControl('city', new FormControl('Paris',Validators.required))
    this.contactForm.addControl('type_contact', new FormControl('Chat',Validators.required))
    this.contactForm.addControl('language', new FormControl('Francais',Validators.required))
    this.contactForm.addControl('time', new FormControl('1',Validators.required))
    this.contactForm.addControl('plan', new FormControl('Mensuel',Validators.required))
    this.contactForm.addControl('begin_date', new FormControl('2022-12-30',Validators.required))
    this.contactForm.addControl('price', new FormControl('1',Validators.required))
    this.contactForm.addControl('user_id', new FormControl(this.userServiceFireBase.getCurrentUser()?.id,Validators.required))
    /*this.contactForm.addControl('country', new FormControl('',Validators.required))
    this.contactForm.addControl('city', new FormControl('',Validators.required))
    this.contactForm.addControl('type_contact', new FormControl('-1',Validators.required))
    this.contactForm.addControl('language', new FormControl('',Validators.required))
    this.contactForm.addControl('time', new FormControl('-1',Validators.required))
    this.contactForm.addControl('plan', new FormControl('-1',Validators.required))
    this.contactForm.addControl('begin_date', new FormControl('-1',Validators.required))*/
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
    this.countryIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCountry = i[0]
      this.currentCity = null
      this.city = ''
      console.log(this.currentCountry.iso2)
      console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii ', i[0])
    }
    else{
      // this.currentCountry = null
      this.currentCity = null
    }
  }

  onSubmit(){
    this.loading = true
    this.contactForm.get('price').setValue(this.price)
    console.log(this.contactForm.value)
    document.getElementById("close_btn").click()
    // this.contactForm.reset()
    // return
    this.contactService.post(this.contactForm.value).subscribe(r =>{
      document.getElementById("close_btn").click()
      console.log(r)
      this.loading = false
    })
  }
  //@ts-ignore
  setName(){
    if(this.contactForm.get("time").value === "-1")
      return ""
    if(this.contactForm.get("plan").value === "Journalier")
      return "( Jours )"
    if(this.contactForm.get("plan").value === "Hebdomadaire")
      return "(Semaine)"
    if(this.contactForm.get("plan").value === "Mensuel")
      return "( Mois )"

  }

  //@ts-ignore
  getDuree(){
    if(this.contactForm.get("plan").value === "Journalier")
      return [1,2,3,4,5,6,7]
    if(this.contactForm.get("plan").value === "Hebdomadaire")
      return [1,2,3,4]
    if(this.contactForm.get("plan").value === "Mensuel")
      return [1]
  }

  onPlanChange(e){
    // alert(e.target.value)
    const d = e.target.value
    if(d === "0"){
      this.price =  this.conf.price_supporte_per_day
    }
    if(d === "1"){
      this.price =  this.conf.price_supporte_per_week
    }
    if(d === "2"){
      this.price =  this.conf.price_supporte_per_month
    }
    this.contactForm.get("time").setValue("-1")
  }

  screen_price(){
    return this.price > 0 ? '( '+this.price + '€ )' : ''
  }

  getSocialNetwork(){
    return this.contactForm.get("type_contact").value === "Chat" ? "WhatsApp , Telegram , Skype , Gmail... " : "WhatsApp , Telegram , Skype , Gmail... "
  }

  time_change(){
    const t = parseInt(this.contactForm.get("time").value)
    if(this.contactForm.get("plan").value === "Journalier"){
      this.price =  this.conf.price_supporte_per_day * t
    }
    if(this.contactForm.get("plan").value  === "Hebdomadaire"){
      this.price =  this.conf.price_supporte_per_week * 7 * t
    }
    if(this.contactForm.get("plan").value  === "Mensuel"){
      this.price =  this.conf.price_supporte_per_month * 30 * t
    }
  }
}
