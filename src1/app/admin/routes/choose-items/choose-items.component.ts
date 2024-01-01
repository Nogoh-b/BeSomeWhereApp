import { Item_Drive } from './../../model/Model/Item_Drive';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Route } from 'src/app/model/Model/Route';
import { RouteService } from 'src/app/service/route/route.service';
import * as globals from 'src/global';
declare  var jQuery:  any;

@Component({
  selector: 'app-choose-items',
  templateUrl: './choose-items.component.html',
  styleUrls: ['./choose-items.component.css']
})
export class ChooseItemsComponent implements OnInit {

  current : number = -1;
  route_id = '7'
  routes : Route[]
  curRoute : Route
  statusCard = globals.TrajetCardStatus.ChooseItems
  meals :any[]
  suitcase = globals.suitcase
  babySeats = globals.babySeats
  curCategory = 0
  search_string = ''
  without_baby_checked = 0

  constructor(private router: Router, private route: ActivatedRoute, private routeService: RouteService) {
    if(this.router.getCurrentNavigation().extras.state){
      this.route_id = this.router.getCurrentNavigation().extras.state.route_id;
    }

  }

  ngOnInit(): void {
    if(document && document.getElementById("petitdejeuner")) {
     var d = document.getElementById("petitdejeuner");
    //  d?.click();
    }
    this.current = -1;
    let reservation  = localStorage.getItem('reservation') ? JSON.parse(localStorage.getItem('reservation')) : null
    let it = []
    for (const m of globals.meals) {
      it.push(m)
    }
    this.routeService.getRoute(this.route_id).subscribe(result =>{
      console.log(result);
      this.curRoute =  result;
      if(reservation && reservation.items){
        for (const meal of reservation.items) {
          for (let index = 0; index <  it.length; index++) {
            let element =  it[index];
            if(element.name === meal.name){
              console.log('mealss ',reservation)
              it[index] = meal
            }
          }
        }
        this.meals = it
      }else{
        this.meals = globals.meals
      }
      console.log('reservation ',reservation)
    })
    // it = this.meals


  }
  setItem(i: number){
    if(this.current == i){
      this.current = -1;
    }else{
      this.current = i
    }
    // alert(this.current)
  }

  cateryChanged(v){

  // alert(this.search_string)
  }

  itemsc(item){
    let str = ' '
    str = item.name.toLowerCase()
    let isInSearch = false
    if(str.includes(this.search_string.toLowerCase())){
      isInSearch = true
    }else{

      let arraySearch =  this.search_string.split(' ');
      for (const iterator of arraySearch) {
        console.log(iterator)
        if(str.includes(iterator.toLowerCase())){
          console.log(isInSearch)
          isInSearch = true
        }
      }
    }
    // console.log(this.search_string.toLowerCase())
    // item.name.toLowerCase().includes(this.search_string.toLowerCase())
    return  isInSearch && (item.sub_category.toString() === this.curCategory.toString() ||  this.curCategory ==globals.MealCategory.All)
     console.log(item.category.toString() +'=== '+this.curCategory.toString())
  }

  goToNextStep(){

    var meals_choosed = []
    var babySeats_choosed = []
    var items = this.total_suitcase() > '0.00' ? [this.suitcase] : []
    meals_choosed = this.meals.filter(item =>{
            return item.quantity > 0
    })
    babySeats_choosed = this.babySeats.filter(item =>{
            return item.quantity > 0
    })
    items = items.concat(meals_choosed).concat(babySeats_choosed);
    console.log(items);

    //update reseravatio data
    // if(items.length > 0 ){
      let reservation = JSON.parse(localStorage.getItem('reservation'))
      reservation.items = items
      localStorage.setItem('reservation', JSON.stringify(reservation));
    // }
    console.log(localStorage.getItem('reservation'))

    this.router.navigate(['trajets/creation/5'])
  }

  qty_meal_changed(index, value){
    this.meals[index].quantity = value;
    console.log(this.meals, ' ',value )
  }
  qty_babySeats_changed(index, value){
    this.babySeats[index].quantity = value;
    console.log(this.babySeats, ' ',value )
  }
  qty_suitcase_changed(value){
    this.suitcase.quantity = value;
    console.log(this.suitcase, ' ',value )
  }

  total_meals(){
    let somme = 0
    for (const meal of this.meals) {
      somme += meal.quantity * meal.price
    }
    return somme.toFixed(2);
  }

  total_suitcase(){
    return (this.suitcase.price * this.suitcase.quantity).toFixed(2);
  }

  total_babyseats(){
    let somme = 0
    for (const babySeat of this.babySeats) {
      somme += babySeat.quantity * babySeat.price
    }
    return somme.toFixed(2);
  }
  get_totals(){
    return Number(this.total_meals()) + Number(this.total_babyseats()) + Number(this.total_suitcase())
  }

  canSelectItems(){
    if(!this.curRoute)
    return false
    let reservation: Reservation  = localStorage.getItem('reservation') ? JSON.parse(localStorage.getItem('reservation')) : null
    const hours = Math.abs(new Date(this.curRoute.starting_date).getTime() - new Date().getTime()) / 36e5;
    console.log(new Date(this.curRoute.starting_date).getTime(),' ', new Date(this.curRoute.starting_date).getTime())
    return  hours > 4
  }
}
