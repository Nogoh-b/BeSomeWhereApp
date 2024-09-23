import { SharedService } from './../../service/shared/shared.service';
import { Item_Drive } from './../../model/Model/Item_Drive';
import { DatePipe } from '@angular/common';
import { UserServiceFireBase } from './../../service/core/user.service';
import * as globals from 'src/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import { RouteService } from 'src/app/service/route/route.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Passenger } from 'src/app/model/Model/Passenger';
import { User } from 'src/app/model/Model/Utilisateur';
import { Reservation } from 'src/app/model/Model/Reservation';
import { ValidateDate } from 'src/app/validators/date.validator';
import { MapService } from 'src/app/service/map/map.service';

@Component({
  selector: 'app-choose-passengers',
  templateUrl: './choose-passengers.component.html',
  styleUrls: ['./choose-passengers.component.css']
})
export class ChoosePassengersComponent implements OnInit {

  route_id = '7'
  user :User
  nbr_passengers = 1
  passengers = [];
  curRoute : Route
  statusCard = globals.TrajetCardStatus.ChoosPassenger

  passengersForm : FormGroup
  submitted = false;
  reservation : Reservation = localStorage.getItem('reservation') && JSON.parse(localStorage.getItem('reservation'));
  points:any[] = []
  conf = JSON.parse(localStorage.getItem("conf"))
  price_take_to_home = JSON.parse(localStorage.getItem("conf")).price_take_to_home

  constructor(private router: Router,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private fb: FormBuilder,
    private mapService: MapService,
    private sharedService: SharedService,
    private datepipe: DatePipe,
    private userServiceFireBase: UserServiceFireBase) {

      console.log(this.reservation)
    this.user = userServiceFireBase.getCurrentUser()

    /*if(this.router.getCurrentNavigation().extras.state){
      this.route_id = this.router.getCurrentNavigation().extras.state.route_id;
      this.nbr_passengers = this.router.getCurrentNavigation().extras.state.nbr_passengers;
    }*/


   }
   takeAtHomeCount(passengers, take_at_home){
    return globals.total_take_at_homr(passengers, take_at_home)
  }
  ngOnInit(): void {
    //set total

    this.route.queryParams.subscribe(params => {
      console.log(this.reservation); // { order: "popular" }

    //@ts-ignore
    this.route_id = params.route_id;
    //@ts-ignore
    this.nbr_passengers = params.nbr_passengers;
      for (let index = 0; index < this.nbr_passengers; index++) {
        this.passengers.push(index)

      }
      // this.passengers = new Array<Passenger>(this.nbr_passengers);
      console.log('dataaa ', this.route_id, ' ', this.passengers); // popular
      this.routeService.getRoute(this.route_id).subscribe(result =>{
        console.log(result);
        this.curRoute =  result;
        if(this.reservation){
          this.reservation.total =  (this.total_price_passenger() + this.total_price_babyseats()+ this.total_price_meals()+ this.total_price_suitcase()).toFixed(2)
          console.log(this.reservation)
        }
      })
      this.createForm();
    })
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.passengersForm.invalid) {
      // alert(this.passengersForm.errors)
        return;
    }

    const data = this.passengersForm.value
    let psgs : Passenger[] = []

    for (let index = 0; index < this.nbr_passengers; index++) {
      let psg: Passenger = new Passenger()

      psg.first_name =   data['first_name' + index]
      psg.last_name =   data['last_name' + index]
      psg.gender =   data['gender' + index]
      psg.flight_number =   data['flight_number' + index]
      psg.phone =   data['phone' + index]
      psg.email =   data['email' + index]
      psg.id =   data['id' + index]
      psg.take_at_home =   data['take_at_home' + index]
      psg.birthday =  psg.take_at_home && index > 0 ||  index === 0  ?  data['date' + index] : ''
      // psg.birthday = psg.take_at_home && index > 0 || this.reservation.take_at_home && index === 0  ?  data['date' + index] : ''
      psgs.push(psg);
    }

