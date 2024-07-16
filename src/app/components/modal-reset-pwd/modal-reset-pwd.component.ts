import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { AuthService } from './../../service/core/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-reset-pwd',
  templateUrl: './modal-reset-pwd.component.html',
  styleUrls: ['./modal-reset-pwd.component.css']
})
export class ModalResetPwdComponent implements OnInit {
  loading = false
  email_: string
  constructor(private authService: AuthService) { }
  @ViewChild(ToastComponent) toast_c : ToastComponent

  ngOnInit(): void {
  }
  g(e){
    this.email_ = e.target.value
    // console.log()
  }

  sendMail(email) {
    this.loading = true;
    console.log(this.email_);
    this.authService.resetPassword(email).then(response => {
      this.loading = false;
      this.toast_c.open('Be Somewhere', "Message envoyé, vérifiez votre boîte mail");
      setTimeout(() => {
        document.getElementById('close_btn')?.click();
      }, 3000);
    }).catch(error => {
      this.loading = false;
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      
      if (error.message.includes('auth/user-not-found')) {
        this.toast_c.open('Erreur', "Aucun utilisateur ne correspond à cet identifiant. L'utilisateur a peut-être été supprimé.");
      } else {
        this.toast_c.open('Erreur', "Une erreur s'est produite, veuillez réessayer.");
      }
    });
  }
  
  

}
