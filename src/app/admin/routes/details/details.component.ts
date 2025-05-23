import { PointService } from './../../../service/point/point.service';
import { Drive_Base } from './../../../model/Model/Drive_Base';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouteService } from 'src/app/service/route/route.service';
import { DataType, TrajetCardStatus, total_take_at_homr } from './../../../../global';
import { Item_Drive } from './../../../model/Model/Item_Drive';
import { PassengerService } from './../../../service/passenger/passenger.service';
import { ReservationService } from './../../../service/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Passenger } from 'src/app/model/Model/Passenger';
import { Route } from 'src/app/model/Model/Route';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { DriveBaseService } from 'src/app/service/drive-base.service';
import { Point } from 'src/app/model/Model/Point';
declare  var $:  any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  reservation: Reservation
  drive: Drive_Base
  routes: Route[]
  points: Point[]
  passengers: Passenger[]
  items: Item_Drive[]
  globals  = TrajetCardStatus.Created
  total_cash_pay =  0
  formGroupRoute : FormGroup
  formGroupDrive : FormGroup
  data_to_del: any
  currentRoute: Route
  dataType = DataType.Point
  dataTypeDrive = DataType.Drive_Base
  dataTypeRoute = DataType.Route
  loading1= false
  loading2= false
  take_at_home_price = JSON.parse(localStorage.getItem('conf')).price_take_to_home
  total_take_at_home_total
  //v
  address1Isvalid = true
  point1: Point

  @ViewChild(ToastComponent) toast_c : ToastComponent

  constructor(private route: ActivatedRoute,
    private reservationService : ReservationService,
    private fb : FormBuilder,
    private driveService : DriveBaseService,
    private pointService : PointService,
    private routeService : RouteService,
    private router : Router,
     private passengerService: PassengerService) {
      const routeParams = this.route.snapshot.paramMap;
      this.id = routeParams.get('id');
       this.driveService.getDrive_Base(this.id).subscribe( result =>{
         this.drive = result
          console.log(this.drive)
          routeService.get({drive_id: this.drive.id}).subscribe(routes =>{
            console.log('routeeeeeeee ',routes)
            this.routes = routes
            this.createForm()
          })
       })

       this.pointService.get({is_station: '0'}).subscribe(points =>{
        this.points = points
        console.log ( 'points111 ', points)
      })


  }


  createForm(){
    console.log(!this.drive.to_station)
    this.formGroupRoute = this.fb.group({});
    this.formGroupRoute.addControl('drive_id', new FormControl(this.drive ? this.drive.id : '0'));
    this.formGroupRoute.addControl('date', new FormControl(new Date(this.drive.date).toISOString().split('T')[0], Validators.required));
    // this.formGroupRoute.addControl('arrival_date', new FormControl(''));
    // this.formGroupRoute.addControl('starting_time', new FormControl('', Validators.required));
    this.formGroupRoute.addControl('date_time', new FormControl('', Validators.required));
    this.formGroupRoute.addControl('status', new FormControl('0'));
    this.formGroupRoute.addControl('back', new FormControl('0'));
    this.formGroupRoute.addControl('for_disabled', new FormControl('1'));

    this.formGroupDrive = this.fb.group({});
    this.formGroupDrive.addControl('total_places', new FormControl( this.drive ? this.drive.total_places : '0', Validators.required));
    this.formGroupDrive.addControl('id_car', new FormControl( this.drive ? this.drive.id_car : '0', Validators.required));
    this.formGroupDrive.addControl('date', new FormControl( this.drive ? this.drive.date : '0', Validators.required));
    /*this.formGroupDrive.addControl('point_a', new FormControl( this.drive ? this.drive.points[0].id : '0', Validators.required));
    this.formGroupDrive.addControl('pointa_country', new FormControl( this.drive ? this.drive.points[0].country : '0', Validators.required));
    this.formGroupDrive.addControl('pointa_address', new FormControl( this.drive ? this.drive.points[0].address : '0', Validators.required));
    */

    this.formGroupRoute.addControl('price', new FormControl( this.drive ? this.drive.price : '1', Validators.required));
    this.formGroupRoute.addControl('point', new FormControl( this.drive ? '': '', Validators.required));
    this.formGroupRoute.addControl('pointb_city', new FormControl( this.drive ? this.drive.id : '0', Validators.required));
    this.formGroupRoute.addControl('pointb_country', new FormControl( this.drive ? this.drive.id : '0', Validators.required));
    this.formGroupRoute.addControl('pointb_address', new FormControl( this.drive ? this.drive.id : '0', Validators.required));

    this.formGroupRoute.addControl('total_places', new FormControl( this.drive ? this.drive.total_places : '0', Validators.required));

  }

  onSubmitRoute(){


    if(this.formGroupRoute.status == 'INVALID' || !this.point1 ){
      this.address1Isvalid = this.point1 !== undefined
      this.toast_c.open('Be Somewhere', 'rempllissez toute les informations ')
      return
    }
    if(this.drive.pointA.id === this.point1.id ){
      this.toast_c.open('Be Somewhere', 'L\'adresse doit être différent de la station')
      return
    }


    let d: Route = this.formGroupRoute.value
    // let d = this.formGroupDrive.value
    d.point = this.point1.id

    this.loading1 = true
    d.places = this.drive.total_places
    let i = '14:10'
    let d_s = new Date(this.formGroupRoute.value.date)
    let d_a = this.drive.date//new Date(this.drive.date)

    d_s.setHours(this.formGroupRoute.value.date_time.split(':')[0],this.formGroupRoute.value.date_time.split(':')[1])
    // d_a.setHours(this.formGroupRoute.value.arrival_time.split(':')[0],this.formGroupRoute.value.arrival_time.split(':')[1])
    
    /*d_s.setHours(d_s.getHours() + 1)*/

    // d_a.setHours(d_a.getHours() + 1)
    var d_string = d_s.toISOString().replace('T',' ')
    d_string = d_string.replace('.000Z','')
    // var d_string = d_s.toISOString()
    d.starting_date = this.drive.to_station ? d_string : d_a
    d.arrival_date = !this.drive.to_station ? d_string : d_a
    if(new Date(d.starting_date) > new Date(d.arrival_date) ){
      this.toast_c.open('Be Somewhere', 'La date d\'arrivée est antérieure à la date de départ')
      this.loading1 = false
      return
    }
    // d.arrival_date = d_a.toUTCString()
    // d.starting_date = this.drive.to_station ? '' : this.drive.date
    console.log('données ', d)
    //  return
   // d.starting_date.setHours(this.formGroupRoute.value.starting_time.split(':')[0],this.formGroupRoute.value.starting_time.split(':')[1])
    //d.arrival_date.setHours(this.formGroupRoute.value.arrival_time.split(':')[0],this.formGroupRoute.value.arrival_time.split(':')[1])
    // d.starting_date += ':'+ this.formGroupRoute.value.starting_time
    // d.arrival_date += ':'+ this.formGroupRoute.value.arrival_time
    // console.log(new Date(d.starting_date))

    this.routeService.post(d).subscribe(route =>{
      this.routes.push(route)
      this.loading1 = false
      this.toast_c.open("Be Somewhere ", "Trajet crée")
      console.log(route)
    })
  }
  onSubmitDrive(){
    if(this.formGroupDrive.status == 'INVALID'){
      this.toast_c.open('Be Somewhere', 'rempllissez toute les informations')
      return
    }
    console.log(this.formGroupDrive.value)
    // return

    this.loading2 = true
    this.driveService.update(this.formGroupDrive.value, this.drive.id).subscribe(drive =>{
      this.drive = (drive)
      if(this.routes){
        this.routes.forEach((route, index) => {
          console.log(this.adjustDates(route, drive.date, drive.to_station), ' ', drive)
          route = this.adjustDates(route, drive.date, drive.to_station)
          this.routeService.update(route, route.id).subscribe(route1 =>{
            this.routes[index] = route
            console.log('routeeeeeeee ',route)
            if(index == this.routes.length - 1){
              this.loading2 = false
              this.toast_c.open("Be Somewhere ", "Horraire Mise à jour")
              console.log(drive)
            }
          })
        });
      }

    })
  }

  isSameDay(dateTimeStr1: string, dateTimeStr2: string): boolean {
    const d1 = new Date(dateTimeStr1);
    const d2 = new Date(dateTimeStr2);
  
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }
  calculateDateDifference(dateStr1: string, dateStr2: string): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  
    // Calculer la différence en millisecondes
    const differenceMs = Math.abs(date2.getTime() - date1.getTime());
  
    // Convertir en jours et retourner
    const differenceDays = Math.ceil(differenceMs / (1000 * 3600 * 24));
  
    return differenceDays;
  }

  adjustDates_old(data: Route, referenceDateStr: string, to_station: boolean): any {
    const referenceDate = new Date(referenceDateStr);
    const startingDate = new Date(data.starting_date);
    const arrivalDate = new Date(data.arrival_date);
  
    let newStartingDateStr, newArrivalDateStr;
  
    // Calculer l'écart initial en jours entre les dates
    const dayDifference = this.isSameDay(data.starting_date , data.arrival_date) ? 0 : 1 ;
  
    if (to_station) {
      // Si to_station est vrai, mettre à jour la date d'arrivée avec la date de référence
      newArrivalDateStr = this.replaceDateOnly(data.arrival_date, referenceDateStr);
      newStartingDateStr = this.replaceDateOnly(data.starting_date, referenceDateStr);
      console.log('dayDifference ',referenceDateStr,' ', newStartingDateStr, ' ',newArrivalDateStr, ' ',data.starting_date ,' ', data.arrival_date , ' ', dayDifference)
  
      // Calculer la nouvelle date de départ en fonction de l'écart initial
      let newStartingDate = new Date(newStartingDateStr);
      newStartingDate.setDate(referenceDate.getDate() - dayDifference);
      // newStartingDate = new Date(referenceDate.getTime() - (dayDifference * 24 * 60 * 60 * 1000));

      newStartingDateStr = this.formatDate(newStartingDate);
    } else {
      // Si to_station est faux, mettre à jour la date de départ avec la date de référence
      newStartingDateStr = this.replaceDateOnly(data.starting_date, referenceDateStr);
      newArrivalDateStr = this.replaceDateOnly(data.arrival_date, referenceDateStr);
      console.log('dayDifference ', newArrivalDateStr , ' ',data.starting_date ,' ', data.arrival_date, ' ', dayDifference)
  
      // Calculer la nouvelle date d'arrivée en fonction de l'écart initial
      const newArrivalDate = new Date(newArrivalDateStr);
      newArrivalDate.setDate(referenceDate.getDate() + dayDifference);
  
      newArrivalDateStr = this.formatDate(newArrivalDate);
    }

    return {
      ...data,
      starting_date: newStartingDateStr,
      arrival_date: newArrivalDateStr
    };
  }
  

