import { Passenger } from 'src/app/model/Model/Passenger';
import { ItemCategory, Item_Drive } from './../../model/Model/Item_Drive';
import * as globals from './../../../global';
import { Component, OnInit, Input } from '@angular/core';
import { Route } from 'src/app/model/Model/Route';
import { Reservation } from 'src/app/model/Model/Reservation';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrls: ['./route-card.component.css']
})
export class RouteCardComponent implements OnInit {

  constructor() {
  }

  @Input() route: any ;
  @Input() price_visible: boolean = true ;
  @Input() detailsIsVisible = true ;
  @Input() route_css = 'pe-0 pe-xl-5 ps-xl-5' ;
  //@ts-ignore
  @Input() curStatus : number
  @Input() screen_tah = true
  @Input() globals = globals;
  @Input() take_at_home = false;
  @Input() take_at_home_count = 0;
  @Input() passengers = 0 ;
  @Input() passengers_array = [] ;
  //@ts-ignore
  @Input() items:Item_Drive[] ;
  ngOnInit(): void {
    // alert(this.curStatus)
    console.log('Route ' , this.route)

  }

  total_meals(){
    if(!this.items)
      return '-'
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return 'x'+ somme
  }
  total_suitcase(){
    if(!this.items)
      return '-'
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return 'x'+ somme
  }
  total_babyseats(){
    if(!this.items)
      return '-'
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === ItemCategory.BabySeats){
        somme += item.quantity
      }
    }
    return 'x'+somme
  }
  total_passengers(){
    if(this.passengers > 0)
      return this.passengers
      if(!this.route.passengers)
      return '-'
    return this.route && this.route.passengers && this.route.passengers.length ? 'x' + this.route.passengers.length : 'x'+ this.route.passengers

  }
  total_take_at_homr(){
       /* let reservation_t = 0

    console.log('route_passengers ', this.route)
    if(this.take_at_home) {
        reservation_t++; // Increment reservation_t si take_at_home est true
    }
    if (!this.passengers)
      return 0
    this.passengers.forEach(passenger => {
        if(passenger.birthday !== "") {
            reservation_t++; // Increment reservation_t si birthday n'est pas vide
        }
    })

    console.log(reservation_t); //Affiche le total de reservation_t
    return reservation_t*/
  }

  total_price_passenger(){
    let somme = 0
    let g: Passenger[] = this.route.passengers
    return  g.length * this.route.price
  }
  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  getTotal(){
    //@ts-ignore
    // console.log( this.take_at_home, ' ', JSON.parse(localStorage.getItem("conf")).price_take_to_home)
    //@ts-ignore
    var tah =  this.take_at_home ? JSON.parse(localStorage.getItem("conf")).price_take_to_home : 0
    var passengers_price = /*this.passengers > 1 ?*/ (this.route.price )* this.passengers + globals.total_take_at_homr(this.passengers_array,this.take_at_home) * tah//: this.route.price
    var items_price = this.items && this.curStatus > globals.TrajetCardStatus.ChooseItems  ?  this.total_price_babyseats()+ this.total_price_meals()+ this.total_price_suitcase() : 0
    var price_plus = this.route.status ?  5 :  0
    return  passengers_price + items_price + price_plus //this.passengers ? (passengers_price + items_price ).toFixed(2) : this.route.price + tah
  }
  isISameDay(){
    return this.route && this.route.starting_date && this.route.starting_date.split(' ')[0] === this.route.arrival_date.split(' ')[0]
  }
}
