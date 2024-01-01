import { DataType, init_selection, per_page } from './../../../../global';
import { AdsService } from './../../../service/ads/ads.service';
import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { filterData, SearchType } from 'filter-data';
import { Ads } from 'src/app/model/Model/Ads';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  constructor(public adsService: AdsService) {

  }
  ads: Ads[]
  results: Ads[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Ads


  ngOnInit(): void {
    this.adsService.get({status: '0'}).subscribe(Ads =>{
      this.ads = Ads
      this.results = Ads
      console.log ( 'Adss111 ', Ads)

      let a: number = Number((Ads.length/per_page))
      // this.checks_table = init_selection(Ads)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getAdss())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getAdss())
      }, 1000);
  }

  getAdss(){
    const Ads = this.ads && this.ads.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('Ads  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return Ads
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
    this.ads = filterData(this.results, searchConditions);
    let a: number = Number((this.ads.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.ads = matchSorter(this.results,'id')
    console.log('Ads filter ',this.results)
  }

  sort(e){
    this.ads = this.ads.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.ads)
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
    for (const Ads of data ) {
      const id = Ads.id.toString()
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
