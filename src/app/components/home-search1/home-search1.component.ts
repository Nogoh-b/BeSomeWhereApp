import { ToastComponent } from './../../shared/toast/toast.component';
import { MapService } from './../../service/map/map.service';
import { DriveService } from './../../service/drive/drive.service';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { Router } from '@angular/router';
import { PointService } from 'src/app/service/point/point.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputSearchStationComponent } from '../input-search-station/input-search-station.component';

@Component({
  selector: 'app-home-search1',
  templateUrl: './home-search1.component.html',
  styleUrls: ['./home-search1.component.css']
})
export class HomeSearch1Component implements AfterViewInit {
  @Input() screen_all = true;
  @Input() switched = false;
  @Input() date = "";
  @Input() pointA: Point
  @Input() pointB: Point

  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(InputSearchStationComponent) station_c: InputSearchStationComponent;
  @ViewChild('label1') label1 ;
  @ViewChild('label2') label2;
  @ViewChild('date_') date_element: ElementRef;
  @Output() points_retreived = new EventEmitter<Point[]>();
  @Output() on_search = new EventEmitter<any>();

  @Input() address : string;
  @Input() station : Point;
  @Input() class_ : string = 'bg-white container p-lg-0 p-lg-5 pb-4 pe-3 ps-3 pt-4 shadow-none align-items-center flex-column d-flex justify-content-between ';

