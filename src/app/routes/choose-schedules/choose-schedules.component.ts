import { ToastComponent } from './../../shared/toast/toast.component';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import { RouteService } from 'src/app/service/route/route.service';
import * as globals from 'src/global';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Point } from 'src/app/model/Model/Point';

@Component({
  selector: 'app-choose-schedules',
  templateUrl: './choose-schedules.component.html',
  styleUrls: ['./choose-schedules.component.css']
})
export class ChooseSchedulesComponent implements OnInit {

  route_params: any// = {starting_date : '2021-10-27', point_a: '3', point_b: '5' }
  routes : Route[]
  curRoute : Route
  statusCard = globals.TrajetCardStatus.ChooseSchedules
  reservation = localStorage.getItem('reservation') ? JSON.parse(localStorage.getItem('reservation')) : {route_id:'', user_id:''};
  @ViewChild(ToastComponent) toast_c: ToastComponent
  take_at_homes :boolean[] = []
  take_at_home : boolean = false
  price_take_to_home = JSON.parse(localStorage.getItem("conf")).price_take_to_home


  constructor(private router: Router, private route: ActivatedRoute, private routeService: RouteService, private userServiceFireBase: UserServiceFireBase) {
    this.route_params =this.router.getCurrentNavigation().extras.state;
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { order: "popular" }

      this.route_params = params;
      console.log(this.route_params); // popular
      this.routeService.get(this.route_params).subscribe(result =>{
            // console.log(result);
            console.log('route.points1 ', result)
            for (const route of result) {
              console.log('route.points ', route)
            }
            this.routes =  result;
            if(this.routes.length > 0){
              this.curRoute = this.routes[0]
              this.curRoute.points = this.invertIfSwitched(this.curRoute.points, params['to_station'], params['point_a'], params['point_b'])
            }
            for (const route of result) {
              this.take_at_homes.push(false)
            }
            this.take_at_home = this.reservation && this.reservation.take_at_home
      })
    }
  );

  }
  takeAtHomeCount(passengers, take_at_home){
    return globals.total_take_at_homr(passengers, take_at_home)
  }
  
  ngOnInit(): void {
  }

  invertIfSwitched(arrays, switched, pointA, pointB) {
      if (switched != 1) {
        let points : Point[]  = []
        const p0 = arrays.filter((element) => element.id.toString() === pointB);
        const p1 = arrays.filter((element) => element.id.toString() === pointA);
        points.push(p1[0])
        points.push(p0[0])
        console.log('Points Inverted ', points)
        return points;
        return arrays;
      }
      return arrays;
  }

  changeTakeToHome(checked){
    // this.take_at_home = checked
    // alert(this.take_at_home)
  }

  goToNextStep(route: Route, nbr_passengers: number, index: number){
    if(!this.userServiceFireBase.getCurrentUser()){
      this.toast_c.open("Be Somewhere", "HaveToConnected")
      return
    }
    this.reservation.route_id = route.id
    this.reservation.points = route.points
    this.reservation.arrival_date = route.arrival_date
    this.reservation.to_station = route.to_station
    this.reservation.total_places = route.total_places
    this.reservation.price = route.price
    this.reservation.total_places = route.total_places
    this.reservation.starting_date = route.starting_date
    this.reservation.take_at_home = this.take_at_homes[index]
    this.reservation.user_id = this.userServiceFireBase.getCurrentUser().id
    // this.reservation.take_at_home = this.take_at_home
    this.reservation.passengers = [];
    for (let index = 0; index < nbr_passengers; index++) {
      this.reservation.passengers.push(index)
      
    }
    console.log('Route-choose ', this.reservation)
    localStorage.setItem('reservation', JSON.stringify(this.reservation));
    this.router.navigate(['/trajets/creation/3'], {queryParams: {route_id: route.id, nbr_passengers }})

  }

}
