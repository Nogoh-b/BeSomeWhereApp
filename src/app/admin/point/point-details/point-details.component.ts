import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PointService } from './../../../service/point/point.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MapService } from './../../../service/map/map.service';
import { CountriesService } from './../../../service/countries/countries.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { DataType } from 'src/global';

@Component({
  selector: 'app-point-details',
  templateUrl: './point-details.component.html',
  styleUrls: ['./point-details.component.css']
})
export class PointDetailsComponent implements OnInit {

  toolbar = ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'];
  heading = {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
  };
  config = {
    url: '/springboot/upload',
    useCkfinder: false
  };



  id:string
  point: Point
  content: string;
  tinyMceConfig: any = {
    // Configuration TinyMCE
  };
  public editorValue: string = '';
  countries : any[]
  cities : any[]
  points : any []
  countryIsvalid = true
  cityIsvalid = true
  addressIsvalid = true
  loading1= false
  loading2= false
  country: string
  city: string
  address: string
  currentCountry: any
  currentAddress: any
  currentCity: any

  formPoint: FormGroup
  formPointAround: FormGroup

  data_to_del: any
  dataType = DataType.Point
  @ViewChild(ToastComponent) toast_c: ToastComponent;

  constructor(private fb: FormBuilder,
     private pointService: PointService ,
     private countriesService: CountriesService,
     private router: Router ,
     private mapService: MapService,
     private route:ActivatedRoute) {

    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
    this.pointService.getPoint(this.id, {all: true}).subscribe(point =>{
      console.log('mon point ',point)
      this.point = point
      this.currentAddress = point
      this.currentAddress.position = {lat : point.lattitude, lng: point.longitude}

      // this.currentAddress.title = point.address

      this.countriesService.getCountry().subscribe(countries =>{
        this.countries = countries
        if(this.point){
          this.currentCountry = this.countries.filter(result =>{
            let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
            return countryName  === this.point.country.toLowerCase()
          })[0]
          console.log('this.currentCountry ', this.currentCountry)
        }
      })

      this.countriesService.getCities().subscribe(cities =>{
        this.cities = cities
        if(this.point){
          this.currentCity = this.cities.filter(result =>{
            let cityName = result.name.toLowerCase()
            return cityName  === this.point.city.toLowerCase()
          })[0]
          console.log(this.currentCity)
        }
      })
      this.createForm()
    })

  }

  ngOnInit(): void {
    this.createForm()
  }
  logSelection(e){
    console.log(e)
  }
  logChange(e){
    console.log(e)
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
        this.points = this.mapService.transformResponse(points).items
        console.log(        this.points = this.mapService.transformResponse(points).items
      )
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
      return result?.address?.label?.toLowerCase()  === c.target.value.toLowerCase()
    })
    console.log('okkkkkk11 ',adrs)

    this.addressIsvalid = adrs.length > 0
    if(adrs.length > 0){
      this.currentAddress = adrs[0]
      this.currentCity = 'city'
      this.currentCountry = 'country'
    }
    else{
    }
  }

  createForm(){
    this.formPoint = this.fb.group({});
    this.formPoint.addControl('title', new FormControl(this.point ? this.point.title : 'd'));
    this.formPoint.addControl('description', new FormControl(this.point ? this.point.description : 'd'));
    this.formPoint.addControl('country', new FormControl(this.point ? this.point.country : 'C', Validators.required));
    this.formPoint.addControl('city', new FormControl(this.point ? this.point.city : 'C', Validators.required));
    this.formPoint.addControl('address', new FormControl(this.point ? this.point.address : '', Validators.required));
    this.formPoint.addControl('type', new FormControl(this.point ? this.point.type : '', Validators.required));
    this.formPoint.addControl('is_station', new FormControl(this.point ? this.point.is_station : '', Validators.required));

    this.formPointAround = this.fb.group({});
    this.formPointAround.addControl('title', new FormControl(''));
    this.formPointAround.addControl('code', new FormControl('', Validators.required));
    this.formPointAround.addControl('parent', new FormControl(this.point ? this.point.id : '0', Validators.required));
    this.formPointAround.addControl('type', new FormControl('1', Validators.required));
  }
  onSumit(){
    console.log(this.currentCountry +' && '+ this.currentCity +' && '+ this.currentAddress)
    if(this.addressIsvalid){
      this.loading1 = true
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
      this.pointService.update(point, this.point.id).subscribe(p =>{
        console.log(p, ' à été enregistré')
        this.loading1 =  false
        this.toast_c.open('Be Somewhere', 'l\'adresse '+ p.address +  ' à été mise à jour')
      })
    }else{
      this.toast_c.open("Be Somewhere", "vérifiez la validité des champs avant de pouvoir enregistrer !")
    }
  }
  onSumit1(){
    if( this.currentAddress){
      this.loading2 = true
      let point: Point = this.formPointAround.value
      point.city = this.point.city
      point.country= this.point.country
      point.address= this.point.address

      // let adr: string = this.formPointAround.value.address
      // adr = adr.replace(', '+this.formPointAround.value.city,'')
      // // adr.replace(' '+this.formPointAround.value.city,'')
      // adr = adr.replace(', '+ this.capitalizeFirstLetter(this.formPointAround.value.country) ,'')
      // adr = adr.replace(' '+ this.capitalizeFirstLetter(this.formPointAround.value.country),'')
      // this.formPointAround.value.address = adr
      // console.log(', '+this.formPointAround.value.country.toUpperCase() , ' ', this.formPointAround.value.address)

      // point.lattitude = this.currentAddress.position.lat
      // point.longitude = this.currentAddress.position.lng
      console.log(point);
      // return
      this.pointService.post(point).subscribe(p =>{
        console.log(p, ' à été enregistré')
        this.loading2 =  false
        this.point.arround.push(p)
        this.toast_c.open('Be Somewhere', 'le point '+ p.address +  ' à été mise à jour')
      })
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  onFileDeleted(e){
    console.log(e)
    this.toast_c.open("Be Somewhere", 'Points(s) Suprimé(s)')
    if(e[0].parent === 0 || !e[0].parent){
      setTimeout(() => {
        this.router.navigateByUrl('points')
      }, 1500);
    }else{

      for (let index = 0; index < this.point.arround.length; index++) {
        const element = this.point.arround[index];
        if(element.id === e[0].id){
            // alert(point.id)
            this.point.arround.splice(index,1)
          }
      }
    }
  }
}

