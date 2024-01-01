import { User } from './../../model/Model/Utilisateur';
import { AuthService } from './../../service/core/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  loginForm: FormGroup
  isLoading = false
  submited = false
  @ViewChild('btn_close') btn_close: ElementRef;
  @ViewChild(ToastComponent) toast_c : ToastComponent

  constructor(private fb : FormBuilder, public authService: AuthService, public userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.createForm()
  }
  closeModal(){
    this.btn_close.nativeElement.click()
  }
  createForm(){
    this.loginForm = this.fb.group({})
    this.loginForm.addControl('email', new FormControl('',  Validators.required));
    this.loginForm.addControl('password', new FormControl('',  Validators.required));
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      // this.router.navigate(['/user']);
      console.log('connexion réussi')
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      // this.router.navigate(['/user']);
      console.log('connexion réussi')
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      let user = new User()
      user.email = res.additionalUserInfo.profile.email
      user.first_name = res.additionalUserInfo.profile.family_name
      user.last_name = res.additionalUserInfo.profile.given_name
      user.name = res.additionalUserInfo.profile.name
      user.image = res.additionalUserInfo.profile.picture
      // user.email_verified_at = res.additionalUserInfo.profile.verified_email
      this.getUser(user)
      // this.router.navigate(['/user']);
      console.log('connexion réussi', res.additionalUserInfo.profile)
    }, err => {
      console.log(err);
      this.toast_c.open("Be Somewhere",err);
    })
  }

  tryLogin(value){
    this.submited = true
     if(!this.loginForm.valid){
       this.toast_c.open("Be Somewhere", "Des champs sont mals remplis ou vides")
       return
     }
    this.isLoading = true
    // if(!this.loginForm.valid)
    //   alert('error')
    //   return
    this.authService.doLogin(value)
    .then(res => {
      // this.router.navigate(['/user']);
      this.getUser(value)
      console.log('connexion réussi', res)

    }, err => {
      console.log(err);
      this.isLoading = false
      this.toast_c.open("Be Somewhere",err);
    })
  }

  getUser(value: User){
    this.userService.get({email: value.email}).subscribe(res =>{
      console.log('user save ', res)
      this.isLoading = false
      if(res.length > 0){
        localStorage.setItem('user',JSON.stringify(res[0]))
        window.location.reload()
        // console.log(localStorage.getItem('user'))
        this.route.navigateByUrl('/')
        // this.closeModal()
      }
      else{
        console.log('user not registered')
        this.toast_c.open("Be Somewhere",'Vous n\'êtes pas enregistré !');
      }
    })
  }
  openModal1(id: string){
    let elt = document.getElementById(id)
    elt.classList.add('show')
    elt.style.display = 'block'
  }
}
