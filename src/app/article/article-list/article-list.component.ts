import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../service/article/article.service';
import { Article } from 'src/app/model/Model/Article';
import { ArticleCategory } from './../../model/Model/Article_Categorie';
import { CategoryService } from './../../service/category-article/category.service';
import { addSecondsToDate, ecart, removeSubstring } from 'src/global';
import { PaymentsService } from 'src/app/service/payments/payments.service';
import { User } from 'src/app/model/Model/Utilisateur';
import { UserServiceFireBase } from 'src/app/service/core/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[]
  user: User
  articleCategories: ArticleCategory[]
  selected = '0'
  has_suscribed = false//localStorage.getItem('has_suscribed')
  constructor(private articleService: ArticleService,
    private userServiceFireBase: UserServiceFireBase,
    private paymentsService: PaymentsService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.user = this.userServiceFireBase.getCurrentUser();
    this.paymentsService.get(this.user ? {user_id :  this.user.id } : null).subscribe(res =>{
      if(res.length > 0){
        const payment = res[res.length - 1]
        // for (const payment of res) {
          let date_sus = new Date(addSecondsToDate(payment.updated_at,ecart))
          // console.log('date_sus ', date_sus)
          // date_sus.setMonth(date_sus.getMonth() + 1)
          console.log('date_sus ', date_sus+ '>=' +new Date())
          if(date_sus >= new Date() && (payment.status) === 1){
            this.has_suscribed = true
          }
        }
        this.categoryService.get().subscribe(
          (resp) => {
            console.log(resp);
              this.articleCategories = resp
              this.getarticles({status: 'private, publish'})
        },
        (error) => {
            console.log(error.error);
        }
  
        
      )

    })


    //   	this.categoryService.get().subscribe(categories=>{
    //     this.articleCategories = categories
    //     this.getarticles({status: 'private, publish'})


    // })
  }
  removeSubstring(mainString: string, subString: string): string {
    return removeSubstring(mainString, subString);
  }
  categoryChange(e){
  	// alert(e.target.value)
  	this.articles = null
    this.selected = e.target.value
  	this.getarticles(e.target.value === '0' ? {status: 'private, publish'} : {categories: e.target.value,status: 'private, publish'} )


  }
  getarticles(params?: any){
	this.articleService.get(params).subscribe(
    (articles) => {
      console.log(articles);
      this.articles = articles
      //this.results = articles
      console.log ( 'articles ', articles)

  },
  (error) => {
      console.log(error.error);
  }
  )
  }
/*
articles =>{
		this.articles = articles
		//this.results = articles
		console.log ( 'articles ', articles)

		//  let a: number = Number((articles.length/per_page))
		// this.checks_table = init_selection(articles)
		//  alert(a)
		//this.pagination = new Array(Math.ceil(a));
		//this.init_selection(this.getarticles())
	}
*/
}
