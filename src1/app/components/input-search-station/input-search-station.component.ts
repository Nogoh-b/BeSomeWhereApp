import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { CountriesService } from 'src/app/service/countries/countries.service';
import { PointService } from 'src/app/service/point/point.service';


@Component({
  selector: 'app-input-search-station',
  templateUrl: './input-search-station.component.html',
  styleUrls: ['./input-search-station.component.css']
})
export class InputSearchStationComponent implements OnInit {
  countries : any[] = []
  cities : any[] = []
  addresses : Point[] = []
  currentCity: any
  currentCountry: any
  city: string = ""
  country:string = ""
  address:string = ""
  currentAdress: Point
  countryIsvalid = true
  cityIsvalid = true
  addressIsvalid = true
  points : Point[]

  @Input() station : Point;
  @Output() onStationChoose  = new EventEmitter<Point>()


  constructor(private countriesService: CountriesService,public pointService : PointService) { }

  ngOnInit(): void {


    if(this.station){
      this.city = this.station.city
      this.country = this.station.country
      this.address = this.station.address
    }

   /* this.countriesService.getCountry().subscribe(result =>{
      console.log(this.station)
      this.countries = result
      if(this.station && this.station.id){
        this.currentCountry = this.countries.filter(result =>{
          let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
          return countryName  === this.station.country.toLowerCase()
        })[0]
        console.log(this.currentCountry)
      }
    })
    this.countriesService.getCities().subscribe(result =>{
      // console.log(result)
      this.cities = result
      if(this.station && this.station.id){
        this.currentCity = this.cities.filter(result =>{
          let cityName = result.name.toLowerCase()
          return cityName  === this.station.city.toLowerCase()
        })[0]
        console.log(this.currentCity)
      }
    })*/
    this.pointService.get({is_station: 1}).subscribe(points =>{
      this.points = points
      for (const point of points) {
        this.countries.push(point.country)
        // this.cities.push(point.city)
        // this.countries.push(point.address)
      }
      this.countries = [...new Set(this.countries)];
      this.countries.sort()
      // this.cities = [...new Set(this.cities)];
      // this.cities.sort()
      // this.init(this.station)
      console.log('points ', this.points)
     })
  }


  init(station: Point){
    // alert(JSON.stringify(station))
    const intervalId = setInterval(() => {
      if (this.points && this.points.length > 0) {
        clearInterval(intervalId); // Arrête l'intervalle une fois que la condition est remplie
    
        if (!station) {
          return;
        }
    
        console.log(station);
        this.station = station;
        this.country = station.country ? station.country : '';
        this.city = station.city ? station.city : '';
        this.address = station.country ? JSON.stringify(station) : '';
    
        if (this.points && station && station.country) {
          this.countrySelected({ target: { value: station.country } }, this.city);
          this.citySelected({ target: { value: station.city } }, this.address);
        }
    
        console.log(this.city, '  ', this.country, ' ', this.address);
        console.log(this.cities, '  ', this.countries, ' ', this.addresses);
      }
    }, 1000); // Vérifie toutes les secondes (1000 millisecondes)
    
  }
  //@ts-ignore
  getCities(iso2){
    // return this.countries
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

  //@ts-ignore
  getAddress(iso2:any = null){
    if(this.points && this.currentCity){
      // console.log('this.currentCountry.iso2 ',this.currentCountry)
      return this.points.filter(result =>{
      // let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
      return result.city.toLowerCase() === this.city.toLowerCase() && result.is_station && result.country.toLowerCase() === this.country.toLowerCase()
      })
    }
  }

  countrySelected(c, value = "") {
    console.clear()
    if (!this.points || !c.target.value) {
      return;
    }
    console.log('country selected')
  
    const selectedCountry = c.target.value.toLowerCase();
    const matchingPoints = this.points.filter(result => result.country.toLowerCase() === selectedCountry);
  
    this.countryIsvalid = matchingPoints.length > 0;
  
    if (matchingPoints.length > 0) {
      this.cities = [...new Set(matchingPoints.map(point => point.city))].sort();
      this.city = value || "";
      this.address = !value ? "" : this.address; // Only clear address if value is empty
      console.log(this.cities);
    } else {
      // Handle the case when no matching points are found
      this.city = "";
      this.countryIsvalid = true;
    }
  }
  

  citySelected(c, value = "") {
    const inputValue = c.target.value.toLowerCase();
    
    if (!inputValue) {
      this.addresses = [];
      this.cityIsvalid = false;
      this.currentCity = null;
      this.address = '';
      this.currentAdress = null;
      return;
    }
  
    const matchingPoints = this.points.filter(result => result.city.toLowerCase() === inputValue);
  
    this.addresses = matchingPoints;
    this.cityIsvalid = matchingPoints.length > 0;
  
    if (matchingPoints.length > 0) {
      this.currentCity = matchingPoints[0];
      this.currentAdress = null;
      this.address = value;
    } else {
      this.currentCity = null;
      this.address = '';
      this.currentAdress = null;
    }
    console.log('iiiiii ', matchingPoints);
    console.log('villlllllle ', this.address);
  }
  

  addressSelected(c){

    // const i = this.points.filter(result =>{
      //   let cityName = result.address.toLowerCase()
      //   return cityName  === c.target.value.toLowerCase()
    // })
    // console.log(i)
    // this.addressIsvalid = i.length > 0
    if(this.address != ""){
      this.currentAdress = JSON.parse(this.address)
      // console.log(this.currentCountry.iso2)
      // alert(c.target.value)
      this.onStationChoose.emit(this.currentAdress)
    }

  }

  toString(data){
    return JSON.stringify(data)
  }


}
