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
import { User } from 'src/app/model/Model/Utilisateur';
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
  // text_mail_for_reservation = '<p><strong>Dear passenger, <br /><br /> Welcome to the BESOMEWHERE community you are ready to embark to an incredible adventure with our platform that will assists you throughout your entire journey.<br /> From your departure to your return commitment is our motto.<br /> Bienvenue dans communaut&eacute; Besomewhere, vous &ecirc;tes pr&ecirc;t &agrave; commencer une aventure incroyable gr&acirc;ce &agrave; notre plateforme qui vous assiste durant toute la dur&eacute;e de votre voyage. De votre d&eacute;part, &agrave; votre retour, engagement est notre mot d&rsquo;ordre.</strong></p><p><strong>Start by booking your ride to the airport by <a href="https://besomewhereapp.com/#/trajets/creation/1" target="_blank">clicking here</a>.<br /> Commencer par r&eacute;server votre trajet vers l\'a&eacute;roport en <a href="https://besomewhereapp.com/#/trajets/creation/1" target="_blank">cliquant ici</a>.<br /><br /></strong><strong>But that\'s not all; don\'t rush too quickly. Besomewhere also helps you prepare and organize your suitcases through the free suitcase preparation assistance service accessible <u>by <a href="https://besomewhereapp.com/#/checklist/creation" target="_blank">clicking here</a></u></strong><u>.<br /></u><strong>Ce n\'est pas tout ne partez pas trop vite Besomewhere vous aide &eacute;galement &agrave; pr&eacute;parer et organiser vos valises via le service gratuit d\'aide &agrave; la pr&eacute;paration de valise accessible en <a href="https://besomewhereapp.com/#/checklist/creation" target="_blank">cliquant ici</a></strong></p><p><strong>This way, you can travel in peace while reading our travel tips based on your destination, during your journey, in the articles section accessible here."<br /> Vous pourriez ainsi voyager en paix tout en lisant nos conseils de voyage en fonction de votre destination, pendant votre trajet, dans la rubrique articles accessible ici.</strong></p><p><strong><em>For any questions, please contact"<br /></em>Pour toute question adressez-vous &agrave; <br /></strong><a href="mailto:Besomewhere.contact@gmail.com"><strong>Besomewhere.contact@gmail.com</strong></a></p><p><strong><br /></strong><strong>Wherever you are, Besomewhere is with you</strong><strong><br /> Partout o&ugrave; vous &ecirc;tes il y&rsquo;a Besomewhere avec vous </strong></p><p><strong>Besomewhere </strong></p>'
  resume_data : DataResumeProps = {total_price : 0, items : []}
  text_mail_for_reservation: string = `<p><strong>Dear passenger,&nbsp;<br /><span style="color: #3366ff;">Cher passagers</span>&nbsp;</strong></p><p><strong><em>Your reservation has been taken into account; however, i</em></strong><strong>t will be confirmed upon receipt of the proof of transfer to the following account&nbsp; :<br /></strong><strong><span style="color: #3366ff;">Votre r&eacute;servation a &eacute;t&eacute; prise en compte, cependant elle sera confirm&eacute;e d&egrave;s la r&eacute;ception de la preuve de virement &nbsp;sur le compte&nbsp; suivant :<br /><br /></span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong><strong><u><br /></u></strong></p><p><strong>Send the proof on the emai<u>l</u></strong> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a><strong><u>&nbsp;&nbsp;</u></strong></p><p><span style="color: #3366ff;"><strong>Envoyer la preuve sur l&rsquo;email</strong></span> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a>&nbsp;</p><p style="text-align: center;"><strong><u>&nbsp;</u></strong></p><p><strong>-&gt;If you decide to pay in cash,&nbsp; to confirm your reservation also send a message to&nbsp;&nbsp;<a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a>&nbsp;</strong></p><p><strong>With&nbsp; the reservation name and the note "<span style="text-decoration: underline;">I am paying with cash."&nbsp;</span>&nbsp;Please note that paying cash&nbsp; incur an additional fee of &euro;5.&nbsp;</strong></p><p><strong>&nbsp;<span style="color: #3366ff;">-&gt;Si vous payez avec du cash, pour confirmer votre r&eacute;servation, envoyez aussi un message &agrave;&nbsp;</span><span style="text-decoration: underline;"><span style="color: #3366ff; text-decoration: underline;"><a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a></span></span></strong></p><p><strong><span style="color: #3366ff;">En Indiquant le nom de la r&eacute;servation&nbsp; avec la mention&nbsp; <span style="text-decoration: underline;">&laquo; je paie en cash &raquo;.</span>&nbsp;</span>&nbsp;<span style="color: #3366ff;">Veuillez noter que le paiement en esp&egrave;ces entra&icirc;ne des frais suppl&eacute;mentaires de 5 &euro;.</span></strong></p><p>&nbsp;</p><h3><span style="text-decoration: underline; color: #ff0000;"><strong>You must do it within a maximum of one hour,&nbsp;otherwise your reservation may be cancelled.</strong></span></h3><h3><span style="text-decoration: underline;"><span style="color: #3366ff; text-decoration: underline;"><strong><span style="color: #ff0000; text-decoration: underline;">&nbsp;</span><span style="color: #ff0000; text-decoration: underline;">Vous devez le faire dans un d&eacute;lai de maximum une heure,&nbsp;&nbsp;sous&nbsp; peine de voir votre r&eacute;servation annul&eacute;</span>.</strong></span></span></h3><p>&nbsp;</p><p>&nbsp;</p><h1 style="text-align: center;"><strong>Instructions</strong>&nbsp;</h1><h4><u></u><br /> <strong><em>You can check the departure and arrival addresses in the section &lsquo;My Current trip' on your Besomewhereapp.com account.&nbsp;<br /></em></strong><span style="color: #3366ff;"><strong>Il vous est possible de consulter l&rsquo;adresse de d&eacute;part&nbsp; et d&rsquo;arriv&eacute; dans la rubrique &laquo;&nbsp;Mes trajets en cours&nbsp;&raquo; sur votre compte Besomewhereapp.com</strong></span></h4><h4><span style="text-decoration: underline;"><strong><em><span style="color: #800000; text-decoration: underline;">We remind you that it is mandatory for the passenger to be present precisely at the address mentioned up to 15 minutes before the scheduled departure time.</span><br /></em></strong><span style="color: #ff0000; text-decoration: underline;"><strong>Nous rappelons qu&rsquo;il&nbsp; est obligatoire pour le passager de se pr&eacute;senter pr&eacute;cis&eacute;ment devant&nbsp; l&rsquo;adresse mentionn&eacute; jusqu&rsquo;&agrave; 15 minutes avant l&rsquo;heure de passage.</strong></span></span></h4><h4><strong><em>If you have selected 'Come to My Door' option, you will be contacted within 12 hours following the reservation and 10 minutes before the driver arrives.<br /></em></strong><span style="color: #3366ff;"><strong>Si vous avez s&eacute;lectionn&eacute; l&rsquo;option &laquo;&nbsp;venir jusqu&rsquo;&agrave; ma porte&nbsp;&raquo; vous serez contact&eacute;,&nbsp; dans les 12h suivant la r&eacute;servation et 10 minutes avant le passage du conducteur.</strong></span></h4><h4><strong><em>You must be in front of the address before the driver arrives; otherwise, he will not be able to pick you up. The driver is not authorized to wait for the passenger as it would cause delays for all passengers. It is your responsibility to ensure that you can be reached by local phone number</em> <em>WhatsApp, Telegram, or Signal</em> <em>&nbsp;:<br /></em></strong><span style="color: #3366ff;"><strong>Vous devez &ecirc;tre devant l&rsquo;adresse avant l&rsquo;arriv&eacute;e du conducteur, autrement il ne pourra pas vous r&eacute;cup&eacute;rer. &nbsp;Le conducteur n&rsquo;a aucune autorisation pour attendre le passager car cela occasionnera du retard pour tous les passagers. Il est de votre responsabilit&eacute; de vous assurer <u>d&rsquo;&ecirc;tre joignable avec un num&eacute;ro local, whattaps, telegram ou signal.</u></strong></span></h4><h4><strong><em>If your starting point is an airport or a train station,</em> </strong><span style="text-decoration: underline;"><a href="https://besomewhereapp.com/#/served-routes" target="_blank"><em>click here for more information</em></a></span><br /><strong><span style="color: #3366ff;"> Si votre point de d&eacute;part est un a&eacute;roport /gare </span><a href="https://besomewhereapp.com/#/served-routes" target="_blank">Cliquez ici pour plus d&rsquo;informations</a></strong></h4><h4><strong>We remind you that Besomewhere is not in control of the traffic; it cannot be held responsible for traffic slowdowns or road closures. It is the responsibility of the traveler to allow for sufficient margin with the time of their fligh.<br /></strong><span style="color: #3366ff;"><strong>Nous rappelons que Besomewhere n&rsquo;est pas maitre de la route, il ne pourra &ecirc;tre tenu responsable pour&nbsp; un ralentissement de la circulation ou une route ferm&eacute;. Il est de la responsabilit&eacute; du voyageur de prendre suffisamment de marge avec l&rsquo;heure de son vol.</strong></span></h4><h4><strong><em>We also remind passengers that it is recommended to allow for a margin of at least one hour between the landing time of the flight and the </em></strong><em>departure time of the Besomewhere transport. Besomewhere must start on time without any condition, in order to avoid accumulating</em><em> delays. The passenger may then be accommodated for the next departure, provided if there iq a available seat&nbsp; and if the delay can be proven due to a flight-related reason.<br /></em><span style="color: #3366ff;"><strong>Nous rappelons &eacute;galement qu'Il est recommand&eacute; pour le passager de prendre une marge d&rsquo;au moins une heure entre l&rsquo;heure d&rsquo;atterrissage du vol et l&rsquo;heure de d&eacute;part du transport Besomewhere qui devra sans condition d&eacute;marrer &agrave; l&rsquo;heure, dans le but de ne pas accumuler de retard. Le passager pourra alors &ecirc;tre r&eacute;cup&eacute;r&eacute; pour le prochain d&eacute;part &agrave; condition d&rsquo;avoir une place de disponible si le retard peut &ecirc;tre prouv&eacute; pour cause de vol.</strong></span></h4><h4><strong>&nbsp;</strong><strong><em>You can find our sales, support, and cancellation policy in our</em> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank"><em>general terms and conditions of sale</em></a><em><br /></em> <span style="color: #3366ff;">Vous pouvez retrouver notre politique de vente, de prise en charge et d&rsquo;annulation dans nos</span> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank">conditions de vente g&eacute;n&eacute;rales</a></strong></h4><h4><strong>And especially to not forget anything, use our <a href="https://besomewhereapp.com/#/mes-checklists?archived=false" target="_blank">help to pack your suitcase</a></strong><br /><span style="color: #3366ff;"><strong> Et surtout pour ne rien oubliez utiliser notre <a href="https://besomewhereapp.com/#/mes-checklists?archived=false" target="_blank">aide pour faire votre valise</a>,</strong></span></h4><p>&nbsp;</p><p><strong><em>For any questions, please contact"</em></strong></p><p><span style="color: #3366ff;"><strong> Pour toute question adressez-vous&nbsp; &agrave;</strong></span></p><p><br /><span style="color: #3366ff;"><strong> <a style="color: #3366ff;" href="mailto:Besomewhere.contact@gmail.com">Besomewhere.contact@gmail.com</a></strong></span></p><h4><br /><strong> Wherever you are, Besomewhere is with you</strong><br /><span style="color: #3366ff;"><strong> Partout o&ugrave; vous &ecirc;tes il y&rsquo;a Besomewhere avec vous</strong></span></h4><h4><strong>Besomewhere</strong></h4><h4><strong>&nbsp;</strong></h4>`;

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
  //       this.emailService.sendMail({ "email": ' bsomkwe@gmail.com',
  //   "subject": "Commande / Order",
  //   "content": this.text_mail_for_reservation}).subscribe(r => {})
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
        const user : User = JSON.parse(localStorage.getItem('user'))

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
        this.data.status = parseInt(localStorage.getItem('reservation_payment_type'))
        console.log('reservation___ ', this.reservation) 
 
        this.reservationService.post(this.data).subscribe(result =>{
          console.log('order___ ',result)
          
          // console.log(result, this.data)
          // this.loading = false
          
          
          //envvoi mail client
          this.toast_c.open('', 'Trajet réservé')
          localStorage.removeItem('reservation')
          this.toast_c.open("Be Somewhere", "reservation_confirmed")
          this.emailService.sendMail({ "email": user.email,
          "subject": "Commande / Order",
          "content": this.text_mail_for_reservation}).subscribe(r => {})

          //envvoi mail Admin
          const admin_email_content = this.constructEmailMessage('', user.first_name + ' '+user.last_name,user.email,
            user.phone, 
            this.curRoute.starting_date,  
            '5', 
            this.curRoute.points[0].address + '- '+this.curRoute.points[0].country, 
            this.curRoute.points[1].address + '- '+this.curRoute.points[1].country,
            this.total_passenger(),
            result.id_car,
            'Admin', result.take_at_home,'BesomeWhere'
          )
          console.log(admin_email_content)
          this.emailService.sendMail({ "email": 'besomewhere.contact@gmail.com',
            "subject": "Commande / Order",
            "content": admin_email_content}).subscribe(r => {})



          if(localStorage.getItem('first_reservation')){
            setTimeout(() => {
              this.route.navigate(['/'])
              // this.route.navigate(['/'], {queryParams:{r:true }})
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



  constructEmailMessage(
    adminName: string, 
    clientName: string, 
    clientEmail: string, 
    clientPhone: string, 
    departureDate: string, 
    id: string, 
    departurePoint: string, 
    destination: string, 
    passengers: number, 
    id_car: string, 
    yourName: string, 
    take_at_home: boolean, 
    yourCompany: string
  ): string {
    return `
      <p>Bonjour <strong>${adminName}</strong>,</p>
      <p>Nous vous informons qu'un nouveau trajet a été réservé par un client. Voici les détails de la réservation :</p>
      <h2>Informations sur la reservation N° ${id} pour le transport ${id_car} :</h2>
      <ul>
        <li><strong>Nom :</strong> ${clientName}</li>
        <li><strong>Email :</strong> ${clientEmail}</li>
        <li><strong>Téléphone :</strong> ${clientPhone}</li>
      </ul>
      <h2>Détails du trajet :</h2>
      <ul>
        <li><strong>Date de départ :</strong> ${departureDate}</li>
        <li><strong>Point de départ :</strong> ${departurePoint}</li>
        <li><strong>Destination :</strong> ${destination}</li>
        <li><strong>Nombre de passagers :</strong> ${passengers}</li>
        <li><strong>Option venir à ma porte :</strong> ${take_at_home ? 'Oui' : 'Non' }</li>
      </ul>

      <p>Merci de prendre les mesures nécessaires pour confirmer cette réservation et d'assurer que tout soit prêt pour le départ du client.</p>
      <p>Cordialement,</p>
      <p>${yourName}<br>
      ${yourCompany}</p>
    `;
    // <li><strong>Heure de départ :</strong> ${departureTime}</li>

  }
}
