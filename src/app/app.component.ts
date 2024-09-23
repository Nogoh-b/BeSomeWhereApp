import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ConfServiceAdmin } from './admin/service/conf-admin/conf.service';
import { UserServiceFireBase } from './service/core/user.service';
import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfService } from './service/conf/conf.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { PaymentsService } from './service/payments/payments.service';
import {filter} from 'rxjs/operators';
import { EmailService } from './service/email/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BeSomeWhere';
  private afAuth: AngularFireAuth
  isAdmin = false
  want_back_office = false
  want_see_reservation = false
  emailCMD = ''
  email = ''

  constructor(private userServiceFireBase: UserServiceFireBase,
    private paymentsService: PaymentsService,
    private confService: ConfService,
    private confServiceAdmin: ConfServiceAdmin,
    private emailService: EmailService,
    private router: Router,
     private userService: UserService){
      // localStorage.removeItem('reservation')
      this.email = emailService.getAdminTextFOrReservation('---lun 2 mars 2025---','---Departure adress---','---lun 2 mars 2025---','---Destination adress---','---15.05---','---TAK adress---',false, '-----title1----', '-----title2----')
      this.emailCMD = emailService.getAdminTextFOrReservationComeToMyDoor('---lun 2 mars 2025---','---Departure adress---','---lun 2 mars 2025---','---Destination adress---','---15.05---','---TAK adress---', '-----title1----', '-----title2----')
      /*this.emailService.sendMail({ "email": 'nogohbrice@gmail.com',
        "subject": "Commande / Order",
        "content": 'admin_email_content'}).subscribe(r => {})*/

        // this.emailService.sendMail({ "email": 'nogohbrice@gmail.com',
        //   "subject": "Commande / Order",
        //   "content": this.email}).subscribe(r => {})
        /*this.emailService.sendMail({ "email": 'nogohbrice@gmail.com',
          "subject": "Commande / Order",
          "content": this.emailCMD}).subscribe(r => {})*/

          // Écoute des changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Code à exécuter lorsque la route change
        console.log('La route a changé:', event.url);
        
        // Modification du style du body
        document.body.classList.add('overflow-auto');
        
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.restoredState) {
          // Cette condition est vraie si nous effectuons un retour en arrière
          console.log('Retour en arrière détecté');
        } else {
          window.scrollTo(0, 0);

          console.log('Navigation normale');
        }
      }
    }); 


      // emailService.sendMail({ "email": 'nogohbrice@gmail.com',
      // "subject": "Commande",
      // "content": "Votre reservation à été prise en compte"}).subscribe(r => {console.log('email result ' ,r)})


              confService.getConf()/*.subscribe(r =>{
                alert(localStorage.getItem('conf'))

                r.emails_admin.forEach(element => {
                  if(element === user.email)
                    this.isAdmin =true
                });
                if(!this.isAdmin)
                  this.router.navigateByUrl('/')
                console.log(event);
              })*/

      // alert(window.location.pathname)
      /*emailService.sendMail({ "email": 'bsomkwe@gmail.com',
      "subject": "Inscription",
      "content": "Merci de vous être inscrit"}).subscribe(r => {
        alert(r)
      })*/
      this.sendSignInLinkToEmail("nogohbrice@gmail.com")
      let user = userServiceFireBase.getCurrentUser()

        router.events.pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(event => {
            this.want_back_office = false
            this.want_see_reservation = false
            console.log('emails_admin ', router.url.indexOf('reservations_par_trajets-1') != -1)
            if(router.url.indexOf('back-office') != -1){
              this.want_back_office = true
              confServiceAdmin.getConf().subscribe(r =>{
                console.log('emails_admin ',r.emails_admin)
                r.emails_admin.forEach(element => {
                  if((user && element === user.email))
                    this.isAdmin =true
                });
                if(router.url.indexOf('reservations_par_trajets-1') != -1 || router.url.indexOf('reservations-1') != -1){
                  this.want_see_reservation = true
                  return
                }
                if(!this.isAdmin)
                  this.router.navigateByUrl('/')
                console.log(event);
              })
            }

          });
    if(user){
      userService.getUser(user.id).subscribe(u => userServiceFireBase.updateCurrentUser(u))
    }

    this.paymentsService.get(user ? {user_id :  user.id } : null).subscribe(res =>{
      console.log('resssssssssssssssss ',res)
      if(res.length > 0){
        const payment = res[res.length - 1]
        // for (const payment of res) {
          let date_sus = new Date(payment.created_at)
          // console.log('date_sus ', date_sus)
          date_sus.setMonth(date_sus.getMonth() + 1)
          console.log('date_sus ', date_sus+ '>=' +new Date())
          if(date_sus >= new Date()){
            localStorage.setItem('has_suscribed', 'true')
          }
          else{
            localStorage.removeItem('has_suscribed')
          }
      }
    })
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.onRouteChange(event.urlAfterRedirects);
    });
  }

  private onRouteChange(url: string) {
    if (url === '/conditions-de-vente') {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

  sendSignInLinkToEmail(email){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendSignInLinkToEmail(email,null)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })

   }

   

}
