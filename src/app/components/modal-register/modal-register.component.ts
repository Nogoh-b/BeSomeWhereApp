import { ToastComponent } from './../../shared/toast/toast.component';
import { User } from './../../model/Model/Utilisateur';
import { AuthService } from './../../service/core/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { CountriesService } from 'src/app/service/countries/countries.service';
import firebase from 'firebase/compat/app';
import { EmailService } from 'src/app/service/email/email.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  registerForm: FormGroup
  error = ''
  isLoading = false
  submited = false
  countries : any[]
  users:User[]
  bookingConfirmationText: string = `<p><strong>Dear passenger,</strong></p><p><strong><em><u>Your reservation has been successfully recorded</u></em></strong><strong>/ <u>Votre r&eacute;servation a bien &eacute;t&eacute; prise en compte</u>.<br /><br /></strong><em>You can check the departure and arrival addresses in the section &lsquo;My Current trip' on your Besomewhereapp.com account.</em><br /> Il vous est possible de consulter l&rsquo;adresse de d&eacute;part et d&rsquo;arriv&eacute; dans la rubrique &laquo;&nbsp;Mes trajets en cours&nbsp;&raquo; sur votre compte Besomewhereapp.com</p><p><em>We remind you that it is mandatory for the passenger to be present precisely at the address mentioned up to 15 minutes before the scheduled departure time<br /></em>Nous rappelons qu&rsquo;il est obligatoire pour le passager de se pr&eacute;senter pr&eacute;cis&eacute;ment devant l&rsquo;adresse mentionn&eacute; jusqu&rsquo;&agrave; 15 minutes avant l&rsquo;heure de passage.</p><p><em>If you have selected 'Come to My Door' option, you will be contacted within 12 hours following the reservation and 10 minutes before the driver arrives.</em><br /> Si vous avez s&eacute;lectionn&eacute; l&rsquo;option &laquo;&nbsp;venir jusqu&rsquo;&agrave; ma porte&nbsp;&raquo; vous serez contact&eacute;, dans les 12h suivant la r&eacute;servation et 10 minutes avant le passage du conducteur.</p><p><em>You must be in front of the address before the driver arrives; otherwise, he will not be able to pick you up. The driver is not authorized to wait for the passenger as it would cause delays for all passengers. It is your responsibility to ensure that you can be reached by local phone number </em><em>WhatsApp, Telegram, or Signal </em><em>&nbsp;:</em><br /> Vous devez &ecirc;tre devant l&rsquo;adresse avant l&rsquo;arriv&eacute;e du conducteur, autrement il ne pourra pas vous r&eacute;cup&eacute;rer. Le conducteur n&rsquo;a aucune autorisation pour attendre le passager car cela occasionnera du retard pour tous les passagers. Il est de votre responsabilit&eacute; de vous assurer d&rsquo;&ecirc;tre joignable<strong> avec un num&eacute;ro local, whattaps, telegram ou signal.</strong></p><p><strong><em>If your starting point is an airport or a train station, <u>click here for more information</u></em></strong><br /><strong>Si votre point de d&eacute;part est un a&eacute;roport /gare <u>Cliquez ici pour plus d&rsquo;informations</u></strong></p><p><strong>We remind you that Besomewhere is not in control of the traffic; it cannot be held responsible for traffic slowdowns or road closures. It is the responsibility of the traveler to allow for sufficient margin with the time of their fligh.</strong><strong><br /> Nous rappelons que Besomewhere n&rsquo;est pas maitre de la route, il ne pourra &ecirc;tre tenu responsable pour un ralentissement de la circulation ou une route ferm&eacute;. Il est de la responsabilit&eacute; du voyageur de prendre suffisamment de marge avec l&rsquo;heure de son vol</strong></p><p><strong><em>We also remind passengers that it is recommended to allow for a margin of at least one hour between the landing time of the flight and the departure time of the Besomewhere transport, which must start on time without any condition, in order to avoid accumulating delays. The passenger may then be accommodated for the next departure, provided there is a available seat, if the delay can be proven due to a flight-related reason.<br /></em>Nous rappelons &eacute;galement qu'Il est recommand&eacute; pour le passager de prendre une marge d&rsquo;au moins une heure entre l&rsquo;heure d&rsquo;atterrissage du vol et l&rsquo;heure de d&eacute;part du transport Besomewhere qui devra sans condition d&eacute;marrer &agrave; l&rsquo;heure, dans le but de ne pas accumuler de retard. Le passager pourra alors &ecirc;tre r&eacute;cup&eacute;r&eacute; pour le prochain d&eacute;part &agrave; condition d&rsquo;avoir une place de disponible si le retard peut &ecirc;tre prouv&eacute; pour cause de vol.</strong></p><p><strong><em>You can find our sales, support, and cancellation policy in our <u>general terms and conditions of sale</u><br /></em>Vous pouvez retrouver notre politique de vente, de prise en charge et d&rsquo;annulation dans nos <u>conditions de vente g&eacute;n&eacute;rales</u></strong></p><p><strong>And especially to not forget anything, use our help to pack your suitcase<br /> Et surtout pour ne rien oubliez utiliser notre aider pour faire votre valise</strong></p><p><strong><em>For any questions, please contact"<br /></em>Pour toute question adressez-vous &agrave; <br /></strong><a href="mailto:Besomewhere.contact@gmail.com"><strong>Besomewhere.contact@gmail.com</strong></a></p><p><strong><br /></strong><strong>Wherever you are, Besomewhere is with you</strong><strong><br /> Partout o&ugrave; vous &ecirc;tes il y&rsquo;a Besomewhere avec vous </strong></p><p><strong>Besomewhere </strong></p>`;
  @ViewChild(ToastComponent) toast_c : ToastComponent
  constructor(private fb : FormBuilder, 
    public authService: AuthService, 
    public userService: UserService, 
    public emailService: EmailService, 
    private countriesService: CountriesService) { }

  ngOnInit(): void {
    // console.log(localStorage.getItem('user')).
    // this.authService.SendVerificationMail()

    this.createForm()
    this.userService.get().subscribe(res =>this.users = res)
    this.countriesService.getCountry().subscribe(result =>{
      this.countries = result

    })
  }
  createForm(){
    // this.userService.post({email: 'nogohbrice@gmail.com'}).subscribe(res =>{
    //   console.log('user save ', res)
    // })
    this.registerForm = this.fb.group({})
    this.registerForm.addControl('email', new FormControl('',  Validators.required));
    this.registerForm.addControl('password', new FormControl('',  Validators.required));
    this.registerForm.addControl('name', new FormControl('',  Validators.required));
    this.registerForm.addControl('first_name', new FormControl('',  Validators.required));
    this.registerForm.addControl('last_name', new FormControl('',  Validators.required));
    this.registerForm.addControl('gender', new FormControl('0',  Validators.required));
    this.registerForm.addControl('phone', new FormControl('',  [Validators.required]));
    this.registerForm.addControl('cur_country', new FormControl('',  [Validators.required]));
    // this.registerForm.addControl('phone', new FormControl('',  [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res =>{
      console.log('connexion réussi', res)
      this.isLoading = false
      // this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res =>{
      console.log('connexion réussi', res)
      this.isLoading = false
      // this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      let user = new User()
      user.email = res.additionalUserInfo.profile.email
      user.first_name = res.additionalUserInfo.profile.family_name
      user.last_name = res.additionalUserInfo.profile.given_name
      user.name = res.additionalUserInfo.profile.name
      user.image = res.additionalUserInfo.profile.picture
      // user.email_verified_at = res.additionalUserInfo.profile.verified_email
      console.log('inscrption réussi', res.additionalUserInfo.profile)
      this.saveUser(user)
      // this.authService.SendVerificationMail()
      return
      // this.router.navigate(['/user']);
    }, err =>{
      this.toast_c.open("Be Somewhere", "Erreur de connexion par facebook veuillez reésayer")
       console.log(err)
      }
    )
  }

  tryRegister(value){
    this.submited = true
    this.error = ''
    if(!this.registerForm.valid){
      console.log("Be Somewhere", "Des champs sont mals remplis ou vides")
      this.toast_c.open("Be Somewhere", "Des champs sont mals remplis ou vides")
      this.error = 'Des champs sont mals remplis ou vides'
      return
    }
    const indexName = this.users.findIndex(user => user.name === value.name);
    if (indexName !== -1) {
        this.toast_c.open("Be Somewhere", "Nom d'utilisateur déja pris");
      this.error = 'Nom d\'utilisateur déja pris'
      console.log("Be Somewhere", "Nom d'utilisateur déja pris");
        return;
    }

    const indexEmail = this.users.findIndex(user => user.email === value.email);
    if (indexEmail !== -1) {
        this.toast_c.open("Be Somewhere", "Email déja pris");
      this.error = 'Email déja pris'
      console.log("Be Somewhere", "Email déja pris", this.users[indexEmail].email ,'=== ',value.email, ' ', indexEmail);
        console.log(this.users);
        return;
    }
    // for (const user of this.users) {
    //   if(user.name === value.name){
    //     this.toast_c.open("Be Somewhere", "Nom d'utilisateur déja pris")
    //     console.log("Be Somewhere", "Nom d'utilisateur déja pris")
    //     // alert('Nom pris')
    //     return
    //   }
    //   if(user.email === value.email){
    //     this.toast_c.open("Be Somewhere", "Email déja pris")
    //     // alert('Email pris')
    //     console.log("Be Somewhere", "Email déja pris", user.email ,'=== ',value.email)
    //     console.log(this.users)
    //     return
    //   }
    // }

    this.isLoading = true
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.isLoading = false
      console.log('inscrption réussi', res)
      this.emailService.sendMail({ "email": value.email,
      "subject": "Inscription / Register",
      "content": this.bookingConfirmationText}).subscribe(r => {
        // alert('vv')
          this.saveUser(value)
      })
    }, err => {
      this.isLoading = false
      this.toast_c.open("Be Somewhere",err);
    })
  }

  saveUser(value){
    this.userService.post(value).subscribe(res =>{
      console.log('user save ', res)
      this.isLoading = false
      this.toast_c.open('Be Somewhere','Votre compte à bien été crée')
      localStorage.removeItem('first_reservation')
      window.location.reload()
      localStorage.setItem('user',JSON.stringify(res))
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
