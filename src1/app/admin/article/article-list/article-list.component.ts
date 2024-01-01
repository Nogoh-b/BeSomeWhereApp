import { ArticleService } from './../../../service/article/article.service';
import { DataType, init_selection, per_page } from './../../../../global';
import { Component, OnInit } from '@angular/core';
import { filterData, SearchType } from 'filter-data';
// import {matchSorter} from 'match-sorter'
import { Article } from 'src/app/model/Model/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor(private articleService: ArticleService) { }
  articles: Article[]
  results: Article[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Article
  users = [
    {id: 1, first_name: 'John', last_name: 'Doe', work: { company: 'Foo Tech' }},
    {id: 2, first_name: 'Jane', last_name: 'West', work: { company: 'AAA Solutions' }},
    {id: 3, first_name: 'Bruce', last_name: 'John', work: { company: 'Bar Tech' }},
    {id: 4, first_name: 'William', last_name: 'Cent', work: { company: 'Foo Tech' }, arr: [{name: 'foo'}]}
 ];
  change_(){
    console.log("this.search_option ",this.search_option)
  }

  ngOnInit(): void {
    this.articleService.get({status: 'private, publish'}).subscribe(articles =>{
      this.articles = articles
      this.results = articles
      console.log ( 'articles111 ', articles)

      let a: number = Number((articles.length/per_page))
      // this.checks_table = init_selection(articles)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getarticles())
    })
    this.articleService.update({status:'private'}, 75).subscribe(result =>{
      console.log(result)
      // this.loading1 = false
    })
  }

  navigateToPage(i){
    console.log(this.currentPage < this.pagination && this.pagination.length - 1)
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
    this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getarticles())
      }, 1000);
  }

  getarticles(){
    const articles = this.articles && this.articles.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('articles  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return articles
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
    this.articles = filterData(this.results, searchConditions);
    let a: number = Number((this.articles.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.articles = matchSorter(this.results,'id')
    console.log('articles filter ',this.results)
  }

  sort(e){
    this.articles = this.articles.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.articles)
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
