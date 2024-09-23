import { DataType, init_selection, per_page } from './../../../../global';
import { UserService } from './../../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { filterData, SearchType } from 'filter-data';
import { ReversePipe } from 'ngx-pipes';
import { User } from 'src/app/model/Model/Utilisateur';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public userService: UserService) {

  }
  users: User[]
  results: User[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.User

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.userService.get({status: '0'}).subscribe(users =>{
      this.users = users
      this.results = users
      console.log ( 'users111 ', users)

      let a: number = Number((users.length/per_page))
      // this.checks_table = init_selection(users)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getUsers())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getUsers())
      }, 1000);
  }

  getUsers(){
    const users = this.users &&  this.users.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('users  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return users
  }
  getAddress(user:User){
    let address = user.cur_country
    if(user.country && !user.address)
      address = user.country
    if(user.address)
      address = user.address
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
    this.users = filterData(this.results, searchConditions);
    let a: number = Number((this.users.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.users = matchSorter(this.results,'id')
    console.log('users filter ',this.results)
  }

  sort(e){
    this.users = this.users.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.users)
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