adjustDates(data: Route, referenceDateStr: string, to_station: boolean): any {
  const referenceDate = new Date(referenceDateStr);
  const startingDate = new Date(data.starting_date);
  const arrivalDate = new Date(data.arrival_date);

  let newStartingDateStr, newArrivalDateStr;

  // Calculer l'écart en millisecondes (incluant l'heure et les minutes)
  const timeDifference = arrivalDate.getTime() - startingDate.getTime();

  if (to_station) {
    // Si to_station est vrai, prendre arrival_date comme base
    newArrivalDateStr = this.replaceDateOnly(data.arrival_date, referenceDateStr);
    const newArrivalDate = new Date(newArrivalDateStr);

    // Recalculer la date de départ en fonction de l'écart initial
    const newStartingDate = new Date(newArrivalDate.getTime() - timeDifference);
    newStartingDateStr = this.formatDate(newStartingDate);

    // Vérification pour s'assurer que la date de départ est antérieure à la date d'arrivée
    if (newStartingDate >= newArrivalDate) {
      throw new Error("La date de départ doit être antérieure à la date d'arrivée.");
    }
  } else {
    // Si to_station est faux, prendre starting_date comme base
    newStartingDateStr = this.replaceDateOnly(data.starting_date, referenceDateStr);
    const newStartingDate = new Date(newStartingDateStr);

    // Recalculer la date d'arrivée en fonction de l'écart initial
    const newArrivalDate = new Date(newStartingDate.getTime() + timeDifference);
    newArrivalDateStr = this.formatDate(newArrivalDate);

    // Vérification pour s'assurer que la date de départ est antérieure à la date d'arrivée
    if (newStartingDate >= newArrivalDate) {
      throw new Error("La date de départ doit être antérieure à la date d'arrivée.");
    }
  }

  return {
    ...data,
    starting_date: newStartingDateStr,
    arrival_date: newArrivalDateStr,
  };
}



  calculateNewDate(originalDateStr: string, dayDifference: number): Date {
    const originalDate = new Date(originalDateStr);
  
    // Convertir le nombre de jours en millisecondes
    const dayDifferenceMs = dayDifference * 24 * 60 * 60 * 1000;
  
    // Calculer la nouvelle date en déduisant le nombre de jours en millisecondes
    const newDateMs = originalDate.getTime() - dayDifferenceMs;
    const newDate = new Date(newDateMs);
  
    // Conserver l'heure de la date d'origine
    newDate.setHours(originalDate.getHours());
    newDate.setMinutes(originalDate.getMinutes());
    newDate.setSeconds(originalDate.getSeconds());
  
    return newDate;
  }


  replaceDateOnly(originalDateStr: string, newDateStr: string): string {
    const originalDate = new Date(originalDateStr);
    const newDate = new Date(newDateStr);
  
    // Conserver l'heure de la date d'origine
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();
  
    // Appliquer la nouvelle date avec l'heure conservée
    const updatedDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), hours, minutes, seconds);
    console.log('tempsssss ',originalDateStr ,newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), hours, minutes, seconds ,' ', this.formatDate(updatedDate))
    return this.formatDate(updatedDate);
  }
  
  // Formater la date en string (par exemple, en format 'YYYY-MM-DD HH:mm:ss')
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  getReservations(route){
    const route_id = route.id
    this.currentRoute = route
    this.total_cash_pay = 0
    if(route_id){
      this.reservationService.get({route_id, all_: true}).subscribe(reservations =>{
        this.items = []
        this.passengers = []
        this.total_take_at_home_total = 0
        for (const reservation of reservations) {
          this.items = this.items.concat(reservation.items);
          this.total_take_at_home_total += this.getTakeAtHomeOption(reservation)
          console.log('reservations : ' ,this.total_take_at_home_total)
          this.passengers = this.passengers.concat(reservation.passengers);
          this.total_cash_pay += reservation.status ? 1 : 0;
        }
        console.log(this.items)
      })
    }
  }



  ngOnInit(): void {


  }
  wd(){
    alert('d')
  }
  wantDelete(data, t){
    this.data_to_del = data
    this.dataType = t
  }
  onFileDeleted(e){
    console.log(e)
    this.toast_c.open("Be Somewhere", 'Element(s) Suprimé(s)')
    if(this.dataType === this.dataTypeDrive){
      this.router.navigateByUrl('trajets')
    }else{

      for (let index = 0; index < this.routes.length; index++) {
        const element = this.routes[index];
        if(element.id === e[0].id){
            // alert(point.id)
            this.routes.splice(index,1)
            this.currentRoute = undefined
          }
      }
    }
  }

    adressSelected(c,a){
    let adrs= this.points.filter(result =>{
      return result.address.toLowerCase()  === c.target.value.toLowerCase()
    })
    if(a){
      this.point1 = undefined
      this.address1Isvalid = adrs.length > 0
    }
    if(adrs.length > 0){
      if(a)
        this.point1 = adrs[0]
    }
  }

    getTakeAtHomeOption(reservation: Reservation){
    console.log('reservation.take_at_home ' ,reservation && reservation.take_at_home)
    return reservation && reservation.take_at_home ? this.take_at_home_price * total_take_at_homr(reservation.passengers, reservation.take_at_home) : 0
  }
}
