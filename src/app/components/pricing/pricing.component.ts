import { PaymentsService } from './../../service/payments/payments.service';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/Model/Payment';
import { ConfService } from 'src/app/service/conf/conf.service';
import { ReasonPayment } from 'src/global';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  loading = false
  has_sucribed = false
  payment: Payment
  constructor(public paymentsService : PaymentsService,
  private confService: ConfService) { }
  price_article_suscribe = JSON.parse(localStorage.getItem("conf")).price_article_souscription
  ngOnInit(): void {
    this.confService.getConf()
  }

  submit(){
  this.loading = true

    console.log(localStorage.getItem('user'))
    const data = {
      total: this.price_article_suscribe,
      reason: ReasonPayment.Article,
      id_r: 0,
      user_id: JSON.parse(localStorage.getItem('user')).id,
      description: 'r'
    }
    // this.loading = false
    // return
    
    this.paymentsService.post(data).subscribe(res => {
      this.loading = true
      this.payment = res
    this.has_sucribed = true
      // window.location.reload()
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