  //for form
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private driveService: DriveService, private route: Router, private mapService: MapService,public pointService : PointService) { }

  ngAfterViewInit(): void {



    if(this.pointB){
      this.label2.value = this.pointB.address+ ' , '+this.pointB.city+ ' , '+ this.pointB.country
    }
    if (this.pointA) {
      this.label1.value = this.pointA.address+ ' , '+this.pointA.city+ ' , '+ this.pointA.country
    }

      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, {
        // validator: MustMatch('password', 'confirmPassword')
    });

  }
  init(station: Point){
    // alert(JSON.stringify(station))
    this.station = station
    this.station_c.init(station)
  }

  switch_(s : boolean){
    // alert(this.label1.);
    this.switched = !this.switched;
    setTimeout(() => {
      this.init(this.station)
    }, 1);
    return
    const t = this.label2.value;
    this.label2.value =this.label1.value;
    this.label1.value =t;
    console.log('point A and B ', this.pointA, this.pointB)

    //  alert(JSON.stringify(this.pointA));
    //  alert(this.label1.value);
  }

  searchDrive(){
     let start0 = this.switched ? this.pointB.longitude+','+this.pointB.lattitude : this.pointA.longitude+','+this.pointA.lattitude
     let origin = this.switched ? {longitude:this.pointB.longitude, lattitude:this.pointB.lattitude} : {longitude:this.pointA.longitude, lattitude:this.pointA.lattitude} 
     this.pointService.get({status: 0}).subscribe(points =>{
       console.log('pointsAuxAllentours ', points)

      //  console.log('startPoint ', start0)
       let destinations: string[] = [];
       points.forEach(point => {
         destinations.push(point.longitude+','+point.lattitude)
        });
        this.mapService.getMatrix({start0,destinations}).subscribe(result =>{
          console.log('Matrix ',result.response.matrixEntry);
          let arroundPoints: Point[]  = [];
          for (let index = 0; index < points.length; index++) {
            let point = points[index]
            if(result.response.matrixEntry[index].summary && result.response.matrixEntry[index].summary.distance  > 0){
              point.distance = result.response.matrixEntry[index].summary.distance / 1000  ;
              arroundPoints.push(point);
            }
          }
          console.log('Points ',arroundPoints);

        })
      })

  }

  btnclicked(){
    // let station_p = this.switched ? this.pointA : this.pointB

    const date1 = new Date(this.date);
    const date2 = new Date();
    // alert(this.date)
    if(this.date === '' || !this.date){
      this.toast_c.open('Be Somewhere', 'You_must_fill_date', 3000)
      return
    }
    if( date1.toISOString().split('T')[0] < date2.toISOString().split('T')[0]){
      this.toast_c.open('Be Somewhere', 'past_departure_date_message', 3000)
      return
    }
    if(!this.address || this.address === '' ){
      this.toast_c.open('Be Somewhere', 'You_must_fill_address', 3000)
      return
    }
    // alert(JSON.stringify(this.station))// 👈 null and undefined check
    if(!this.station || (this.station
    && Object.keys(this.station).length === 0 || (this.station && !this.station.id))){
      this.toast_c.open('Be Somewhere', 'You_must_fill_station', 3000)
      return
    } 


    // console.log('point A and B ', this.pointA.id, this.pointB.id)
    this.mapService.search({q: this.address}).subscribe(result =>{
      console.log(result)
      if(this.mapService.transformResponse(result).items.length === 0){
      this.toast_c.open('Be Somewhere', 'invalid_address', 3000)
      return
      }
      let point = new Point()
      point.address = this.address
      point.lattitude = this.mapService.transformResponse(result).items[0].position.lat
      point.longitude = this.mapService.transformResponse(result).items[0].position.lng
      point.country = this.mapService.transformResponse(result).items[0].address.countryName
      this.on_search.emit(this.address)
      this.searchAroundPoints(point, this.station)
    })
    return
    // vérifier si l'adresse existe dans la base de donnée puis dans le her map au cas ou
    let index =  0
    let point = new Point()
    this.pointService.get({search : this.getText(index)}).subscribe(result =>{
      console.log('point!!! ', point)
      if(result.length === 1){
        console.log('point trouvé ', this.getText(index) , result[0])
        this.pointA = result[0]
        this.searchAroundPoints(this.pointA, this.pointB)
      }
      else{
        console.log('point non trouvé ', this.getText(index))
        this.mapService.search({q : this.getText(index) }).subscribe(result =>{
          if(result.items.length > 0){
            console.log(result.items[0])
            this.pointA.lattitude = result.items[0].position.lat
            this.pointA.longitude = result.items[0].position.lng
            this.searchAroundPoints(this.pointA, this.pointB)

          }
          else{
            this.toast_c.open('Be Somewhere', 'Point Non valide',3500)
          }
        })
      }

    })
  }

  searchAroundPoints(pointA: Point, pointB: Point){
    console.log('searchAroundPoints')
    if(!pointA || !pointB)
      return
    if(this.route.url.includes('/trajet')){
      // let start0 = this.switched ? pointB.longitude+','+pointB.lattitude : pointA.longitude+','+pointA.lattitude
      let start0 = [pointA.longitude ,pointA.lattitude]



      this.pointService.get({ all: true, status: 0}).subscribe(points =>{
        let destinations: [number, number][] = [];
       console.log('pointsAuxAllentours ', points)
       points = points.filter(point => {return !point.is_station})
       console.log('pointsAuxAllentours1 ', points)
       points = this.getClosestPoints(points,origin,25)

       console.log('startPointb',points)
      //  destinations.push([points[0].longitude,points[0].lattitude])
       console.log('startPoint ', start0, ' ')
       points.forEach(point => {
            destinations.push([point.longitude,point.lattitude])
        });
        console.log('points ', points,' dest ',destinations)
       this.mapService.getMatrix({start0,destinations}).subscribe(result1 =>{
          console.log('Matrix ',result1);
          
          const durations = result1.durations[0]
          const result = result1.destinations
          console.log('Matrix_Durations ', durations);
         let arroundPoints: Point[]  = [];
         for (let index = 1; index < points.length + 1 ; index++) {
           let point = points[index - 1]
           console.log('Durations ',durations[index],' ', point.title );
           if(durations[index] != null){
            //  point.distance = result[index].distance   ;
             point.distance = durations[index]   ;
             arroundPoints.push(point);

           }
         }
         console.log('Points ',arroundPoints);
         arroundPoints = arroundPoints.sort((point1,point2) => point1.distance - point2.distance);
        //  this.points_retreived.emit(points);
         this.points_retreived.emit(arroundPoints);

       })
      })
    }
    else{
      this.route.navigate(['trajets/creation/1'], {state:{station: this.station}, queryParams: {address: this.address, station: this.station.id, s : this.switched, pointA: this.pointA, pointB: this.pointB, date: this.date}})
    }
  }


  getText(i){
    if(this.label1)
      console.log(this.label1.value )
    if(i === 0){
      return this.pointA ? this.pointA.address+ ' '+this.pointA.city+ ' '+ this.pointA.country : ''
    }
    return this.pointB ? this.pointB.address+ ' '+this.pointB.city+ ' '+ this.pointB.country : ''
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

change(val){
  console.log(val)
}
  addressChoose(address){
    console.log(address)
    this.address = address
  }
  stationChoose(point){
    console.log(point)
    this.station = point
  }


  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
}

  getClosestPoints(points: Point[], origin: any, count: number = 25): Point[] {
    const distances = points.map(point => ({
        point,
        distance: this.haversineDistance(origin.lattitude, origin.longitude, point.lattitude, point.longitude)
    }));

    distances.sort((a, b) => a.distance - b.distance);

    return distances.slice(0, count).map(item => item.point);
}


}

