'use strict';
// import { scrollIntoView } from 'seamless-scroll-polyfill';

import {Observable} from "rxjs";
const DEV =  false
export const email_admin = /*'nogohbrice@yahoo.fr';nyassokelydiane@gmail.com//*/'besomewhere.contact@gmail.com';
// export const stripe_url = DEV ? 'http://localhost:3000' : 'https://seed-misty-bonobo.glitch.me';
export const stripe_pk = DEV ?
'pk_test_51KVFRLK7lUbrszmIsaL6Xtjh9vufBQGvFKAwmjFjtCcqdtZWEs80pMvxWcNEgXWvqWJ6XT0IHtbLDBuko3cnfnyg00rFIW7QE2' 
:
'pk_test_51OW3NPJ23i0YnrBpXHFQ4ofoDZaeDIjw58rmyrH0cNhkmJK6trnKzFaofSw13RbOZ0SPsN6br8llmxtRjHSFlM9v00HxL37fUy';

// eslint-disable-next-line max-len
export const KEY_FOR_PUSH_MESSAGING= 'AAAAla-ImJY:APA91bEaEwecDU3ku6hZ-ODRQb3U3zOa9mjmM_CNRMyg0sJQ9Pyn1riezr7msKn9zOmPPpEeJR_NYpFeueQQz01GjEnJoR-6916uEIam-rTloHIPM0E8ndDlMvk8BUa8DSu9QaPz_ZlR';
export const LOGIN='nogoh:Lionelbrice123@';
export const SERVER = /*'http://bisooft.com/'//'https://polydor-btsh.com/'// */ 'https://besomewhereapp.com/';
export const stripe_url = DEV ? 'http://localhost:3000' : 'http://back.besomewhereapp.com';
// export const SERVER = /*'http://bisooft.com/'//'https://polydor-btsh.com/'// */ 'http://localhost/';
//  export const SERVER = 'http://localhost/'//'https://polydor-btsh.com/'// 'http://testanna.bnbsoftservice.com/';
//export const SERVER_LOCAL = 'http://localhost/'//'http://testanna.bnbsoftservice.com/';
//  export const SERVER_FOR_API = SERVER + 'www/besomewhere/public/api/';
export const SERVER_FOR_API = SERVER + 'besomewhere_api/public/api/';
// export const SERVER_FOR_API = SERVER + 'besomewhere_api1/public/api/';
export const SERVER_URL = SERVER + 'wp-json/';
export const SERVER_FOR_UPLOAD = SERVER + 'uploads/';

export const AUTORIZATION = '';// '?consumer_key=ck_bfe73018b9538cb55598b3ca98b6dd20e9c0c707&consumer_secret=cs_fec53797cfbc4e6bb5e1e049175b0f47acd14596&oauth_consumer_key=ck_bfe73018b9538cb55598b3ca98b6dd20e9c0c707&oauth_token=cs_fec53797cfbc4e6bb5e1e049175b0f47acd14596&oauth_signature_method=HMAC-SHA1&oauth_signature=B%2FAGy8tU7khU%2FhO5hgrNMz7VPHw%3D&oauth_timestamp=1191242096&oauth_nonce=kllo9940pd9333kh';
export let token_chat = 'ewRIgwXeSYyHeb_54Rnf4x:APA91bEp6IFjjOr5tLjQ1uinR-Rbptm27AuQOPE_Xj-bfPXGs1ciLP0FOZaxV3XItLEo_66wwLaux_Urgy7oEMiMXqVuDT_wkZNKu7VzsC3rPXlxBMi3qgzL9upIAFWRHS-R2lvJxXqP';
//@ts-ignore
export let token_for_push;
export const empty_profil = SERVER + 'uploads/app/user.png';
export const per_page = 10;
export const take_at_home_price = 10;
export const price_article_suscribe = 10;
// export const BLOG_ADR = 'https://www.besomewhereapp.com/besomewhere_blog/?rest_route=/wp/v2/';
// export const BLOG_ADR = 'https://berttywaxaccesories.com/blog/wp-json/wp/v2/';
export const BLOG_ADR = 'https://besomewhereapp.com/wordpress/?rest_route=/wp/v2/';

export enum Scheduldes{
  Day = 0,
  Week = 1,
  Mois = 2
}

// export const ecart =  15*24*60*60
export const ecart =  24*60*60 

