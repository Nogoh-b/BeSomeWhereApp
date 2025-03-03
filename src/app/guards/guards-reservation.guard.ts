import { ToastComponent } from './../shared/toast/toast.component';
import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardReservation  {
  @ViewChild(ToastComponent) toast_c : ToastComponent
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return true
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type === 1  ) {
       // alert(localStorage.getItem('user'));
       return true;
       this.toast_c.open('Be Somewhere', 'Veuillez vous connecter avant de continuer')
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
