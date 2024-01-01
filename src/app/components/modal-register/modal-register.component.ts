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
      "subject": "Inscription",
      "content": "Merci de vous être inscrit"}).subscribe(r => {
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
