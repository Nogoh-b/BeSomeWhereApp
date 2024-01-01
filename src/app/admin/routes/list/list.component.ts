import { DriveService } from './../../../service/drive/drive.service';
import { per_page, DataType } from './../../../../global';
import { PointService } from './../../../service/point/point.service';
import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { filterData, SearchType } from 'filter-data';
import {matchSorter} from 'match-sorter'
import { Drive } from 'src/app/model/Model/Drive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(public pointService: PointService, private driveService: DriveService) {

  }
  drives: Drive[]
  results: Drive[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string

  checks_table = []
  selected_data: any[] = []
  datatype = DataType.Drive

  ngOnInit(): void {
    this.driveService.get().subscribe(drive =>{
        this.drives = drive
        console.log(this.drives)
      this.results = drive


      let a: number = Number((drive.length/per_page))
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
        this.init_selection(this.getdrive())
      // this.pagination = new Array(Number(drive.length/per_page).toFixed(0));
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getdrive())
      }, 1000);
  }

  getdrive(){
    // console.log('drive  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return this.drives.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
  }
  searchData(e){
    // alert(e.target.value)
    const searchConditions = [
      {
        key: ['points[0]'],
        value: e.target.value,
        type: SearchType.LK,
      }
    ];
    this.drives = filterData(this.results, searchConditions);
    let a: number = Number((this.drives.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.drives = matchSorter(this.results,'id')
    console.log('drive filter ',this.results)
  }

  sort(e){
    this.drives = this.drives.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.drives)
  }
  projectAdded(drive: Drive){
    if(this.results.filter(r => r.id === drive.id).length === 0)
      this.results.push(drive)
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
  console.log(t)
  return t
}
}
