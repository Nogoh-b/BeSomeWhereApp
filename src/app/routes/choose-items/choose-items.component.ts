import { ConfService } from './../../service/conf/conf.service';
import { SERVER_FOR_UPLOAD, email_admin } from './../../../global';
import { MealsService } from './../../service/meals/meals.service';
import { ItemCategory, Item_Drive } from './../../model/Model/Item_Drive';
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
  meals :Item_Drive[] = []
  suitcase = globals.suitcase
  babySeats :Item_Drive[] = []//= globals.babySeats
  search_string = ''
  without_baby_checked = 0
  server = SERVER_FOR_UPLOAD
  email_admin = email_admin
  proposed_items_type : string[] = JSON.parse(localStorage.getItem("conf")).small_pleasures_type
  curCategory = 7
  reservation : Reservation = localStorage.getItem('reservation') && JSON.parse(localStorage.getItem('reservation'));
  constructor(private router: Router,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private mealsService: MealsService) {
    if(this.router.getCurrentNavigation().extras.state){
      // this.route_id = this.router.getCurrentNavigation().extras.state.route_id;
    }
    this.route.queryParams.subscribe(params => this.route_id = params['route_id'] )

  }

  takeAtHomeCount(passengers, take_at_home){
    return globals.total_take_at_homr(passengers, take_at_home)
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

    this.mealsService.get({quantity:'max'}).subscribe(result =>{
      if(reservation.items){
        for (const item of reservation.items) {
          result.forEach(it => {
            if(it.id === item.id){
              it.quantity = item.quantity
              it.quantity_max = item.quantity_max
            }
          });
        }
      }
      console.log('Meallllls ',reservation.items, ' ', result)
      this.meals =  result.filter(r=>{
        console.log('r.quantity ',r.quantity)
        if((!r.quantity_max || r.quantity_max === 0 )){
          r.quantity_max = r.quantity
          r.quantity = 0
        }
        return r.category === ItemCategory.Meal && r
      })
      this.babySeats =  result.filter(r=>{
        return r.category === ItemCategory.BabySeats && r.quantity_max > 0
      })
    })

    //récuperer la route
    this.routeService.getRoute(this.route_id).subscribe(result =>{
      console.log(result);
      this.curRoute =  result;
      if(reservation && reservation.items && reservation.items.length > 0){
              //récuperer les valises
      let suitcase  = reservation.items.filter(r => r.name === 'suitcase')
      if(suitcase.length > 0){
        this.suitcase =  suitcase[0];
      }
      //récuperer les sièges bébé
      for (let index = 0; index < this.babySeats.length; index++) {
        const babyseat = this.babySeats[index]
        let suitcase  = reservation.items.filter(r => r.name === 'suitcase')
        let bs  = reservation.items.filter(r => r.name === babyseat.name)
        if(bs.length > 0){
          this.babySeats[index] =  bs[0];
        }
    }
      return
        //récuperer les petit plaisirs
        // for (const meal of reservation.items) {
        for (let j = 0; j <  reservation.items.length; j++) {
            let meal = reservation.items[j]
            for (let index = 0; index <  it.length; index++) {
              let element =  it[index];
              if(element.name === meal.name  ){
                console.log("meal.category  ",meal.id)
                meal.src = it[index].src
                it[index] = meal
              }
          }
        }
        // this.meals = it
      }else{
        // this.meals = globals.meals
      }




      // console.log('reservation ',reservation.items, ' ', suitcase)
      // console.log('mealss ',this.meals)
    })
    // it = this.meals


  }
  setItem(i: number){
    if(this.current == i){
      this.current = -1;
    }else{
      this.current = i
    }
  }

  cateryChanged(v){
    console.log((this.curCategory).toString() +'=== '+(this.proposed_items_type.length-1).toString())
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
        if(str.includes(iterator.toLowerCase()) && iterator.toLowerCase() != ''){
          console.log('iterator ', str ,' : ', iterator.toLowerCase(), ' : ',arraySearch)
          console.log(isInSearch)
          isInSearch = true
        }
      }
    }
    return  isInSearch && (item.sub_category.toString() === this.curCategory.toString() )
    // return  isInSearch && (item.sub_category.toString() === this.curCategory.toString() ||  (isInSearch && this.curCategory == this.proposed_items_type.length - 1))
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
    // return

    //update reseravatio data
    // if(items.length > 0 ){
      let reservation = JSON.parse(localStorage.getItem('reservation'))
      reservation.items = items
      localStorage.setItem('reservation', JSON.stringify(reservation));
    // }
    console.log(localStorage.getItem('reservation'))

    this.router.navigate(['trajets/creation/4_2'], {state: {route_id: this.curRoute.id }, queryParams:{route_id: this.curRoute.id }})
    // this.router.navigate(['trajets/creation/5'])
  }
  filterItems(items: Item_Drive[]){
    return items.filter(item => item.sub_category === 1 || item.sub_category === 3 )
  }
  qty_meal_changed(index, value){
    this.meals[index].quantity = value;
    console.log(this.meals, ' ',value )
  }
  qty_babySeats_changed(index, value){
    this.babySeats[index].quantity = value;
    console.log(this.babySeats[index], ' ',value )
  }
  qty_suitcase_changed(value){
    this.suitcase.quantity = value;
    console.log(this.suitcase, ' ',value )
  }

  total_meals(){
    let somme = 0
    for (const meal of globals.filterMeals(this.meals)) {
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
    return Number(this.total_meals()) //+ Number(this.total_babyseats()) + Number(this.total_suitcase())
  }

  canSelectItems(){
    if(!this.curRoute)
      return false
    let reservation: Reservation  = localStorage.getItem('reservation') ? JSON.parse(localStorage.getItem('reservation')) : null
    const hours = Math.abs(new Date(this.curRoute.starting_date).getTime() - new Date().getTime()) / 36e5;
    // console.log(new Date(this.curRoute.starting_date).getTime(),' ', new Date(this.curRoute.starting_date).getTime())
    return  hours > 4
  }
}
