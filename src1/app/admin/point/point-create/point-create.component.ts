import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PointService } from './../../../service/point/point.service';
import { ActivatedRoute } from '@angular/router';
import { MapService } from './../../../service/map/map.service';
import { CountriesService } from './../../../service/countries/countries.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-point-create',
  templateUrl: './point-create.component.html',
  styleUrls: ['./point-create.component.css']
})
export class PointCreateComponent implements OnInit {

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

  @ViewChild(ToastComponent) toast_c: ToastComponent;

  formPoint: FormGroup
  constructor(private fb: FormBuilder, private pointService: PointService ,private countriesService: CountriesService, private mapService: MapService, private route:ActivatedRoute) {


  }

  ngOnInit(): void {

    this.createForm()
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
    this.pointService.getPoint(this.id).subscribe(point =>{
      console.log(point)
      this.point = point

      this.countriesService.getCountry().subscribe(countries =>{
        this.countries = countries

      })

      this.countriesService.getCities().subscribe(cities =>{
        this.cities = cities

      })
      this.createForm()
    })
  }
  countrySelected(c){
    const i = this.countries.filter(result =>{
      let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
      return countryName  === c.target.value.toLowerCase()
    })
    // console.log(i)
    this.countryIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCountry = i[0]
      // this.currentCity = null
      // this.city = ''
      // console.log(this.currentCountry.iso2)
    }
    else{
      this.currentCountry = null
      /*this.currentCity = null
      this.currentAdress = null
      this.city = ''
      this.cityIsvalid = true*/
    }
  }
  citySelected(c){
    const i = this.cities.filter(result =>{
      let cityName = result.name.toLowerCase()
      return cityName  === c.target.value.toLowerCase()
    })
    // console.log(i)
    this.cityIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCity = i[0]
      // this.currentAdress = null
      this.address = ''
      // console.log(this.currentCountry.iso2)
    }
    else{
      this.currentCity = null
      // this.address = ''
      // this.currentAdress = null
    }
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
  textInput(e){
    setTimeout(() => {
      this.mapService.search({q:e.target.value + ' '+ this.formPoint.value.city}).subscribe(points =>{
        this.points = points.items
        console.log(points.items)
      })
    }, 1000);
  }
  textChange(e){
    this.addressIsvalid = this.currentAddress != undefined
  }
  addressSelected(c){
    // this.currentAddress = this.points[c]
    // alert('this.points[c]')
    // return
    let adrs= this.points.filter(result =>{
      return result.title.toLowerCase()  === c.target.value.toLowerCase()
    })
    this.addressIsvalid = adrs.length > 0
    if(adrs.length > 0){
      this.currentAddress = adrs[0]
    }
    else{
    }
  }

  createForm(){
    this.formPoint = this.fb.group({});
    this.formPoint.addControl('title', new FormControl(''));
    this.formPoint.addControl('description', new FormControl(''));
    this.formPoint.addControl('country', new FormControl('', Validators.required));
    this.formPoint.addControl('city', new FormControl('', Validators.required));
    this.formPoint.addControl('address', new FormControl('', Validators.required));
    this.formPoint.addControl('is_station', new FormControl(false, Validators.required));
    this.formPoint.addControl('type', new FormControl('0', Validators.required));
  }
  onSumit(){
    if(this.currentCountry && this.currentCity && this.currentAddress){
      this.loading = true
      let point: Point = this.formPoint.value
      let adr: string = this.formPoint.value.address
      adr = adr.replace(', '+this.formPoint.value.city,'')
      // adr.replace(' '+this.formPoint.value.city,'')
      adr = adr.replace(', '+ this.capitalizeFirstLetter(this.formPoint.value.country) ,'')
      adr = adr.replace(' '+ this.capitalizeFirstLetter(this.formPoint.value.country),'')
      this.formPoint.value.address = adr
      console.log(', '+this.formPoint.value.country.toUpperCase() , ' ', this.formPoint.value.address)

      point.lattitude = this.currentAddress.position.lat
      point.longitude = this.currentAddress.position.lng
      console.log(point);
      // return
      this.pointService.post(point).subscribe(p =>{
        console.log(p, ' à été enregistré')
        this.loading =false
        this.toast_c.open('Be Somewhere', 'l\'adresse '+ p.address + 'à été ajoutée')
      })
    }
    else{
      this.toast_c.open("Be Somewhere", "vérifiez la validité des champs !")
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
