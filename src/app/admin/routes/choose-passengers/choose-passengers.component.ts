import { UserServiceFireBase } from './../../../service/core/user.service';
import * as globals from 'src/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import { RouteService } from 'src/app/service/route/route.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Passenger } from 'src/app/model/Model/Passenger';
import { User } from 'src/app/model/Model/Utilisateur';

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


  constructor(private router: Router,private route: ActivatedRoute, private routeService: RouteService, private fb: FormBuilder, private userServiceFireBase: UserServiceFireBase) {

    this.user = userServiceFireBase.getCurrentUser()

    /*if(this.router.getCurrentNavigation().extras.state){
      this.route_id = this.router.getCurrentNavigation().extras.state.route_id;
      this.nbr_passengers = this.router.getCurrentNavigation().extras.state.nbr_passengers;
    }*/


   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { order: "popular" }

      this.route_id = params.route_id;
      this.nbr_passengers = params.nbr_passengers;
      for (let index = 0; index < this.nbr_passengers; index++) {
        this.passengers.push(index)

      }
      // this.passengers = new Array<Passenger>(this.nbr_passengers);
      console.log('dataaa ', this.route_id, ' ', this.passengers); // popular
      this.routeService.getRoute(this.route_id).subscribe(result =>{
        console.log(result);
        this.curRoute =  result;
        // if(this.routes.length > 0){
        //   this.curRoute = this.routes[0]
        // }
      })
      this.createForm();
    })
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.passengersForm.invalid) {
        return;
    }

    const data = this.passengersForm.value
    let psgs : Passenger[] = []

    for (let index = 0; index < this.nbr_passengers; index++) {
      let psg: Passenger = new Passenger()
      psg.birthday =   data['date' + index]
      psg.first_name =   data['first_name' + index]
      psg.last_name =   data['last_name' + index]
      psg.gender =   data['gender' + index]
      psg.phone =   data['phone' + index]
      psg.email =   data['email' + index]
      psgs.push(psg);
    }

    //update reseravatio data
    let reservation = JSON.parse(localStorage.getItem('reservation'))
    reservation.passengers = psgs
    reservation.for_disabled = data.for_disabled
    localStorage.setItem('reservation', JSON.stringify(reservation));
    console.log(localStorage.getItem('reservation'))

    this.router.navigate(['/trajets/creation/4'], {state: {route_id: this.curRoute.id }})


  }

  getPassengers(){
    return new Array<Passenger>(this.nbr_passengers)
  }

  createForm() {
    this.passengersForm = this.fb.group({});
    this.passengersForm.addControl('for_disabled', new FormControl('0', Validators.required));

    for (let i = 0; i < this.nbr_passengers; i++) {
      this.passengersForm.addControl('first_name'+i, new FormControl(this.user && i == 0 && this.user.first_name ? this.user.first_name : '', Validators.required));
      this.passengersForm.addControl('last_name'+i, new FormControl(this.user && i == 0  && this.user.last_name ? this.user.last_name : '', Validators.required));
      this.passengersForm.addControl('date'+i, new FormControl(this.user && i == 0  && this.user.birthay ? this.user.birthay : '', Validators.required));
      this.passengersForm.addControl('gender'+i, new FormControl(this.user  && i == 0 && this.user.gender ? this.user.gender : '0', Validators.required));
      this.passengersForm.addControl('email'+i, new FormControl(this.user && i == 0  && this.user.email ? this.user.email : '', i == 0 ? Validators.required : null));
      this.passengersForm.addControl('phone'+i, new FormControl(this.user && i == 0  && this.user.phone ? this.user.phone : '', i == 0 ? Validators.required : null));
    }

    // this.passengersForm = this.fb.group({
    //   first_name: ['', Validators.required ],
    //   last_name: ['', Validators.required ],
    //   date: ['', Validators.required ]
    // });
  }

  // onClickSubmit(data) {this.emailid = data.emailid; this.userlogin = data.passwd;}

}
