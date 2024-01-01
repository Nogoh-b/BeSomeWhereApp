import { Item_Drive } from './../../../model/Model/Item_Drive';
import { MealsService } from './../../../service/meals/meals.service';
import { DataType, init_selection, per_page, MealCategory, SERVER_FOR_UPLOAD, ItemCategory } from './../../../../global';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filterData, SearchType } from 'filter-data';
import { ConfServiceAdmin } from '../../service/conf-admin/conf.service';
import { ModalDeleteAdminComponent } from '../../components-admin/modal-delete-admin/modal-delete-admin.component';

@Component({
  selector: 'app-meats-list',
  templateUrl: './meats-list.component.html',
  styleUrls: ['./meats-list.component.css']
})
export class MeatsListComponent implements OnInit {

  constructor(public mealsService: MealsService, public confService: ConfServiceAdmin) {}


  meals: Item_Drive[]
  results: Item_Drive[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.MealCategory
  server = SERVER_FOR_UPLOAD
  itemCat = ItemCategory
  small_pleasures_type
  @ViewChild(ModalDeleteAdminComponent) del_modal: ModalDeleteAdminComponent;

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.confService.getConf().subscribe(res=>{
      console.log(res)
      this.small_pleasures_type = res.small_pleasures_type
    });
    this.mealsService.get({}).subscribe(meals =>{
      this.meals = meals
      this.results = meals
      console.log ( 'meals111 ', meals)

      let a: number = Number((meals.length/per_page))
      // this.checks_table = init_selection(meals)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getmeals())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getmeals())
      }, 1000);
  }

  getmeals(){
    const meals = this.meals &&  this.meals.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('meals  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return meals
  }
  searchData(e){
    // alert(e.target.value)
    const searchConditions = [
      {
        key: ['address','city','country'],
        value: e.target.value,
        type: SearchType.LK,
      }
    ];
    this.meals = filterData(this.results, searchConditions);
    let a: number = Number((this.meals.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.meals = matchSorter(this.results,'id')
    console.log('meals filter ',this.results)
  }

  sort(e){
    this.meals = this.meals.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.meals)
  }
  selectOrUnselectAll(s, data){
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.selected_data[index].selected = s
      }

    console.log(this.selected_data, ' ', s)
  }
  init_selection(data){
    while (this.selected_data.length > 0) {
      this.selected_data.pop()
    }
    for (const point of data ) {
      const id = point.id.toString()
      this.selected_data.push({ id , selected: false})
      // console.log(this.selected_data, ' ', )

    }
  }
  selectOrUnselect(s,index){
    console.log(this.selected_data[index].selected)
    this.selected_data[index].selected = s
    console.log(this.selected_data)
  }
  isAllchecked(selected_data?:any[]){
    return this.getAllChecked(selected_data).length === selected_data.length
  }
  isChecked(){

  }
  getAllChecked(selected_data?:any[]){
    let t = []
    for (const d of selected_data) {
      if(d.selected )
        t.push(d)
    }
    // console.log(t)
    return t
  }
  setCartegoryName(n){
    const mealCat =  Object.freeze(ItemCategory)
    if(n === ItemCategory.Meal)
      return 'Repas'
    else
      return 'Places Bébé'
    Object.keys(mealCat).forEach(element => {
      if(mealCat[0])
      console.log('element ',mealCat[0])
      return
    });
  }
  setSubCartegoryName(n){
    return  this.small_pleasures_type[n]

    const mealCat =  Object.freeze(MealCategory)
    return mealCat[n]
    Object.keys(mealCat).forEach(element => {
      if(mealCat[0])
      console.log('element ',mealCat[0])
      return
    });
  }
  selectAndDelete(i){
    this.selectOrUnselect(true,i)
    this.del_modal.datas = this.getAllChecked(this.selected_data)
  }
}
