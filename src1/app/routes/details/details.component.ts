import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { DatePipe } from '@angular/common';
import { TrajetCardStatus, take_at_home_price, SERVER, SERVER_URL, SERVER_FOR_UPLOAD, total_take_at_homr } from './../../../global';
import { ItemsService } from './../../service/items/items.service';
import { Item_Drive, ItemCategory } from './../../model/Model/Item_Drive';
import { PassengerService } from './../../service/passenger/passenger.service';
import { ReservationService } from './../../service/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Passenger } from 'src/app/model/Model/Passenger';
import { meals } from 'src/global';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  reservation: Reservation
  passengers: Passenger[]
  items: Item_Drive[]
  globals  = TrajetCardStatus.Created
  SERVER = SERVER_FOR_UPLOAD
  take_at_home_price  = JSON.parse(localStorage.getItem("conf")).price_take_to_home
  @ViewChild(ToastComponent) toast_c : ToastComponent
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private reservationService : ReservationService,
    private itemsService : ItemsService,
     private passengerService: PassengerService) {
      const routeParams = this.route.snapshot.paramMap;
      this.id = routeParams.get('id');
       this.reservationService.getReservation(this.id).subscribe( result =>{
         this.reservation = result
         this.passengerService.get({},this.id).subscribe( result =>{
           this.passengers = result

           console.log(this.passengers)
         })
         this.itemsService.get({},this.id).subscribe( result =>{
           this.items = result

           console.log(this.items)
         })
         console.log(this.reservation)
       })


  }
  takeAtHomeCount(passengers, take_at_home){
    console.log('take_at_home_count ', total_take_at_homr(passengers, take_at_home))
    return total_take_at_homr(passengers, take_at_home)
  }
  isMeal(item){
    return item.category === ItemCategory.Meal
  }
  isBabySeat(item){
    return item.category === ItemCategory.BabySeats
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
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
        if(item.category === ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
        if(item.category === ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
        if(item.category === ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.reservation.items
    for (let item of items) {
      if(item.category === ItemCategory.BabySeats){
        somme += item.quantity
      }
    }
    return somme
  }
  total_price_passenger(){
    let somme = 0
    let g: Passenger[] = this.reservation.passengers
    return g.length * this.reservation.price
  }
  total_passenger(){
    let somme = 0
    let g: Passenger[] = this.reservation.passengers
    return g.length

  }
  ngOnInit(): void {

  }
  update_checklist(){
    localStorage.setItem("reservation", JSON.stringify(this.reservation))
    this.router.navigate(['trajets/creation/1'], {state:{station: this.reservation.points[1]}, queryParams: {address: this.reservation.points[0].address + ' '+ this.reservation.points[0].city , station: this.reservation.points[1].id, s : false, pointA: this.reservation.points[0], pointB: this.reservation.points[1], date: this.datepipe.transform(this.reservation.starting_date, 'yyyy-MM-dd')}})
  }

  reservationdeleted(){
    this.toast_c.open("Be Somewhere", 'Reservation annulée')
    setTimeout(() => {
      this.router.navigateByUrl('/')
    }, 2500);
  }
  getTakeAtHomeOption(){
    console.log(this.reservation.take_at_home)
    return this.reservation.take_at_home ? this.take_at_home_price * total_take_at_homr(this.reservation.passengers,this.reservation.take_at_home)  : 0
  }

}
