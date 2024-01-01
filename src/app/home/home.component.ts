import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './../service/shared/shared.service';
import { UserService } from './../service/user/user.service';
import { ToastComponent } from './../shared/toast/toast.component';
import { ReservationService } from './../service/reservation/reservation.service';
import { UserServiceFireBase } from './../service/core/user.service';
import { PointService } from './../service/point/point.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/Model/Utilisateur';
import { ChecklistService } from '../service/checklist/checklist.service';
import { Checklist } from '../model/Model/Checklist';
import { Reservation } from '../model/Model/Reservation';
import { scrollIntoView } from 'seamless-scroll-polyfill';
import { EmailService } from '../service/email/email.service';
// import '../../assets/js/smtp.js';
declare let Email : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User
  users: User[];

  checklists: Array<Checklist>
  reservations: Reservation[]
  is_first_reservation = false
  checklist_add = false
  @ViewChild(ToastComponent) toast_c: ToastComponent

  constructor(private userServiceFireBase: UserServiceFireBase,
    private checklistService: ChecklistService,
    private emailService: EmailService,
    private httpClient : HttpClient,
    private reservationService: ReservationService,
    private sharedService : SharedService,
    private userService: UserService) { }

  ngOnInit(): void {

    // this.emailService.sendMail({ "email": 'bsomkwe@gmail.com',
    // "subject": "Commande",
    // "content": "Votre reservation à été prise en compte"}).subscribe(r => {})


     localStorage.removeItem("reservation")

    this.user = this.userServiceFireBase.getCurrentUser();
    if(this.user){
      this.checklistService.get({user_id:this.user.id}).subscribe(result =>{
        console.log(result)
        this.checklists = result
        this.userService.get({joined: 1}).subscribe(users=>{
          console.log(users)
          this.users = users
        })
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
    }

  }

  openCreateChecklist(d:string){
    let  params = new HttpParams();
    params.append('mail','nogohbrice@gmail.com')

    this.httpClient.get<any>('http://localhost/wordpress/wp-content/plugins/price-per-unit/price-per-unit.php' ,{params}).subscribe(r => console.log(r))
    // return
    if(!this.user){
      this.toast_c.open("Be Sommewhere", "Vous devez être connecté avant de continuer")
      return
    }
    this.checklist_add = true
    setTimeout(() => {
      // this.scrollToTop(d)
      this.sharedService.scroll(d,-100)
    }, 100);
  }
  wantAddNewCheklist(d:string){
    this.checklist_add = true
    setTimeout(() => {
      this.sharedService.scroll(d,-100)
      // this.scrollToTop(d)
    }, 100);
    // this.scrollToTop()
  }

  scrollToTop(di: any = null) {
    const yOffset = -100;
    const element = document.querySelector(di);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' })

    if(!di)
      di = 'container_home';

    setTimeout(() => {
      //@ts-ignore
      scrollIntoView(document.querySelector("#target"), { behavior: "smooth", block: "center", inline: "center" });
      // scrollIntoView(document.querySelector("#"+di), { behavior: "auto", block: "start"});
      if(di === 'container_home')
        window.scrollTo(0, 0)
    }, 500);
  }

  sendMail(){

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'bsomkwe@gmail.com',
      Password : '91E89548269642D4B6D76AFE1D4E5563E404',
      To : 'nogohlionel@gmail.com',
      From : 'bsomkwe@gmail.com',
      Subject : 'this.model.subject',
      Body : '<a href="http://google.com"> dddddddddddddd </a>'
      }).then( message => {alert(message);} );


      //@ts-ignore
  (<HTMLInputElement>document.getElementById('name_')).value = "Nogoh Somkwe Lionel Brice";

  (<HTMLInputElement>document.getElementById('email_')).value =  'nogohbrice@gmail.com';
  (<HTMLInputElement>document.getElementById('message_')).value = 'Message';
  // alert((<HTMLInputElement>document.getElementById('email_')).value);

  console.log('this.texteToSend  ', (<HTMLInputElement>document.getElementById('message_')).value);
  // (<HTMLInputElement>document.getElementById('sumitMail')).click()
  }

}
