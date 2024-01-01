import { ToastComponent } from './../shared/toast/toast.component';
import { Injectable, ViewChild } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @ViewChild(ToastComponent) toast_c : ToastComponent
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('user')  ) {
       // alert(localStorage.getItem('user'));
       return true;
       this.toast_c.open('Be Somewhere', 'Veuillez vous connecter avant de continuer')
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
