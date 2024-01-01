import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/Model/Utilisateur';
import { AuthService } from 'src/app/service/core/auth.service';
import { UserServiceFireBase } from 'src/app/service/core/user.service';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})
export class NavBarAdminComponent implements OnInit {

  isConnected: boolean
  user: User
  constructor(private userServiceFireBase: UserServiceFireBase,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.isConnected = this.userServiceFireBase.getCurrentUser() != undefined
    this.user = this.userServiceFireBase.getCurrentUser();

  }
  logout(){
    this.authService.doLogout().then(res => {
      // this.router.navigate(['/user']);
      // this.route.
      console.log('deconnexion réussi', res)
      this.isConnected = false
      window.location.reload()
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
    })
  }

}
