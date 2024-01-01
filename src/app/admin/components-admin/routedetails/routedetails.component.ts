import { SERVER_FOR_UPLOAD, total_take_at_homr } from './../../../../global';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Component, Input, OnInit } from '@angular/core';
import { Drive } from 'src/app/model/Model/Drive';
import { ItemCategory, Item_Drive } from 'src/app/model/Model/Item_Drive';
import { Passenger } from 'src/app/model/Model/Passenger';
import { meals } from 'src/global';
import { Route } from 'src/app/model/Model/Route';

@Component({
  selector: 'app-routedetails',
  templateUrl: './routedetails.component.html',
  styleUrls: ['./routedetails.component.css']
})
export class RoutedetailsComponent implements OnInit {

  @Input() items: Item_Drive[]
  @Input() title = ''
  @Input() passengers: Passenger[]
  @Input() total_passengers: number
  @Input() price_passengers: number
  @Input() total_take_at_home: number
  @Input() drive: Drive
  @Input() route: Route
  @Input() reservation: Reservation
  @Input() passengersVisible = false
  take_at_home_price = JSON.parse(localStorage.getItem('conf')).price_take_to_home
  SERVER = SERVER_FOR_UPLOAD

  constructor() { }

  ngOnInit(): void {
    return
    let itemsMeals = []
    if(this.items && !this.items.length)
      return
    for (const item of this.items) {
      let index = itemsMeals.findIndex(r => r.name === item.name)
      if(index != - 1){
        // itemsMeals[index].price += item.price
        itemsMeals[index].quantity += item.quantity
      }
      else{
        itemsMeals.push(item)
      }
      // if(elts.length > 0){

        // }
      }
      // this.items = itemsMeals
      console.log('itemsMeals ', itemsMeals)
  }

  isMeal(item){
    return item.category === ItemCategory.Meal
  }
  //@ts-ignore
  getPicMeal(name){
    for (const meal of meals) {
      if(meal.name === name)
      return meal.src
    }
  }

  total_meals(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of this.items) {
        if(item.category === ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
        if(item.category === ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
        if(item.category === ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.items
    for (let item of items) {
      if(item.category === ItemCategory.BabySeats){
        somme += item.quantity * item.price
      }
    }
    return somme
  }
  total_price_passenger(){
    if(this.price_passengers)
     return this.price_passengers
    let somme = 0
    let g: Passenger[] = this.passengers
    return this.route ? g.length * this.route.price : g.length * this.reservation.price
  }
  total_passenger(){
    if(this.total_passengers)
      return this.total_passengers
    let somme = 0
    let g: Passenger[] = this.passengers
    return g.length

  }

  total_take_at_homr(){
    // return total_take_at_homr()
  }

  isBabySeat(item){
    return item.category === ItemCategory.BabySeats
  }
  getTakeAtHomeOption(){
    console.log(this.reservation.take_at_home)
    return this.reservation.take_at_home ? this.take_at_home_price : 0
  }
}
