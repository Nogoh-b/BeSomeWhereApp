import { DataType, init_selection, per_page } from './../../../../global';
import { ChecklistService } from './../../../service/checklist/checklist.service';
import { Component, OnInit } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';
import { filterData, SearchType } from 'filter-data';
@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css']
})
export class ChecklistListComponent implements OnInit {

  checklists: Checklist[]
  results: Checklist[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Checklist
  constructor(public checklistService: ChecklistService) {}

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.checklistService.get({status: '0', with_user: '1'}).subscribe(checklist =>{
      this.checklists = checklist
      this.results = checklist
      console.log ( 'checklist111 ', checklist)

      let a: number = Number((this.getChecklists().length/per_page))
      // this.checks_table = init_selection(checklist)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getChecklists())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getChecklists())
      }, 1000);
  }

  getChecklists(){
    const checklists0 = this.checklists &&  this.checklists.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    let checklists = []
    for (const checklist of this.checklists) {
      if(checklist.user)
        checklists.push(checklist)
    }
    // console.log('checklist  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return checklists
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
    this.checklists = filterData(this.results, searchConditions);
    let a: number = Number((this.checklists.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.checklists = matchSorter(this.results,'id')
    console.log('checklist filter ',this.results)
  }

  sort(e){
    this.checklists = this.checklists.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.checklists)
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

}
