import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { RouteService } from 'src/app/service/route/route.service';
import { Reservation } from 'src/app/model/Model/Reservation';
import { ReservationService } from '../../service/reservation/reservation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemCategory, Item_Drive } from '../../model/Model/Item_Drive';
import { Passenger } from '../../model/Model/Passenger';
import { DataType, meals, total_take_at_homr } from 'src/global';
import { Route } from '../../model/Model/Route';

@Component({
  selector: 'app-reservations1',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent1 implements OnInit {

  reservations : Reservation[]
  route : Route
  currentReservation: Reservation
  totals_passengers: Passenger[] = []
  totals_items: Item_Drive[] = []
  total_take_at_home: number = 0
  cash_total: number
  params
  take_at_home_price = JSON.parse(localStorage.getItem('conf')).price_take_to_home
  @ViewChild(ToastComponent) toast_c : ToastComponent
  dataType = DataType.Reservation

  currentIndex = -1
  constructor(private reservationService: ReservationService,
    private router: ActivatedRoute,
    private route_: Router,
    private routeService: RouteService) {
    router.queryParams.subscribe(params =>{
      this.params = params

      this.routeService.getRoute(params['trajet']).subscribe(route =>{
        console.log(route)
        this.route = route
      })
      setTimeout(() => {
        this.getData(params)
      }, 500);
    })
  }
  getData(params){
    this.reservationService.get({route_id: params.trajet, all_: true}).subscribe(reservations =>{
      console.log('reservations : ', reservations)
      this.totals_items = []
      this.totals_passengers = []
      this.total_take_at_home = 0
      this.cash_total = 0
      this.reservations = reservations
      for (const reservation of reservations) {
        this.totals_passengers = this.totals_passengers.concat(reservation.passengers);
        this.totals_items = this.totals_items.concat(reservation.items);
        this.cash_total += reservation.status ? 1 : 0
        console.log('my_items_ ', reservation.items)
        this.total_take_at_home += this.getTakeAtHomeOption(reservation)
      }
    })
  }

  ngOnInit(): void {
    this.getData(this.params)
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

  total_meals(reservation: Reservation){
    let somme = 0
    // console.log('reservation_items ', reservation)
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }

  total_cash(reservation: Reservation){

    return reservation.status ? 1 : 0
  }
  /*total_cash(reservation: Reservation){
    let somme = 0
    // console.log('reservation_items ', reservation)
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return reservation
  }*/

  total_price_meals(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    // console.log(reservation.items)
    for (let item of items) {
        if(item.category === ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_price_suitcase(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
        if(item.category === ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_suitcase(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_babyseats(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
        if(item.category === ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_babyseats(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.BabySeats){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_passenger(reservation: Reservation){
    let somme = 0
    let g: Passenger[] = reservation.passengers
    return g.length * reservation.price
  }
  total_passenger(reservation: Reservation){
    let somme = 0
    let g: Passenger[] = reservation.passengers
    return g.length

  }

  setCurrentReservation(i){
    this.currentReservation = this.reservations[i]
    this.currentIndex = i

  }
  getTakeAtHomeOption(reservation){
    // console.log('reservation.take_at_home ' ,reservation && reservation.take_at_home)
    return reservation.take_at_home ? this.take_at_home_price * total_take_at_homr(reservation.passengers,reservation.take_at_home) : 0
  }
  reservationdeleted(){
    this.toast_c.open("Be Somewhere", 'Reservation annulée')
    this.route_.navigate(['/reservations_par_trajets'])

    // return
    this.reservations.splice(this.currentIndex,1)
    setTimeout(() => {
    // this.router1.navigateByUrl('/')
    }, 2500);
  }
}