export function total_take_at_homr(passengers, take_at_home ){
  let reservation_t = 0
  // console.log('route_passengers ', passengers)
  if(take_at_home) {
    reservation_t++; // Increment reservation_t si take_at_home est true
  }
  if (!passengers)
    return 0
  // console.log('reservation_t ',reservation_t); //Affiche le total de reservation_t
  passengers.forEach((passenger, index) => {
    if(index != 0 ){
      if (passenger.birthday && passenger.birthday !== "") {
          reservation_t++;
          // console.log(`Passenger at index ${index} has a birthday defined. Total: ${reservation_t} ${passenger.birthday}`);
      } else {
          // console.log(`Passenger at index ${index} does not have a birthday defined.`);
      }
    }
      
});

  // console.log('reservation_t ',reservation_t); //Affiche le total de reservation_t
  return reservation_t
}

export function isValid(date: string, validityDurationInSeconds: number): boolean {

  // Vérifie si la date est valide
  const parsedDate = new Date(date);
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return false;
  }

  

  // Calcule l'écart entre la date actuelle et la date passée en paramètre en secondes
  const now = new Date();
  //@ts-ignore
  const diffInSeconds = Math.abs((now.getTime() - parsedDate.getTime()) / 1000);

  // Renvoie true si l'écart est inférieur ou égal à la durée de validité spécifiée en secondes
  return diffInSeconds <= validityDurationInSeconds;
}
export function formatDate(date_string: string): string {
  const date = new Date(date_string)
  console.log('date___ ',date)
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const mois = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const jourSemaine = jours[date.getDay()];
  const jourMois = date.getDate();
  const nomMois = mois[date.getMonth()];
  const annee = date.getFullYear();
  const heures = date.getHours();
  const minutes = date.getMinutes();
  const secondes = date.getSeconds();
  return `${jourSemaine} ${padZero(jourMois)} ${nomMois} ${annee} à ${padZero(heures)}h${padZero(minutes)}m${padZero(secondes)}s`;
}
export function canScreenDate_sus(status = 0 , created_at = '', updated_at = '') :  boolean{
  switch (status) {

    case  0:
      return false;
    case  1:
      if(isValid(updated_at, ecart))
        return true;
      else
        return true;
    default:
      return false;
  }
}
export function addSecondsToDate(date: string, secondsToAdd: number): string {
  const result = new Date(date);
  result.setSeconds(result.getSeconds() + secondsToAdd);
  return result.toString();
}
export function  padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
export function formatDateToLocale(dateString: string): string {
  const date = new Date(dateString);

  // Récupérer le décalage horaire en minutes
  const offsetMinutes = date.getTimezoneOffset();

  // Ajouter le décalage horaire à la date
  const dateAvecOffset = new Date(date);
  dateAvecOffset.setMinutes(date.getMinutes() + (-1)*offsetMinutes);

  // Afficher la nouvelle date avec le décalage horaire
  // console.log(offsetMinutes);

  return dateAvecOffset.toString();
}
export enum TrajetCardStatus{
  ChoosePoint = 0,
  ChooseSchedules = 1,
  ChoosPassenger = 2,
  ChooseItems = 3,
  Ordering = 4,
  Created = 5
}
export enum MealCategory{
  Viennoiserie,
  Sandwich,
  Boisson,
  All
}
export enum ReasonPayment{
  Article,
  Route,
}
export enum ItemCategory {
  Meal,
  Suitcase,
  BabySeats,
}
export const suitcase =   {
  "name": "suitcase",
  "quantity": 0,
  "price": 5,
  "category": ItemCategory.Suitcase,
}
export const babySeats =  [
  {
    "name": "babySeats1",
    "quantity": 0,
    "price": 5,
    "category": ItemCategory.BabySeats,
    "src1":"./assets/img/item/v1.png",
    "src2":"./assets/img/item/v1.png"
  },
  {
    "name": "babySeats2",
    "quantity": 0,
    "price": 5,
    "category": ItemCategory.BabySeats,
    "src1":"./assets/img/item/v1.png",
    "src2":"./assets/img/item/v1.png"
  },
  {
    "name": "babySeats3",
    "quantity": 0,
    "price": 5,
    "category": ItemCategory.BabySeats,
    "src1":"./assets/img/item/v1.png",
    "src2":"./assets/img/item/v1.png"
  },
]
export enum DataType{
  Point = 0,
  Route = 1,
  Checklist = 2,
  Drive = 3,
  Reservation = 4,
  Created = 5,
  Article = 6,
  Ads = 7,
  Drive_Base = 8,
  MealCategory = 9,
  User = 10,
  Item_Proposed = 11,
  Payment = 12,
  Contact = 13,
  Item_Category = 14
}
export const meals = [

  {
    "name": "Croissant Beurre",
    "quantity": 0,
    "price": 1.90,
    "category": ItemCategory.Meal,
    "sub_category": 0,
    "src":"./assets/img/item/v1.png"
  },

  {
    "name": "Chausson Pomme",
    "quantity": 0,
    "price": 1.90,
    "category": ItemCategory.Meal,
    "sub_category": 0,
    "src":"./assets/img/item/v2.png"
  },

  {
    "name": "Pain chocolat",
    "quantity": 0,
    "price": 1.90,
    "category": ItemCategory.Meal,
    "sub_category": 0,
    "src":"./assets/img/item/v3.png"
  },



  {
    "name": "Pan Bagnat, Thon Tomate Œuf Olives noir Anchois , Salade",
    "quantity": 0,
    "price": 3.90,
    "category": ItemCategory.Meal,
    "sub_category": 1,
    "src":"./assets/img/item/s1.png"
  },
  {
    "name": "Pain traditionnel , Poulet Mayonnaise, Salade",
    "quantity": 0,
    "price": 3.90,
    "category": ItemCategory.Meal,
    "sub_category": 1,
    "src":"./assets/img/item/s2.png"
  },
  {
    "name": "Pain traditionnel , Poulet  Mayonnaise, Salade",
    "quantity": 0,
    "price": 3.90,
    "category": ItemCategory.Meal,
    "sub_category": 1,
    "src":"./assets/img/item/s3.png"

  },
  {
    "name": "Pan Bagnat, Thon Tomate Œuf Olives noir Anchois , Salade",
    "quantity": 0,
    "price": 3.90,
    "category": ItemCategory.Meal,
    "sub_category": 1,
    "src":"./assets/img/item/s4.png"
  },
  {
    "name": "Pain traditionnel , Rosette Beurre , Cornichons",
    "quantity": 0,
    "price": 3.90,
    "category": ItemCategory.Meal,
    "sub_category": 1,
    "src":"./assets/img/item/s5.jpg"
  },





  {
    "name": "Bouteille Fanta",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/bfanta.jpg"
  },
  {
    "name": "Cannette  Fanta",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/cfanta.png"
  },
  {
    "name": "Lipton Ice Tea",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/clipton.png"
  },
  {
    "name": "Bouteille d'Eau",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/beau.jpg"
  },
  {
    "name": "Cannettte Orangina",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/corangina.png"
  },
  {
    "name": "Cannette Coca",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/ccoca.png"
  },
  {
    "name": "Bouteille Coca",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/bcoca.jpg"
  },
  {
    "name": "Cannette Sprite",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/csprite.png"
  },
  {
    "name": "Bouteille Sprite",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/bsprite.jpg"
  },
  {
    "name": "Cannette Oasis",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/coasis.png"
  },
  {
    "name": "Cannete Schweppes lemon",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/cschweppes.png"
  },
  {
    "name": "Cannette Pepsi",
    "quantity": 0,
    "price": 1,
    "category": ItemCategory.Meal,
    "sub_category": 2,
    "src":"./assets/img/item/cpepsi.png"
  }
]

