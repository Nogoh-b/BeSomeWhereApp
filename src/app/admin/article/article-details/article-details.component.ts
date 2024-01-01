import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { DataType } from 'src/global';
import { UploadComponent } from './../../../shared/upload/upload.component';
import { ArticleCategory } from './../../../model/Model/Article_Categorie';
import { ArticleService } from './../../../service/article/article.service';
import { CategoryService } from './../../../service/category-article/category.service';
// import { UploadComponent } from './../../shared/upload/upload.component';
import { HttpClient } from '@angular/common/http';
// import { ArticleCategory } from './../../model/Model/Article_Categorie';
// import { ArticleService } from './../../service/article/article.service';
// import { CategoryService } from './../../service/category-article/category.service';
import { Article } from 'src/app/model/Model/Article';
import { Router, ActivatedRoute } from '@angular/router';
// import { ToastComponent } from './../../shared/toast/toast.component';
// import { DataType } from './../../../global';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  id:string

  countries : any[]
  cities : any[]
  points : any []
  countryIsvalid = true
  cityIsvalid = true
  submited = false
  loading1= false
  loading2= false
  country: string
  city: string
  address: string
  currentCountry: any
  currentAddress: any
  article: Article
  articleCategories: ArticleCategory[]
  article_img : string
  formArticle: FormGroup
  formArticleCategory: FormGroup
  @ViewChild(UploadComponent)  upload_c : UploadComponent
  data_to_del: any
  dataType = DataType.Point
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  constructor(private fb: FormBuilder,
    private router: Router ,
    private httpClient: HttpClient ,
    private categoryService: CategoryService ,
    private articleService: ArticleService ,
    private route:ActivatedRoute) {
      const routeParams = this.route.snapshot.paramMap;
      this.id = routeParams.get('id') === "creation" ? null : routeParams.get('id');

    }

    ngOnInit(): void {

      this.categoryService.get().subscribe(categories=>{
        // console.clear()
        console.log(this.id)
        this.articleCategories = categories
        this.articleService.getArticle(this.id).subscribe(article=>{
          console.log(article)
          this.article_img = ''
          if(article.id)
          {
            this.article_img = article._embedded['wp:featuredmedia'] ?  article._embedded['wp:featuredmedia'][0] && article._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : ''
            this.article = article
            this.createForm()
            // if(article._embedded['wp:featuredmedia']){
            //   this.httpClient.get<any>(article._links['wp:featuredmedia'][0].href).subscribe(result =>{
            //     this.article_img = result.link
            //     console.log(result);
            //   });
            // }
          }
          else{

            this.createForm()
            this.article = new Article
          }
      })

    })
  }
  onFileDeleted(e){
    console.log(e)
    this.toast_c.open("Be Somewhere", 'Points(s) Suprimé(s)')
    if(e[0].parent === 0 || !e[0].parent){
      setTimeout(() => {
        this.router.navigateByUrl('article')
      }, 1500);
    }else{

    }
  }

  onCategoryChange(e){
    console.log(e.target.value)
    const text = e.target.value
     let cats =  this.articleCategories.filter(cat => text === cat.name )
     let v = cats.length > 0 ? cats[0].id : ''
      this.formArticle.get('categories').setValue(v.toString())
    //this.formArticle.get('categories').setValue('')

  }
  logSelection(e){
    console.log(e)
  }
  logChange(e){
    console.log(e)
  }
  createForm(){
    this.formArticle = this.fb.group({});
    this.formArticleCategory = this.fb.group({});
    // console.log(this.article.title.rendered)

    this.formArticle.addControl('title', new FormControl(this.article && this.article.id  ? this.article.title.rendered : '', Validators.required));
    this.formArticle.addControl('content', new FormControl(this.article && this.article.id ? this.article.content.rendered : '', Validators.required));
    this.formArticle.addControl('author', new FormControl(this.article && this.article.id ? this.article.author : 0 , Validators.required));
    this.formArticle.addControl('categories', new FormControl(this.article && this.article.id ? this.article.categories[0] : ''));
    this.formArticle.addControl('category_name', new FormControl(this.article && this.article.id ? this.getCategory(this.article.categories[0] ).name : ''));
    this.formArticle.addControl('featured_media', new FormControl(this.article && this.article.id ? this.article.featured_media : '0'));
    this.formArticle.addControl('status', new FormControl(this.article && this.article.id  ? this.article.status : 'publish', Validators.required));

    alert(JSON.stringify(this.formArticle.value))
  }
  getCategory(id){
    return this.articleCategories.filter(cat => id === cat.id )[0]
  }
  onArticleDeleted(e){
    console.log(e)
    this.toast_c.open("Be Somewhere", 'Article(s) Suprimé(s)')
    if(e[0].parent === 0 || !e[0].parent){
      setTimeout(() => {
        this.router.navigateByUrl('article')
      }, 1500);
    }else{

    }
  }
  onSumit1(){

  }
  onSumit(){

    if(!this.formArticle.valid){
      this.toast_c.open('Be Somewhere', "veuillez remplir tous les champs")
      return
    }

    if(this.formArticle.get('category_name').value == ""){
      console.log("pas de catégorie");
      // catégorie par défaut
      this.formArticle.get('categories').setValue('1')
    }else if(this.formArticle.get('categories').value === '' && this.formArticle.get('category_name').value !== "" ){
      console.log("Ajout d'une catégorie")
      this.categoryService.post({name: this.formArticle.get('category_name').value}).subscribe(r =>{
        console.log(r)
         this.formArticle.get('categories').setValue(r.id.toString())
        this.saveOrUpdate()
      })
    }
    else{
      console.log("suite processus")
      this.saveOrUpdate()
    }
  }

  saveOrUpdate(){
    console.log('data to set ', this.formArticle.value)
    this.loading1 = true
    if(this.id){
      this.articleService.update(this.formArticle.value,this.id).subscribe(result =>{
        console.log(result)
        this.loading1 = false
      })
    }
    else{
      this.articleService.post(this.formArticle.value).subscribe(result =>{
        console.log(result)
        this.loading1 = false
      })
    }
  }
  file_uploaded(e){
    //this.article_img = e.file_name
    // if(this.formArticle)
    this.formArticle.get('featured_media').setValue(e[0].toString())
    console.log('file_uploaded ',e[0])
  }
  file_deleted(e){
    this.article_img = ''
    console.log('file_deleted ', e)
    // if(this.formArticle)
    this.formArticle.get('featured_media').setValue('0')
  }
  //@ts-ignore
  getPic(){
    if(this.article_img)
      return[this.article_img]
  }

}
