import { ArticleComment } from './../../model/Model/ArticleComment';
import { ArticleCommentCommentsService } from './../../service/articleComments/article-comments.service';
import { PaymentsService } from './../../service/payments/payments.service';
import { Article } from 'src/app/model/Model/Article';
import { ArticleService } from './../../service/article/article.service';
import { ReservationService } from './../../service/reservation/reservation.service';
import { ChecklistService } from './../../service/checklist/checklist.service';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Checklist } from 'src/app/model/Model/Checklist';
import { User } from 'src/app/model/Model/Utilisateur';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { addSecondsToDate, ecart, removeSubstring } from 'src/global';
import { Payment } from 'src/app/model/Model/Payment';
import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article
  id :string
  ecart =  ecart

  user: User
  articles: Article[]
  comments: ArticleComment[] = []
  comment: string = ''
  payment: Payment
  // checklists: Array<Checklist>
  // reservations: Reservation[]
  // is_first_reservation = false
  have_to_suscribe= false
  loading: boolean;
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

  constructor(private articleService : ArticleService, private activatedRoute : ActivatedRoute,
    private userServiceFireBase: UserServiceFireBase,
    @Inject(LOCALE_ID) private locale: string,
    private articleCommentCommentsService : ArticleCommentCommentsService,
    private datePipe: DatePipe,
    private paymentsService: PaymentsService,
    private sanitizer: DomSanitizer
    ) {

      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.id = routeParams.get('id');
    }

  ngOnInit(): void {
    this.user = this.userServiceFireBase.getCurrentUser();

    console.log('resssssssssssssssss ',this.user)
    this.paymentsService.get(this.user ? {user_id :  this.user.id } : null).subscribe(res =>{
      if(res.length > 0){
        const payment = res[res.length - 1]
        this.payment = payment
        // for (const payment of res) {
          let date_sus = new Date(addSecondsToDate(payment.updated_at,this.ecart))
          // console.log('date_sus ', date_sus)
          // date_sus.setMonth(date_sus.getMonth() + 1)
          console.log('date_sus ', date_sus+ '>=' +new Date())
          if(date_sus >= new Date() && (payment.status) === 1){
            this.have_to_suscribe = true
          }
      }

      // }
      this.articleService.getArticle(this.id).subscribe(a =>{
        //alert("ee")
        this.article = a
        this.getRelated(a.categories[0])
        console.log(this.article)
      })
      this.articleCommentCommentsService.get({status: 'approve', post : this.id}).subscribe(c =>{
        //alert("ee")
        this.comments = c
        // Fonction de comparaison pour trier les commentaires par date
        // @ts-ignore
        const comparerParDate = (a, b) => new Date(b.date) - new Date(a.date);

        // Tri du tableau en place en utilisant la fonction de comparaison
        this.comments.sort(comparerParDate);
        console.log('comments ',this.comments)
      })

    })
     localStorage.removeItem("reservation")
    /*if(this.user){
      this.checklistService.get({user_id:this.user.id}).subscribe(result =>{
        console.log(result)
        this.checklists = result
      })
      this.reservationService.get({user_id :this.user.id, all_: true}).subscribe( result => {
        this.reservations = result
        this.is_first_reservation = localStorage.getItem('first_reservation') === null && this.reservations.length == 1
        console.log(this.reservations)
      })
    }
    else{
      this.checklists = []
      this.reservations = []
    }*/
  }

  afficherTexteAvecEntitiesHTML(texte: string): SafeHtml {
    
    return  removeSubstring(this.replacePrivéNbsp(texte), 'Privé :')//this.sanitizer.bypassSecurityTrustHtml(removeSubstring(texte, 'Privé&nbsp;: ') );
  }
  replacePrivéNbsp(inputString: string): string {
    return inputString.replace(/<Privé&nbsp;:/g, '<Privé :');
  }
  getLocalaHour(dateStr: string): string {
    // Convertir la chaîne en objet Date
    const dateObj = new Date(dateStr);

    // Obtenir le décalage horaire en minutes (inverse du décalage horaire UTC)
    const decalageHoraireMinutes = dateObj.getTimezoneOffset();

    // Convertir le décalage horaire en heures
    const decalageHoraireHeures = decalageHoraireMinutes / 60;

    // Ajouter le décalage horaire pour obtenir l'heure locale
    dateObj.setHours(dateObj.getHours() + decalageHoraireHeures);

    // Obtenir l'heure locale au Cameroun
    const heureLocaleCameroun = dateObj.toLocaleTimeString();

    return heureLocaleCameroun;
}
  
  reload(){
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  getRelated(c){
        this.articleService.get({categories: c, per_page: 6}).subscribe(a =>{
      //alert("ee")
      this.articles = a
      console.log(this.articles)
    })
  }

  getNameUserOnComment(data: string){
    return data && JSON.parse(data).name ?  JSON.parse(data).name : "Admin"
  }
  getPictureUserOnComment(data: string){
    return data && JSON.parse(data).image ?  JSON.parse(data).image : "./assets/img/empty_profil.jpg"
  }
  addComment(text:string){
    if(this.userServiceFireBase.getCurrentUser()){

      this.loading = true
      let data = /*{
        image : this.userServiceFireBase.getCurrentUser().image,
        name :  this.userServiceFireBase.getCurrentUser().name,
        content : text,
        article_id : this.id,
        user_id : this.userServiceFireBase.getCurrentUser().id
      }*/
        {
          "post":this.id,
          "author_name": this.userServiceFireBase.getCurrentUser().name,
          "author_email": this.userServiceFireBase.getCurrentUser().email,
          "content": text,
          "status": 'approve'
        }
  
      this.articleCommentCommentsService.post(data).pipe(
        catchError(error => {
          // Traitement de l'erreur
          console.error('Erreur lors de la récupération des données :', error);
          // Ajoutez ici le code pour gérer l'erreur
          throw error; // Relancez l'erreur pour que l'observateur externe puisse également la traiter
        })
      ).subscribe(
        data => {
          // Traitement des données réussi
          console.log('Données obtenues avec succès :', data);
          this.loading = false
          this.comments.push(data)
            // Fonction de comparaison pour trier les commentaires par date
          // @ts-ignore
          const comparerParDate = (a, b) => new Date(b.date) - new Date(a.date);
  
          // Tri du tableau en place en utilisant la fonction de comparaison
          this.comments.sort(comparerParDate);
          console.log(data)
          this.comment = ''
        },
        error => {
          // Traitement de l'erreur
          console.error(error);
        }
      );
      
      
      /*.subscribe(r =>{
        this.loading = false
        this.comments.push(r)
          // Fonction de comparaison pour trier les commentaires par date
        // @ts-ignore
        const comparerParDate = (a, b) => new Date(b.date) - new Date(a.date);

        // Tri du tableau en place en utilisant la fonction de comparaison
        this.comments.sort(comparerParDate);
        console.log(r)
        this.comment = ''
      })*/
    }
    else{
            // Sélectionnez l'élément par son ID
      const loginBtn = document.getElementById('login_btn');

      // Vérifiez si l'élément existe avant de simuler le clic
      if (loginBtn) {
          // Simulez le clic
          loginBtn.click();
      } else {
          console.error('Élément non trouvé');
}

    }
  }
  hasCommented(){
    return false
    var myComments = []
    if(this.comments.length > 0){
      console.log('------------------------- ',this.comments)
      myComments= this.comments.filter(c => c.user_id === this.userServiceFireBase.getCurrentUser().id)

    }
    return myComments.length > 0
  }
  clickToSuscribe(){
    if(this.user){
      document.getElementById("btnPricing")?.click()
    }
    else{
      document.getElementById("btnAuth")?.click()
    }
  }
  getPreavisText(): string {
    const expirationDate = this.calculateExpirationDate(24); // 24 heures de délai
    const now = new Date();

    if (now < expirationDate) {
      const timeDiff = expirationDate.getTime() - now.getTime();
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      return `Vous avez jusqu'à ${expirationDate.toLocaleString()} pour effectuer votre paiement par PayPal ou virement bancaire`//. Il vous reste ${hoursDiff} heures et ${minutesDiff} minutes.`;
    } else {
      return 'Le délai pour effectuer votre paiement est expiré.';
    }
  }

  private calculateExpirationDate(hoursToAdd: number): Date {
    // const expirationDate = new Date(this.payment.created_at);
    const expirationDate = new Date(this.formatDateToLocale(this.payment.created_at));

    console.log('expirationDate ',this.formatDateToLocale(this.payment.created_at))
    expirationDate.setHours(expirationDate.getHours() + hoursToAdd);
    return expirationDate;
  }

  formatDateToLocale(dateString: string): string {
    const date = new Date(dateString);

    // Récupérer le décalage horaire en minutes
    const offsetMinutes = date.getTimezoneOffset();

    // Ajouter le décalage horaire à la date
    const dateAvecOffset = new Date(date);
    dateAvecOffset.setMinutes(date.getMinutes() + (-1)*offsetMinutes);

    // Afficher la nouvelle date avec le décalage horaire
    console.log(offsetMinutes);

    return dateAvecOffset.toString();
  }
}
