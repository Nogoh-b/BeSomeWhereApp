import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { ConfServiceAdmin } from 'src/app/admin/service/conf-admin/conf.service';
import { stripe_pk } from 'src/global';

@Component({
  selector: 'app-strip-card',
  templateUrl: './strip-card.component.html',
  styleUrl: './strip-card.component.scss'
})

export class StripCardComponent {

 
  @Input() resume_data : DataResumeProps = {total_price : 0, items : []}
  @Input() p_key = stripe_pk
  contact_email = ''
  ref: DialogRef<Data, boolean> = inject(DialogRef);

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private confServiceAdmin: ConfServiceAdmin,
    private stripeService:AngularStripeService) {


    }
    ngOnInit(): void {
      this.resume_data = JSON.parse(localStorage.getItem('payments_data'))
      this.confServiceAdmin.getConf().subscribe(r =>{
        this.contact_email = r.contact_email
      })
      /*this.resume_data.total_price = 18.5
      let items: Item[] = []
      items.push({categorie:'Siège(s)',price:'15.00',quantity: 3})
      items.push({categorie:'Venir à ma porte',price:'17.00',quantity: 3})
      items.push({categorie:'Petits plaisirs',price:'20.00',quantity: 3})
      items.push({categorie:'Valise supplémentaire',price:'5.00',quantity: 3})
      items.push({categorie:'{{'baby_seat_option' | translate}}',price:'1.96',quantity: 3})
      this.resume_data.items = items*/
    }
    ngAfterViewInit() {

    }


  }
  
  export interface DataResumeProps{
    total_price :string | number,
    items : Item[]
  
  }
  export interface Item{
    categorie : string
    quantity: number
    price: string | number
  }
  export interface Data {
    title : string
  }