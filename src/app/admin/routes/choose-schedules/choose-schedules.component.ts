import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import { RouteService } from 'src/app/service/route/route.service';
import * as globals from 'src/global';

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


  constructor(private router: Router, private route: ActivatedRoute, private routeService: RouteService) {
    this.route_params =this.router.getCurrentNavigation().extras.state;
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { order: "popular" }

      this.route_params = params;
      console.log(this.route_params); // popular
      this.routeService.get(this.route_params).subscribe(result =>{
            console.log('result ', result);
            this.routes =  result;
            if(this.routes.length > 0){
              this.curRoute = this.routes[0]
            }
      })
    }
  );

  }

  ngOnInit(): void {
  }

  goToNextStep(route: Route, nbr_passengers: number){
    let reservation = {route_id : route.id, user_id: 1}
    localStorage.setItem('reservation', JSON.stringify(reservation));
    this.router.navigate(['/trajets/creation/3'], {queryParams: {route_id: route.id, nbr_passengers }})

  }

}