export const proposedChecklist_cat = [
  {
    id: 1,
    name : 'Document / Identité',
    src : 'passeport-240'
  },
  {
    id: 2,
    name : 'Vêtement et accéssoire',
    src : 'chemise-96'
  },
  {
    id: 3,
    name : 'Moyen de paiement',
    src : 'carte-bancaire-face-arri%C3%A8re-96'
  },
  {
    id: 4,
    name : 'Enfant',
    src : 'enfants-96'
  },
  {
    id: 5,
    name : 'A faire avant de partir',
    src : 'test-partiellement-r%C3%A9ussi-80'
  },
  {
    id: 6,
    name : 'Toilette et Hygiène',
    src : 'shampoo-256'
  },
  {
    id: 7,
    name : 'Animal',
    src : 'group-of-animals-96'
  },
  {
    id: 8,
    name : 'Pharmacie / Santé',
    src : 'pilules-96'
  },
  {
    id: 9,
    name : 'Livre / Lecture',
    src : 'pile-de-livre-96'
  },
  {
    id: 10,
    name : 'Formalité de départ',
    src : 'documents-de-produit-96'
  },
  {
    id: 11,
    name : 'Electonique',
    src : 'casque-audio-96'
  },
]

export const proposedChecklist_items = [
  {
    parent: 1,
    name : 'Carte d’identité ou Passeport',
  },
  {
    parent: 1,
    name : 'Permis de conduire',
  },
  {
    parent: 1,
    name : 'Contacts et attestation d\'assurance et d\'assistance',
  },
  {
    parent: 1,
    name : 'Carte européenne d\'assurance maladie',
  },
  {
    parent: 1,
    name : 'Réservations de transports et d\'hébergements',
  },
  {
    parent: 2,
    name : 'Sous-vêtements',
  },
  {
    parent: 2,
    name : 'Paires de chaussettes',
  },
  {
    parent: 2,
    name : 'Tenues de nuit (pyjama, nuisette, short...)',
  },
  {
    parent: 2,
    name : 'Carnet international de vaccination',
  },
  {
    parent: 2,
    name : 'Coupe-vent imperméable',
  },
  {
    parent: 2,
    name : 'T-shirts manches longues',
  },
  {
    parent: 2,
    name : 'T-shirts manches courtes',
  },
  {
    parent: 2,
    name : 'Pantalons Jean',
  },
  {
    parent: 2,
    name : 'Pantalons jogging',
  },
  {
    parent: 2,
    name : 'Pantalons Randonné',
  },
]
// {
//   id:4,
//   name : 'Bateau à voile',
//   src :'sailboat'
// },
export const transport_mode = [
  {
    id:1,
    name : 'plane',
    src :'plane'
  },
  {
    id:2,
    name : 'Bus',
    src :'bus'
  },
  {
    id:3,
    name : 'boat',
    src :'boat'
  },
  {
    id:5,
    name : 'walkin',
    src :'walk'
  },
  {
    id:6,
    name : 'bike',
    src :'bicycle'
  },
  {
    id:7,
    name : 'train',
    src :'train'
  },
  {
    id:8,
    name : 'moto',
    src :'scooter'
  },
  {
    id:9,
    name : 'car',
    src :'taxi'
  },

]
export let listString  = '            <li style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; list-style-type: none; list-style-position: outside; display: flex; align-items: center; padding: 2px;">'+
'                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="font-size: 23px;">'+
'                    <g>'+
'                        <path fill="none" d="M0 0h24v24H0z"/>'+
'                        <path d="M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z"/>'+
'                    </g>'+
'                </svg>'+
'                <p style="margin-bottom: 0; padding-left: 7px;">{$text}</p> '+
'            </li>'

