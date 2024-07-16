import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouteService } from 'src/app/service/route/route.service';
import { Reservation } from 'src/app/model/Model/Reservation';
import { ReservationService } from '../../service/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemCategory, Item_Drive } from '../../model/Model/Item_Drive';
import { Passenger } from '../../model/Model/Passenger';
import { meals, total_take_at_homr } from 'src/global';
import { Route } from '../../model/Model/Route';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-by-route1',
  templateUrl: './reservation-by-route.component.html',
  styleUrls: ['./reservation-by-route.component.css']
})
export class ReservationByRouteComponent1 implements OnInit {

  reservations = []
  route : Route
  route_id : string
  currentReservation: Reservation
  currentIndex = -1
  total_items: Item_Drive[] = []
  total_items1: Item_Drive[] = []
  cash_total = 0
  total_price_passenger_ = 0
  total_passenger_ = 0
  total_take_at_home = 0
  loading = false
  formFilter: FormGroup
  take_at_home_price = JSON.parse(localStorage.getItem('conf')).price_take_to_home

  constructor(private reservationService: ReservationService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route_: Router,
    private datepipe: DatePipe,
    private routeService: RouteService) {
    router.queryParams.subscribe(params =>{
      this.route_id = params['trajet']
      this.createForm()
      setTimeout(() => {
        // this.getData(this.route_id)
      }, 500);
      /*this.routeService.getRoute(params.trajet).subscribe(route =>{
        console.log(route)
        this.route = route
      })*/
    })
  }

  reset(){
    this.total_passenger_ = 0
    this.total_price_passenger_ = 0
    this.total_take_at_home = 0
    this.total_items = []
    // this.reservations = null
  }
  getData(route_id){
    this.loading =true
      console.log('enter!!!')
      this.cash_total = 0

    this.reset()
    this.reservationService.get({ all_: true, "status":0,"group_by":"route_id","from":this.formFilter.get('from').value,"to":this.formFilter.get('to').value}).subscribe(reservations =>{
      console.log('reservations11 :', reservations)
      let datas = []
      this.reservations = []
        Object.entries((reservations)).forEach(([key, value]) => {
          // this.reservations.push({key : value})
            //totals
            let total_price = 0
            for (const res of reservations[key]) {
              total_price += this.total_price_babyseats(res) + this.total_price_meals(res) + this.total_price_passenger(res)+ this.total_price_suitcase(res) + this.getTakeAtHomeOption(res)
              this.total_passenger_ += this.total_passenger(res)
              this.total_price_passenger_ += this.total_price_passenger(res)
              this.total_take_at_home += this.getTakeAtHomeOption(res)
              this.cash_total += res.status ? 1 : 0
              console.log('res.status ' , res.status )
              
            }
            // recuperer toute les options
            const dat: any = value
            console.log('this.total_passenger_ ', dat)
            for (const e of dat) {
              for (let index = 0; index < e.items.length; index++) {
                const element = e.items[index];
                this.total_items1.push(element)
                // this.total_items.push(element)

              }
              // this.total_items = this.total_items.concat(e.items)
            }
            this.reservations.push({id:reservations[key][0].route_id,
              total_price,
              total_reservation: reservations[key].length,
              pointA : reservations[key][0].points[0] && reservations[key][0].points[0].address,
              transport : reservations[key][0] && reservations[key][0].id_car,
              starting_date : reservations[key][0].starting_date,
              arrival_date : reservations[key][0].arrival_date,
              pointB : reservations[key][0].points[1] && reservations[key][0].points[1].address,  })
        });
        console.log('element.quantity ', this.total_items1)
        // this.total_items = this.total_items1
        this.loading =false
            // this.reservations = reservations
          })
        }
  ngOnInit(): void {
    setTimeout(() => {
      // this.getData(this.route_id)
    }, 1500);
  }

  createForm(){
    this.formFilter = this.fb.group({})
    this.formFilter.addControl('from', new FormControl(this.datepipe.transform(new Date(), 'yyyy-MM-dd')))
    this.formFilter.addControl('to', new FormControl(this.datepipe.transform(new Date(), 'yyyy-MM-dd')))
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
    let items: Item_Drive[] = reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_meals(reservation: Reservation){
    let somme = 0
    let items: Item_Drive[] = reservation.items
    console.log('reservation.items ', reservation.items)
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
    console.log("g.length * reservation.price ", g.length ,'*', reservation.price)
    return g.length * reservation.price
  }
  total_cash(reservation: Reservation){
    let somme = 0
    let g: Passenger[] = reservation.passengers
    console.log("g.length * reservation.price ", g.length ,'*', reservation.price)
    return g.length * reservation.price
  }
  total_passenger(reservation: Reservation){
    let somme = 0
    let g: Passenger[] = reservation.passengers
    return g.length

  }

  setCurrentReservation(id){
    this.route_.navigate(['back-office/reservations-1'], {queryParams:{trajet : id}})
  }
    view(id){
  }
  getTakeAtHomeOption(reservation){
    console.log('reservation.take_at_home ' ,reservation.take_at_home)
    return reservation.take_at_home ? this.take_at_home_price * total_take_at_homr(reservation.passengers,reservation.take_at_home) : 0
  }
}
