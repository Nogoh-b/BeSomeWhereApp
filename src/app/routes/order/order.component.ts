import { ToastComponent } from './../../shared/toast/toast.component';
import { ReservationService } from './../../service/reservation/reservation.service';
import { Item_Drive } from './../../model/Model/Item_Drive';
import { RouteService } from 'src/app/service/route/route.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as globals from 'src/global';
import { Reservation } from 'src/app/model/Model/Reservation';
import { Passenger } from 'src/app/model/Model/Passenger';
import { EmailService } from 'src/app/service/email/email.service';
import { DialogService } from '@ngneat/dialog';
import { DataResumeProps, Item, StripCardComponent } from 'src/app/components/strip-card/strip-card.component';
declare let Email : any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  loading = false;
  curRoute : any;
  data : any;
  statusCard = globals.TrajetCardStatus.Ordering
  @ViewChild(ToastComponent) toast_c : ToastComponent
  reservation : Reservation = localStorage.getItem('reservation') && JSON.parse(localStorage.getItem('reservation'));
  price_take_to_home =  JSON.parse(localStorage.getItem("conf")).price_take_to_home
  email_admin = JSON.parse(localStorage.getItem("conf")).contact_email
  private dialog = inject(DialogService);
  private title = 'Paiement';
  resume_data : DataResumeProps = {total_price : 0, items : []}

  constructor(public route : Router, 
    public routeService : RouteService,
    public emailService: EmailService, 
     private reservationService: ReservationService) {
    this.data = JSON.parse(localStorage.getItem('reservation'))
    console.log(this.data)
    this.routeService.getRoute(this.data.route_id).subscribe(result =>{
      console.log(result, this.data);
      this.curRoute =  result;
    })
   }

  ngOnInit(): void {
    console.log(this.reservation)
  }
  takeAtHomeCount(passengers, take_at_home){
    return globals.total_take_at_homr(passengers, take_at_home)
  }
  openModal(){
    this.resume_data.total_price = this.getTotal().toFixed(2)
    let items: Item[] = []
    items.push({categorie:'reserved_seats',price: this.total_price_passenger(false).toFixed(2), quantity : this.total_passenger()})
    items.push({categorie:'come_to_my_door',price:(this.price_take_to_home * this.total_take_at_homr()).toFixed(2),quantity: this.total_take_at_homr()})
    items.push({categorie:'snack_service_souvenirs',price: this.total_price_meals().toFixed(2) ,quantity: this.total_meals()})
    items.push({categorie:'additional_suitcases',price:this.total_price_suitcase().toFixed(2),quantity: this.total_suitcase()})
    items.push({categorie:'baby_seat_option',price:this.total_price_babyseats().toFixed(2),quantity: this.total_babyseats()})
    this.resume_data.items = items
    console.log('payments_data ', this.resume_data)
    localStorage.setItem('payments_data',JSON.stringify(this.resume_data))
    const dialogRef = this.dialog.open(StripCardComponent, {
      data: {
        title: this.title,
      },
      size : 'fullScreen',
      onClose : () =>{
        console.log('closed')
      }
      
    });
    dialogRef.afterClosed$.subscribe((result) => {
      console.log(`After dialog has been closed ${result}`);
      if(result)
        this.buy()
    });
    const intervalId = setInterval(() => {
      const d = document.getElementsByClassName('ngneat-dialog-backdrop');
      const dc = document.getElementsByClassName('ngneat-dialog-content');
      
      if (d.length > 0) {
        // Arrêtez l'intervalle si la condition est remplie
        clearInterval(intervalId);
    
        // Modifiez le padding de l'élément
        (d[0] as HTMLElement).style.padding = '0';
        (dc[0] as HTMLElement).style.setProperty('border-radius', '0', 'important'); // Remplacez '10px' par la valeur de border-radius souhaitée
        (dc[0] as HTMLElement).style.setProperty('background', '#f9fafb', 'important'); // Remplacez '#f00' par la couleur de fond souhaitée
      }
    }, 1);
  }
  buy(){

        console.log(this.data, ' ', localStorage.getItem('user'))
        const user = JSON.parse(localStorage.getItem('user'))

        if(this.data.items){
          for (let index = 0; index < this.data.items.length; index++) {
            const element = this.data.items[index];
            element.item_id = element.id
          }
        }
        if(this.data.take_to_home_adr ==="")
          this.data.take_to_home_adr = "None"
        if(!this.data.take_to_home)
          this.data.take_to_home = 0
        this.data.passengers.forEach((passenger: Passenger, index) => {
            if(!passenger.take_at_home){
              passenger.birthday = ''
            }
        });
        // console.log(this.data)
    this.loading =true;
    this.routeService.getRoute(this.data.route_id).subscribe(result =>{
      console.log(result, this.data);
      this.curRoute =  result;
      if(!this.curRoute.for_disabled && Boolean(this.data.for_disabled)  ){
        console.log('place pour handicapé plus dispo', !this.curRoute.for_disabled ,' && ', Boolean(this.data.for_disabled) )
        this.toast_c.open('Be SomeWhere', 'Plus de place pour handicapé disponible')
        return
      }
      if(this.curRoute.places < this.data.passengers.length ){
        console.log('place pour handicapé plus dispo ', this.curRoute.places ,' < ', this.data.passengers.length )
        this.toast_c.open('Be SomeWhere', 'Plus assez de place disponible')
        return
      }
      if(!this.reservation.id){
        this.reservationService.post(this.data).subscribe(result =>{
          console.log(result, this.data)
          // this.loading = false
          this.toast_c.open('', 'Trajet réservé')
          localStorage.removeItem('reservation')
          this.toast_c.open("Be Somewhere", "reservation_confirmed")
          this.emailService.sendMail({ "email": user.email,
          "subject": "Commande",
          "content": "Votre reservation à été prise en compte"}).subscribe(r => {})
          if(localStorage.getItem('first_reservation')){
            setTimeout(() => {
              this.route.navigate(['/'])
            }, 1500);
          }
          else{
            setTimeout(() => {
              this.route.navigate(['/'], {queryParams:{r:true }})
            }, 1500);
          }
        })
      }else{
        this.reservationService.update(this.data, this.reservation.id).subscribe(result =>{
          console.log(result, this.data)
          this.toast_c.open('', 'Trajet Mis à jour')
          localStorage.removeItem('reservation')
          this.toast_c.open("Be Somewhere", "Reservation Mis à jour")
          // this.route.navigate(['/'], {queryParams:{r:true }})
          setTimeout(() => {
            this.route.navigate(['/'], {queryParams:{r:true }})
          }, 1500);
        })
      }
      // this.sendMail('Vous avez une nouvelle commande : <a href="'+globals.SERVER+'mes-trajets/'+result.id +'"> ' + result.id + '</a>')
    })


    //this.route.navigateByUrl('/')
  }
  sendMail(msg: string){

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'bsomkwe@gmail.com',
      Password : '91E89548269642D4B6D76AFE1D4E5563E404',
      To : 'nogohlionel@gmail.com',
      From : 'bsomkwe@gmail.com',
      Subject : 'this.model.subject',
      Body : msg
      }).then( message => {alert(message);} );


      //@ts-ignore
  (<HTMLInputElement>document.getElementById('name_')).value = "Nogoh Somkwe Lionel Brice";

  (<HTMLInputElement>document.getElementById('email_')).value =  'nogohbrice@gmail.com';
  (<HTMLInputElement>document.getElementById('message_')).value = 'Message';
  // alert((<HTMLInputElement>document.getElementById('email_')).value);

  console.log('this.texteToSend  ', (<HTMLInputElement>document.getElementById('message_')).value);
  // (<HTMLInputElement>document.getElementById('sumitMail')).click()
  }
  navigate(){

  }
  total_price_passenger(with_take_at_home: boolean  ){
    let somme = 0
    // alert(this.data.take_at_home)
    var sup = with_take_at_home ? JSON.parse(localStorage.getItem("conf")).price_take_to_home: 0
    let g: Passenger[] = this.data.passengers
    return g.length * (this.curRoute.price) + this.total_take_at_homr() * sup  
  }

  total_passenger(){
    let somme = 0
    let g: Passenger[] = this.data.passengers
    return g.length
    // let somme = 0
    // let g: Passenger[] = this.data.passengers
    // for (let passenger of g) {
    //     somme += passenger.quantity
    // }
  }
  total_take_at_homr(){
    let reservation_t = 0
    let passengers = this.data.passengers
    // console.log('route_passengers ', passengers)
    if(this.data.take_at_home) {
      reservation_t++; // Increment reservation_t si take_at_home est true
    }
    if (!passengers)
      return 0
    // console.log('reservation_t ',reservation_t); //Affiche le total de reservation_t
    passengers.forEach(passenger => {
        if(passenger.take_at_home) {
            reservation_t++; // Increment reservation_t si birthday n'est pas vide
        }
    })

// console.log('reservation_t ',reservation_t); //Affiche le total de reservation_t
return reservation_t
}
  total_price_meals(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Meal){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_meals(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.Meal){
        somme += item.quantity
      }
    }
    return somme
  }

  total_price_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.Suitcase){
          somme += item.quantity * item.price
        }
    }
    return somme
  }

  total_suitcase(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.Suitcase){
        somme += item.quantity
      }
    }
    return somme
  }

  total_price_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
        if(item.category === globals.ItemCategory.BabySeats){
          somme += item.quantity * item.price
        }
    }
    return somme
  }
  total_babyseats(){
    let somme = 0
    let items: Item_Drive[] = this.data.items
    for (let item of items) {
      if(item.category === globals.ItemCategory.BabySeats){
        somme += item.quantity
      }
    }
    return somme
  }

  getTotal(){

    return this.total_price_passenger(this.data.take_at_home != null) + this.total_price_babyseats()+ this.total_price_meals()+ this.total_price_suitcase()
  }
  get_new_total(){
    var nTotal = this.reservation.total ? Number(this.reservation.total ) : 0
    return (Number(this.getTotal()) + nTotal)
    // return (Number(this.getTotal()) - Number(this.reservation.total )+ sup )
  }
  is_for_update(){
    return this.reservation.id || this.reservation.id === 0
  }
}
