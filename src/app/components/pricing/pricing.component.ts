import { PaymentsService } from './../../service/payments/payments.service';
import { Component, OnInit, inject } from '@angular/core';
import { Payment } from 'src/app/model/Model/Payment';
import { ConfService } from 'src/app/service/conf/conf.service';
import { ReasonPayment } from 'src/global';
import { DataResumeProps, Item, StripCardComponent } from '../strip-card/strip-card.component';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  loading = false
  has_sucribed = false
  canVisible = true
  payment: Payment
  constructor(public paymentsService : PaymentsService,
  private confService: ConfService) { }
  price_article_suscribe = JSON.parse(localStorage.getItem("conf")).price_article_souscription
  resume_data : DataResumeProps = {total_price : 0, items : []}
  private dialog = inject(DialogService);

  ngOnInit(): void {
    this.confService.getConf()
  }
  openModal(){
    this.canVisible = false
    this.resume_data.total_price = this.price_article_suscribe.toFixed(2)
    let items: Item[] = []
    items.push({categorie:'Abonnement aux Articles',price: this.price_article_suscribe.toFixed(2), quantity : 1})
    this.resume_data.items = items
    console.log('payments_data ', this.resume_data)
    localStorage.setItem('payments_data',JSON.stringify(this.resume_data))
    const dialogRef = this.dialog.open(StripCardComponent, {
      data: {
        title: 'this.title',
      },
      size : 'fullScreen',
      onClose : () =>{
        console.log('closed')
      }
      
    });
    dialogRef.afterClosed$.subscribe((result) => {
      console.log(`After dialog has been closed ${result}`);
      this.canVisible = false
      if(result)
        this.submit()
    });
    const intervalId = setInterval(() => {
      const d = document.getElementsByClassName('ngneat-dialog-backdrop');
      const dc = document.getElementsByClassName('ngneat-dialog-content');
      
      if (d.length > 0) {
        // Arrêtez l'intervalle si la condition est remplie
        clearInterval(intervalId);
    
        // Modifiez le padding de l'élément
        (d[0] as HTMLElement).style.padding = '0';
        (dc[0] as HTMLElement).style.setProperty('border-radius', '0', 'important'); // Remplacez '10px' par la valeur de border-radius souhaitée
        (dc[0] as HTMLElement).style.setProperty('background', '#f9fafb', 'important'); // Remplacez '#f00' par la couleur de fond souhaitée
      }
    }, 1);
  }


  submit(){
  this.loading = true

    console.log(localStorage.getItem('user'))
    const data = {
      total: this.price_article_suscribe,
      reason: ReasonPayment.Article,
      id_r: 0,
      status: 1,
      user_id: JSON.parse(localStorage.getItem('user')).id,
      description: 'r'
    }
    // this.loading = false
    // return
    
    this.paymentsService.post(data).subscribe(res => {
      this.loading = true
      this.payment = res
    this.has_sucribed = true
      window.location.reload()
      console.log(res)
    })
  }
  getPreavisText(): string {
    const expirationDate = this.calculateExpirationDate(24); // 24 heures de délai
    const now = new Date();

    if (now < expirationDate) {
      const timeDiff = expirationDate.getTime() - now.getTime();
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      return `Vous avez jusqu'à ${expirationDate.toLocaleString()} pour effectuer votre paiement par PayPal ou virement bancaire`//. Il vous reste ${hoursDiff} heures et ${minutesDiff} minutes.`;
    } else {
      return 'Le délai pour effectuer votre paiement est expiré.';
    }
  }

  private calculateExpirationDate(hoursToAdd: number): Date {
    const expirationDate = new Date(this.payment.created_at);
    expirationDate.setHours(expirationDate.getHours() + hoursToAdd);
    return expirationDate;
  }
  reload(){
   window.location.reload()
  }
}
