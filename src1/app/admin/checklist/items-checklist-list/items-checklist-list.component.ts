import { ItemChecklistCategoryService } from './../../../service/item_checklist_category/item-checklist-category.service';
import { Item_Proposed } from './../../../model/Model/Item_Proposed';
import { DataType, init_selection, per_page, SERVER_FOR_UPLOAD } from './../../../../global';
import { Component, OnInit } from '@angular/core';
import { filterData, SearchType } from 'filter-data';
import { ItemProposedService } from 'src/app/service/item_proposed/item-proposed.service';
import { Item_Checklist_Categorie } from 'src/app/model/Model/Item_Checklist_Categorie';

@Component({
  selector: 'app-items-checklist-list',
  templateUrl: './items-checklist-list.component.html',
  styleUrls: ['./items-checklist-list.component.css']
})
export class ItemsChecklistListComponent implements OnInit {

  item_proposed: Item_Proposed[]
  results: Item_Proposed[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Item_Proposed

  item_categories: Item_Checklist_Categorie[]
  results1: Item_Checklist_Categorie[]
  pagination1
  currentPage1: number =  0
  per_page1: number = per_page;
  sort_option1: string
  search_option1: string
  checks_table1 = []

  selected_data1: any[] = []
  datatype1 = DataType.Item_Category

  SERVER_FOR_UPLOAD = SERVER_FOR_UPLOAD

  constructor(public checklistService: ItemProposedService,public itemChecklistCategoryService: ItemChecklistCategoryService) {}

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.checklistService.get().subscribe(checklist =>{
      this.item_proposed = checklist
      this.results = checklist
      console.log ( 'checklist111 ', checklist)

      let a: number = Number((checklist.length/per_page))
      // this.checks_table = init_selection(checklist)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getItem_Proposeds())
    })

    this.itemChecklistCategoryService.get().subscribe(checklist2 =>{
      this.item_categories = checklist2
      this.results1 = checklist2
      console.log ( 'checklist111 ', checklist2)

      let a: number = Number((checklist2.length/per_page))
      this.pagination1 = new Array(Math.ceil(a));
      this.init_selection1(this.getItem_Proposeds())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getItem_Proposeds())
      }, 1000);
  }

  getItem_Proposeds(){
    const checklist = this.item_proposed &&  this.item_proposed.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    return checklist
  }
  searchData(e){
    // alert(e.target.value)
    const searchConditions = [
      {
        key: ['name'],
        value: e.target.value,
        type: SearchType.LK,
      }
    ];
    this.item_proposed = filterData(this.results, searchConditions);
    let a: number = Number((this.item_proposed.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.item_proposed = matchSorter(this.results,'id')
    console.log('checklist filter ',this.results)
  }

  sort(e){
    this.item_proposed = this.item_proposed.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.item_proposed)
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
    for (const user of data ) {
      const id = user.id.toString()
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



  navigateToPage1(i){
    if(i === ( this.pagination1 && this.pagination1.length) || i < 0  )
      return
      this.currentPage1 = i
      setTimeout(() => {
        this.init_selection(this.getItem_Categories())
      }, 1000);
  }

  getItem_Categories(){
    const checklist = this.item_categories &&  this.item_categories.slice(this.currentPage1*per_page, (this.currentPage1+1)*per_page)
    // console.log('checklist  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return checklist
  }
  searchData1(e){
    // alert(e.target.value)
    const searchConditions = [
      {
        key: ['name'],
        value: e.target.value,
        type: SearchType.LK,
      }
    ];
    this.item_proposed = filterData(this.results, searchConditions);
    let a: number = Number((this.item_proposed.length/per_page))
    //  alert(a)
    this.pagination1 = new Array(Math.ceil(a));
    // this.item_proposed = matchSorter(this.results,'id')
    console.log('checklist filter ',this.results)
  }

  sort1(e){
    this.item_proposed = this.item_proposed.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.item_proposed)
  }
  selectOrUnselectAll1(s, data){
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.selected_data1[index].selected = s
      }

    console.log(this.selected_data1, ' ', s)
  }
  init_selection1(data){
    while (this.selected_data1.length > 0) {
      this.selected_data1.pop()
    }
    for (const user of data ) {
      const id = user.id.toString()
      this.selected_data1.push({ id , selected: false})
      // console.log(this.selected_data1, ' ', )

    }
  }
  selectOrUnselect1(s,index){
    console.log(this.selected_data1[index].selected)
    this.selected_data1[index].selected = s
    console.log(this.selected_data1)
  }
  isAllchecked1(selected_data1?:any[]){
    return this.getAllChecked(selected_data1).length === selected_data1.length
  }
  isChecked1(){

  }
  getAllChecked1(selected_data1?:any[]){
    let t = []
    for (const d of selected_data1) {
      if(d.selected )
        t.push(d)
    }
    // console.log(t)
    return t
  }

  onProposedAdded(item:Item_Proposed){
    this.item_proposed.push(item)
    this.results.push(item)
  }
  onProposedUpdate(item:Item_Proposed){

  }
  onProposedCategorieUpdate(item:Item_Checklist_Categorie){

  }
  onProposedCategorieAdded(item:Item_Checklist_Categorie){
    this.item_categories.push(item)
    this.results1.push(item)
  }


}