export let divMap = '<div style="z-index: 2, width: auto; display: inline-block; flex-direction: column; justify-content: center; align-items: center;">'+
'    <div style="width: 100%; background-color: #1b7eba; color: #ffffff; font-size: 18px; border-radius: 5px; border-top-color: #d67171;">'+
'        <p style="margin-bottom: 0; padding-left: 10px; padding-bottom: 5px; padding: 10px; font-size: 18px; font-weight: 900; border-bottom: 1px solid #fff7f7;">Aux alentours de {$name} </p>'+
'        <ul style="padding: 5px; margin-bottom: 0;">'+ '{$data}'+

'        </ul>'+
'    </div>'+
'</div>';

// export let divMap = '<div style="width: auto; display: inline-block; flex-direction: column; justify-content: center; align-items: center;">'+
// '    <div style="width: 100%; background-color: #1b7eba; color: #ffffff; font-size: 18px; border-radius: 5px; border-top-color: #d67171;">'+
// '        <p style="margin-bottom: 0; padding-left: 10px; padding-bottom: 5px; padding-top: 5px; font-size: 18px; font-weight: 900; border-bottom: 1px solid #fff7f7;">Points au allentours</p>'+
// '        <ul style="padding: 5px; margin-bottom: 0;">'+
// '            <li style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; list-style-type: none; list-style-position: outside; display: flex; align-items: center; padding: 2px;">'+
// '                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="font-size: 23px;">'+
// '                    <g>'+
// '                        <path fill="none" d="M0 0h24v24H0z"/>'+
// '                        <path d="M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z"/>'+
// '                    </g>'+
// '                </svg>'+
// '                <p style="margin-bottom: 0; padding-left: 7px;">Restaurant la fleuri</p> '+
// '            </li>'+
// '            <li style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; list-style-type: none; list-style-position: outside; display: flex; align-items: center; padding: 2px;">'+
// '                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="font-size: 23px;">'+
// '                    <g>'+
// '                        <path fill="none" d="M0 0h24v24H0z"/>'+
// '                        <path d="M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z"/>'+
// '                    </g>'+
// '                </svg>'+
// '                <p style="margin-bottom: 0; padding-left: 7px;">Restaurant la Sterline</p> '+
// '            </li>'+
// '            <li style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; list-style-type: none; list-style-position: outside; display: flex; align-items: center; padding: 2px;">'+
// '                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="font-size: 23px;">'+
// '                    <g>'+
// '                        <path fill="none" d="M0 0h24v24H0z"/>'+
// '                        <path d="M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z"/>'+
// '                    </g>'+
// '                </svg>'+
// '                <p style="margin-bottom: 0; padding-left: 7px;">Discothèque de madra</p> '+
// '            </li>'+
// '        </ul>'+
// '    </div>'+
// '    <div style="display: flex; justify-content: center;">'+
// '        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="3em" height="3em" fill="currentColor" style="padding-top: 5px; color: #ff0000;">'+
// '            <g>'+
// '                <path fill="none" d="M0 0h24v24H0z"/>'+
// '                <path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>'+
// '            </g>'+
// '        </svg>'+
// '    </div>'+
// '</div>';



