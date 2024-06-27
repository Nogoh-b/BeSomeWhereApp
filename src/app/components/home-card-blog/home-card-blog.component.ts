import { ArticleService } from './../../service/article/article.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Article } from 'src/app/model/Model/Article';
import { User } from 'src/app/model/Model/Utilisateur';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { PaymentsService } from 'src/app/service/payments/payments.service';
import { addSecondsToDate, ecart, removeSubstring } from 'src/global';

@Component({
  selector: 'app-home-card-blog',
  templateUrl: './home-card-blog.component.html',
  styleUrls: ['./home-card-blog.component.css']
})
export class HomeCardBlogComponent implements OnInit {

  articles: Article[]
  has_suscribed = false //localStorage.getItem('has_suscribed')
  user: User

  constructor(private articleService : ArticleService,
    private userServiceFireBase: UserServiceFireBase,
    private paymentsService: PaymentsService,) { }

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
        this.articleService.get({per_page: 5, status: 'private, publish'}).subscribe(a =>{
          //alert("ee")
          this.articles = a
          console.log(this.articles)
        })

    })


    setInterval(() => {
      if (this.isMobileDevice()) {
        // Code spécifique pour les appareils mobiles
        // console.log('C\'est un appareil mobile');
      }
    }, 1000);
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoWidth: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1.9,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    margin: 0,
    nav: false
  }
  removeSubstring(mainString: string, subString: string): string {
    return removeSubstring(mainString, subString);
  }
  isMobileDevice(): boolean {
    const mobileWidthThreshold = 414; // Valeur seuil pour la largeur mobile
    // console.log(window.innerWidth)
    return window.innerWidth < mobileWidthThreshold;
  }
}
