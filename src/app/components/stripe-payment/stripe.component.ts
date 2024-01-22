import { HttpClient } from '@angular/common/http';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import  { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms"
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { stripe_url } from 'src/global';

@Component({
  selector: 'stripe-payment',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  stripe;
  loading = false;
  confirmation;

  card: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  cardType: string = '';
  checkoutForm: FormGroup;
  @Input() p_key = 'pk_test_51KVFRLK7lUbrszmIsaL6Xtjh9vufBQGvFKAwmjFjtCcqdtZWEs80pMvxWcNEgXWvqWJ6XT0IHtbLDBuko3cnfnyg00rFIW7QE2'
  @Input() price : string | number = '0.00'
  @Output() onSuccess = new EventEmitter<any>();
  apiUrl = stripe_url
  // apiUrl = 'https://seed-misty-bonobo.glitch.me'

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private stripeService:AngularStripeService) {}
    ngOnInit(): void {
      this.checkoutForm = this.formBuilder.group({
        cardEmail: ['', Validators.required],
        cardName: ['', Validators.required],
      });
    }
  ngAfterViewInit() {
    this.stripeService.setPublishableKey(this.p_key).then(
      stripe=> {
        this.stripe = stripe;
        const elements = stripe.elements();    
        // this.card = elements.create('card');


        this.cardNumber = elements.create('cardNumber', {
          style: {
            base: {
              fontSize: '16px',
              fontFamily: 'Montserrat, sans-serif',
              color: '#333',
            },
          },
        });

        this.cardExpiry = elements.create('cardExpiry', {
          style: {
            base: {
              fontSize: '16px',
              fontFamily: 'Montserrat, sans-serif',
              color: '#333',
            },
          },
        });

        this.cardCvc = elements.create('cardCvc', {
          style: {
            base: {
              fontSize: '16px',
              fontFamily: 'Montserrat, sans-serif',
              color: '#333',
            },
          },
        });
        // Montage des éléments de carte dans les conteneurs appropriés
        this.cardNumber.mount('#card-number');
        this.cardExpiry.mount('#card-expiry');
        this.cardCvc.mount('#card-cvc');
    // console.log('okkkkkkkkkkk1 ', this.cardNumber, ' ', this.cardExpiry, ' ',this.cardCvc)

    // this.card.mount(this.cardInfo.nativeElement);
    // this.card.addEventListener('change', this.cardHandler);
        // Gestion des changements de l'état des éléments de carte
        // Gestion des changements de l'état des éléments de carte
        setTimeout(() => {
          [this.cardNumber, this.cardExpiry, this.cardCvc].forEach((element) => {
            element.addEventListener('change', (event) => {
              var displayError = document.getElementById('card-errors');
              if (event.error) {
                displayError.textContent = event.error.message;
              } else {
                displayError.textContent = '';
              }
              // Affichage de l'indicatif du type de carte
              if (event.brand) {
                // event.brand contient l'indicatif du type de carte
                this.cardType = event.brand;
                console.log('Type de carte:', event.brand);
              }
            });
          });
        }, 1000);

    });
  }

  ngOnDestroy() {
    [this.cardNumber, this.cardExpiry, this.cardCvc].forEach((element) => {
      element.removeEventListener('change');
      element.destroy();
    });

  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit() {
    this.loading = true
    console.log('Form submitted:', this.checkoutForm.value);
    var displayError = document.getElementById('card-errors');

    const { token, error } = await this.stripe.createToken(this.cardNumber);
    setTimeout(() => {
    }, 2000);

    if (error || !this.checkoutForm.valid) {
      this.loading = false
      if(error){
        console.log('Error:', error);
        displayError.textContent = error.message;
      }else{
          if(this.checkoutForm.get('cardName').errors){
            displayError.textContent = 'Renseignez Votre Nom';
          }
          else
            displayError.textContent = 'Renseignez Votre Email';
      }

    } else {
      console.log('Success!', token.id);
      this.createPaymentIntent(parseFloat(this.price.toString())*100, token.id, this.checkoutForm.get('cardEmail').value, this.checkoutForm.get('cardName').value).subscribe(
        res => {
          console.log(res)
          this.loading = false
          this.onSuccess.emit(true)
        }
      )
    }
  }
  createPaymentIntent(amount: number, token: string,  email, name): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${this.apiUrl}/charge`,
      { amount , token, name, email}
    );
  }

  getCardImage(type: string): string {
    const cardImages = {
      mastercard: "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png",
      visa: 'https://logowik.com/content/uploads/images/visa-payment-card1873.jpg',
      amex: 'https://logowik.com/content/uploads/images/amex-card1708.jpg',
      discover: 'https://seeklogo.com/images/D/Discover_Card-logo-4BC5D7C02C-seeklogo.com.png',
      jcb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png',
      diners: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_BcA9ptV-amVJRCI58NQYFOIZhXRkWXu2XnO_CSIx9w&s',
      unionpay: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKocwy56HdzuB7Qg_Qlr75Zz-x3_SLoxwpfmAxlhyLPg&s',
      // Ajoutez d'autres types de cartes au besoin
    };

    return cardImages[type] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc5n4rZKVYeqVAYiIa-OXQ_oLpwBhZA_jlW7tWeMPTIP06vuN-l3CI_iXabTleHuzTUQc&usqp=CAU'; // Retourne l'URL de l'image ou une chaîne vide si le type de carte n'est pas reconnu
  }
}