import { DataType, init_selection, per_page } from './../../../../global';
import { PointService } from './../../../service/point/point.service';
import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { filterData, SearchType } from 'filter-data';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {

  constructor(public pointService: PointService) {

  }
  points: Point[]
  results: Point[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Point

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.pointService.get({status: '0'}).subscribe(points =>{
      this.points = points
      this.results = points
      console.log ( 'points111 ', points)

      let a: number = Number((points.length/per_page))
      // this.checks_table = init_selection(points)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getPoints())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getPoints())
      }, 1000);
  }

  getPoints(){
    const points = this.points &&  this.points.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('points  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return points
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
    this.points = filterData(this.results, searchConditions);
    let a: number = Number((this.points.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.points = matchSorter(this.results,'id')
    console.log('points filter ',this.results)
  }

  sort(e){
    this.points = this.points.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.points)
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


}
