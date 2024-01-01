import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Route } from 'src/app/model/Model/Route';
import { per_page } from 'src/global';
import { filterData, SearchType } from 'filter-data';
@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.css']
})
export class RoutelistComponent implements OnInit {
  currentRoute = -1
  @Input() results: Route[]
  @Input() routes: Route[]

  pagination
  currentPage: number =  0
  per_page: number = 5;
  sort_option: string

  @Output() onClickRoute = new EventEmitter<Route>()
  @Output() wantDelete = new EventEmitter<Route>()
  @Output() wantEdit = new EventEmitter<Route>()

  constructor(private router: Router) { }

  ngOnInit(): void {
    let a: number = Number((this.routes.length/this.per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
  }
  navigateToPage(i){
    this.currentRoute = -1
    this.onClickRoute.emit(new Route())

    if(this.currentPage > this.pagination.length - 1 ){
      this.currentPage = this.pagination.length - 1
      return
    }
      this.currentPage = i
  }
  getPoints(){
    // console.log('points  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return this.routes.slice(this.currentPage*this.per_page, (this.currentPage+1)*this.per_page)
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
    this.routes = filterData(this.results, searchConditions);
    let a: number = Number((this.routes.length/this.per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.routes = matchSorter(this.results,'id')
    console.log('points filter ',this.results)
  }

  sort(e){
    this.routes = this.routes.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.routes)
  }

  clickForeservation(i){
    console.log(i)
    for (let index = 0; index < this.routes.length; index++) {
      const element = this.routes[index];
        if(element.id === i.id){
          this.currentRoute = index
          break
        }
    }
    // this.currentRoute = i
    this.onClickRoute.emit(i)
  }

  wantDel(route){
      this.wantDelete.emit(route)
  }
  wantEdit_(route){
      this.wantEdit.emit(route)
  }
  view(id){
    this.router.navigate(['/reservations'], {queryParams:{trajet : id}})
  }
}
