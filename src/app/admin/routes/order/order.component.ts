import { ReservationService } from './../../../service/reservation/reservation.service';
import { Item_Drive } from './../../../model/Model/Item_Drive';
import { RouteService } from 'src/app/service/route/route.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import * as globals from 'src/global';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Passenger } from 'src/app/model/Model/Passenger';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  loading = false;
  curRoute : any;
  data : any;
  statusCard = globals.TrajetCardStatus.Ordering

  constructor(public route : Router, public routeService : RouteService, private reservationService: ReservationService) {

    this.data = JSON.parse(localStorage.getItem('reservation'))
    console.log(this.data)
    this.routeService.getRoute(this.data.route_id).subscribe(result =>{
      console.log(result, this.data);
      this.curRoute =  result;
    })
   }

  ngOnInit(): void {
  }

  buy(){
        console.log(this.data)
        return
    // this.loading =true;
    this.routeService.getRoute(this.data.route_id).subscribe(result =>{
      console.log(result, this.data);
      this.curRoute =  result;
      if(!this.curRoute.for_disabled && Boolean(this.data.for_disabled)  ){
        console.log('place pour handicapé plus dispo', !this.curRoute.for_disabled ,' && ', Boolean(this.data.for_disabled) )
      }
      if(this.curRoute.places < this.data.passengers.length ){
        console.log('place pour handicapé plus dispo ', this.curRoute.places ,' < ', this.data.passengers.length )
      }

      this.reservationService.post(this.data).subscribe(result =>{
        console.log(result, this.data)
        localStorage.removeItem('reservation')
      })
    })
    //this.route.navigateByUrl('/')
  }

  total_price_passenger(){
    let somme = 0
    let g: Passenger[] = this.data.passengers
    return g.length * this.curRoute.price
  }

  total_passenger(){
    let somme = 0
    let g: Passenger[] = this.data.passengers
    return g.length
    // let somme = 0
    // let g: Passenger[] = this.data.passengers
    // for (let passenger of g) {
    //     somme += passenger.quantity
    // }
  }

  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_meals(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }

  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return somme
  }

  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.BabySeats){
        somme += item.quantity
      }
    }
    return somme
  }
}
