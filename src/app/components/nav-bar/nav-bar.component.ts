import { User } from './../../model/Model/Utilisateur';
import { AuthService } from './../../service/core/auth.service';
import { UserServiceFireBase } from './../../service/core/user.service';
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ConfServiceAdmin } from 'src/app/admin/service/conf-admin/conf.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isConnected: boolean
  user: User
  isAdmin =false
  constructor(private userServiceFireBase: UserServiceFireBase,
    private authService: AuthService,
    private modalService: BsModalService,
     private confService: ConfServiceAdmin,
    private router: Router) { }


    modalRef: BsModalRef;

  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside);

    this.isConnected = this.userServiceFireBase.getCurrentUser() != undefined
    this.user = this.userServiceFireBase.getCurrentUser();
    this.confService.getConf().subscribe(r =>{
      r.emails_admin.forEach(element => {
        if(this.user && element === this.user.email)
          this.isAdmin =true
      });
    })

    window.onclick = function(event) {
      if (!event.target.matches('.dropdown-btn')) {
        var dropdownMenus = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdownMenus.length; i++) {
          var openDropdown = dropdownMenus[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }
  getU(){
    return this.userServiceFireBase.getCurrentUser();
  }
  navigate(route: string, params?: any){
    const navbarToggler = document.getElementById('navbarToggler2');
    navbarToggler.classList.remove('show');

    if(!this.user ){
      if(route === 'mes-checklists'){
        this.router.navigate(['checklist/creation'])
      }else
        document.getElementById("login_btn")?.click()
      return
    }
    this.router.navigate([route],{queryParams:params})
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

  openModal1(id: string){
    let elt = document.getElementById(id)
    elt.classList.add('show')
    elt.style.display = 'block'
  }
  toggleDropdown() {
    var dropdownMenu = document.getElementById("myDropdown");
    dropdownMenu.classList.toggle("show");
  }
  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent = null ) => {
    const target = event.target as HTMLElement;
    const navbarToggler = document.getElementById('navbarToggler2');
    const isClickInside = navbarToggler.contains(target);

    if (!isClickInside && navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show');
    }
  };

  // Optionally, add a method to toggle the navbar for better control
  toggleNavbar() {
    const navbarToggler = document.getElementById('navbarToggler2');
    navbarToggler.classList.toggle('show');
  }

}
