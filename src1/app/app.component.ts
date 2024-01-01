import { NavigationEnd, Router } from '@angular/router';
import { ConfServiceAdmin } from './admin/service/conf-admin/conf.service';
import { UserServiceFireBase } from './service/core/user.service';
import { UserService } from 'src/app/service/user/user.service';
import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'BeSomeWhere';
  private afAuth: AngularFireAuth
  isAdmin = false
  want_back_office = false

  constructor(private userServiceFireBase: UserServiceFireBase,
    private paymentsService: PaymentsService,
    private confService: ConfService,
    private confServiceAdmin: ConfServiceAdmin,
    private emailService: EmailService,
    private router: Router,
     private userService: UserService){
      
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
            if(router.url.indexOf('back-office') != -1){
              this.want_back_office = true
              confServiceAdmin.getConf().subscribe(r =>{
                console.log('emails_admin ',r.emails_admin)
                r.emails_admin.forEach(element => {
                  if(element === user.email)
                    this.isAdmin =true
                });
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


  sendSignInLinkToEmail(email){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendSignInLinkToEmail(email,null)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })

   }

}
