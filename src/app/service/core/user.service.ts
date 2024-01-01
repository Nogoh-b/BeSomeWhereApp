import { User } from 'src/app/model/Model/Utilisateur';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class UserServiceFireBase {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ){
 }


  getCurrentUser(): User{
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
   /* return new Promise<any>((resolve, reject) => {
      var user = firebase.default.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })*/
  }

  updateCurrentUser(user){
    localStorage.setItem('user', JSON.stringify(user))
   /* return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })*/
  }
}
