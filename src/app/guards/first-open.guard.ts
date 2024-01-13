import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstOpenGuard  {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem('firstOpen')) {
      return true;
    } else if(localStorage.getItem('firstOpen')){
      if(localStorage.getItem('user')){
        this.router.navigateByUrl('/home/first');

      }else {
        this.router.navigateByUrl('/register');
      }
      return false;
    }
  }
}
