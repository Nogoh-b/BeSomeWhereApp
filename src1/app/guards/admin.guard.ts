import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfServiceAdmin } from '../admin/service/conf-admin/conf.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userServiceFireBase: UserServiceFireBase,
    private confService: ConfServiceAdmin,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.userServiceFireBase.getCurrentUser();
      this.confService.getConf().subscribe(r =>{
        //@ts-ignore
          r.emails_admin.forEach(element => {
            if(user && element === user.email)
              return true
          });
          this.router.navigateByUrl('/')
          return false
    })
    return true
  }

}
