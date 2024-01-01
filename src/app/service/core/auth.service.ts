import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from  'firebase/app';
import firebase from 'firebase/compat/app';
import { UserServiceFireBase } from "./user.service";
import { User } from "src/app/model/Model/Utilisateur";

@Injectable()
export class AuthService {
  user: User
  constructor(
   public afAuth: AngularFireAuth,
   public userService: UserServiceFireBase
 ){
    this.user = userService.getCurrentUser()
 }

 resetPassword(email){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(res => {
      resolve(res);
    }, err => reject(err))
  })
  /*this.afAuth.auth
  .applyActionCode(code)
  .then(() => {
    // do something after successful verification
  })
  .catch(err => {
    // show error message
  });*/
 }

 doFacebookLogin(){
   return new Promise<any>((resolve, reject) => {
     let provider = new firebase.auth.FacebookAuthProvider();
     this.afAuth
     .signInWithPopup(provider)
     .then(res => {
       resolve(res);
     }, err => {
       console.log(err);
       reject(err);
     })
   })
 }
 delUser(){
   return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.delete();
    })
 }
  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }
  /*SendVerificationMail() {

    return this.afAuth.currentUser
      .then((user) => {
        return user.sendEmailVerification();
      })

  }*/
  doRegister(value){
    console.log(value.email, ' ', value.password)
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.signOut();
        localStorage.removeItem('user')
        resolve('');
      }
      else{
        localStorage.removeItem('user')
        resolve('');
        // reject();
      }
    });
  }


}