    //update reseravation data
    let reservation = this.reservation//JSON.parse(localStorage.getItem('reservation'))
    reservation.take_to_home_adr = data.take_to_home_adr
    // return
    reservation.passengers = psgs
    console.log(reservation)
    reservation.for_disabled = data.for_disabled
    localStorage.setItem('reservation', JSON.stringify(reservation));
    console.log(JSON.parse(localStorage.getItem('reservation')))
    this.router.navigate(['/trajets/creation/4'], {state: {route_id: this.curRoute.id }, queryParams:{route_id: this.curRoute.id }})


  }

  getPassengers(){
    return new Array<Passenger>(this.nbr_passengers)
  }

  createForm() {
    this.passengersForm = this.fb.group({});
    this.passengersForm.addControl('for_disabled', new FormControl( this.reservation && this.reservation.for_disabled ? this.reservation.for_disabled : '0'));

    for (let i = 0; i < this.nbr_passengers; i++) {
      let user

      if(this.reservation && this.reservation.passengers && this.reservation.passengers[i]){
        user = this.reservation.passengers[i]
        console.log('passengers ',this.reservation.passengers[i])
      }
      else if(i === 0){
        user =  this.user
      }
      var d =new Date()   ;
      if(i === 0)
        d.setFullYear(new Date().getFullYear() - 18)
      // d.setFullYear(d.getFullYear() - y);
      this.passengersForm.addControl('first_name'+i, new FormControl(user  && user.first_name ? user.first_name : '', Validators.required));
      this.passengersForm.addControl('last_name'+i, new FormControl(user   && user.last_name ? user.last_name : '', Validators.required));
      this.passengersForm.addControl('flight_number'+i, new FormControl(user   && user.flight_number ? user.flight_number : '', null));
      const date = i > 0 ? user.birthday : this.datepipe.transform(user.birthday, 'yyyy-MM-dd')
      this.passengersForm.addControl('date'+i, new FormControl(user   && user.birthday ? date  : '', i === 0 ? [Validators.required,ValidateDate(d)] : null));
      this.passengersForm.addControl('gender'+i, new FormControl(user   && user.gender ? user.gender : '0'));
      this.passengersForm.addControl('take_at_home'+i, new FormControl(user  ? user.take_at_home : '0'));
      this.passengersForm.addControl('email'+i, new FormControl(user   && user.email ? user.email : '', i == 0 ? Validators.required : null));
      this.passengersForm.addControl('phone'+i, new FormControl(user   && user.phone ? user.phone : '', i == 0 ? Validators.required : null));
      this.passengersForm.addControl('id'+i, new FormControl(user   && user.id ? user.id : ''));
      if(this.reservation   && this.reservation.take_at_home)
        this.passengersForm.addControl('take_to_home_adr', new FormControl(this.reservation   && this.reservation.take_to_home_adr ? this.reservation.take_to_home_adr: '',  Validators.required ));
    }

    // this.passengersForm = this.fb.group({
    //   first_name: ['', Validators.required ],
    //   last_name: ['', Validators.required ],
    //   date: ['', Validators.required ]
    // });
  }
  checkValid(d){
    if(this.passengersForm.get('take_to_home_adr') && !this.passengersForm.get('take_to_home_adr').valid)
      this.sharedService.scroll(d, -100)
  }

  setRequiredField(fieldName: string, isRequired: boolean): void {
    const control = this.passengersForm.get(fieldName);
    console.log(control.value, ' ',isRequired)
    if (control) {
      if (isRequired) {
        control.setValidators([Validators.required]);
      } else {
        control.clearValidators();
      }

      control.updateValueAndValidity();
    }
  }

  // onClickSubmit(data) {this.emailid = data.emailid; this.userlogin = data.passwd;}
  total_price_passenger(){
    let somme = 0
    let g: Passenger[] = this.reservation.passengers
    return g.length * this.curRoute.price
  }
  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    if(items){
      for (let item of items) {
          if(item.category === globals.ItemCategory.BabySeats){
            somme += item.quantity * item.price
          }
      }
    }
    return somme
  }
  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    if(items){
      for (let item of items) {
          if(item.category === globals.ItemCategory.Meal){
            somme += item.quantity * item.price
          }
      }
    }
    return somme
  }
  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    if(items){
      for (let item of items) {
          if(item.category === globals.ItemCategory.Suitcase){
            somme += item.quantity * item.price
          }
      }
    }
    return somme
  }

  getYears(y){
    var d = new Date();
    d.setFullYear(d.getFullYear() - y);

    //console.log(d.getFullYear())
    return d.getFullYear()
  }

  getDate(){
    return this.datepipe.transform(new Date(), 'yyyy-MM-dd')
  }
  textInput(e){
    setTimeout(() => {
      this.mapService.search({q:e.target.value}).subscribe(points =>{
        this.points = points.items
        console.log(points.items)
      })
    }, 1000);
  }
}