export const headers = {
  'Content-Type': "application/json",
  Authorization: 'Basic YmVzb21ld2hlcmU6QmVzb21ld2hlcmUyMDIzIQ=='
};
// 'Access-Control-Allow-Origin': "*",
// "Access-Control-Allow-Credentials": "true",
// "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
// Authorization: 'Basic YmVzb21ld2hlcmU6TW9tbzEyMzQ6NDMyMQ=='

export  enum UserType {
  Admin,
  Vendor,
  Deliverer,
  Buyer,
}
export enum CautionType {
  Order,
  Product,
  USERT_REPORT,
  None
}
export enum NotificationType {
  Order,
  Product,
  OrderDeliverer,
  Chat,
  Account
}
export enum StatusOrder {
  OnHold = 'on-hold',
  Failed = "failed",
  Processing = 'processing',
  Pending = 'pending',
  Completed = 'completed',
  Refunding = 'refunding',
  Refunded = 'refunded',
  Cancel = 'cancelled'
}


export let toast;
export let notifications = [];
// export const version= Observable <any> = ;
export const comissionBuyer = 0.2 ;
export const comissionSeller = 0.15 ;
export const comissionDeliverer = 0.10 ;





export function scrollToTop(di: any = null) {
/*
  if(!di)
    di = 'container_home';

  setTimeout(() => {
    //@ts-ignore
    scrollIntoView(document.querySelector("#"+di), { behavior: "auto", block: "start"});
    if(di === 'container_home')
      window.scrollTo(0, 0)
  }, 500);*/
}

export function sendMail(){
var name = "dfdf" 

//@ts-ignore
var name = "dfdf" 
//@ts-ignore
(<HTMLInputElement>document.getElementById('name_')).value = name

//@ts-ignore
(<HTMLInputElement>document.getElementById('email_')).value = this.assForm.get('email_user').value
(<HTMLInputElement>document.getElementById('message_')).value = this.texteToSend
// alert((<HTMLInputElement>document.getElementById('email_')).value)

//@ts-ignore
console.log('this.texteToSend  ', (<HTMLInputElement>document.getElementById('message_')).value)
(<HTMLInputElement>document.getElementById('sumitMail')).click()
}


export function init_selection(data?: any[]){
  let result = []
  // while (data.length > 1 ) {
  //   data.pop()
  // }
    //@ts-ignore
    for (let index = 0; index < data.length; index++) {
    //@ts-ignore
    const element = data[index];
    result.push(element.id)
  }
  return result
}
export function unselectAll(data?: any[]){
  while (data!.length > 1 ) {
    data!.pop()
  }
  return data
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    data![index] = false
  }
}

export function select(elt: any, data?: any[]){
  data!.push(elt.id)
  return data
}
export function unseclect(index:number, data: any[]){
  return  data.splice(index,1)

}
