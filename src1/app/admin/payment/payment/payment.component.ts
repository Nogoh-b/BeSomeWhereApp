import { PaymentsService } from './../../../service/payments/payments.service';
import { Payment } from './../../../model/Model/Payment';
import { DataType, canScreenDate_sus, ecart, formatDate, formatDateToLocale, init_selection, isValid, per_page } from './../../../../global';
import { Component, OnInit } from '@angular/core';
import { filterData, SearchType } from 'filter-data';
import { format } from 'date-fns';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: Payment[]
  results: Payment[]
  pagination
  cur_index = 0
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []
  ecart =  ecart

  selected_data: any[] = []
  datatype = DataType.Payment
  currentDataPage = []
  paiementUpdated = true
  constructor(public paymentsService: PaymentsService) {}

  change(){
    console.log(this.sort_option)
  }
  formatDate(date_string: string): string {
    return formatDate(formatDateToLocale(date_string))
  }
  addSecondsToDate(date: string, secondsToAdd: number): string {
    const result = new Date(date);
    result.setSeconds(result.getSeconds() + secondsToAdd);
    return result.toString();
  }
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
    formatDuree(secondes: number): string {
    const jours = Math.floor(secondes / (3600 * 24));
    const heures = Math.floor((secondes % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    const secondesRestantes = secondes % 60;

    return `${jours.toString().padStart(2, '0')}j${heures.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${secondesRestantes.toString().padStart(2, '0')}s`;
  }
  isValid2(date: string): boolean {
    // Vérifie si la date est valide
    const parsedDate = new Date(date);
    if (!parsedDate) {
      return false;
    }
  
    // Calcule l'écart entre la date actuelle et la date passée en paramètre
    const now = new Date();
    //@ts-ignore
    const diff = now - parsedDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(now.toISOString() ,'-', parsedDate.toISOString(), ' ',days)
    // Renvoie true si l'écart est inférieur ou égale à 30 jours
    return days <= 30;
  }
  isValid_1(date: string): boolean {
    // Vérifie si la date est valide
    const parsedDate = new Date(date);
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      return false;
    }
  
    // Calcule l'écart entre la date actuelle et la date passée en paramètre en secondes
    const now = new Date();
    //@ts-ignore
    const diffInSeconds = Math.abs((now.getTime() - parsedDate.getTime()) / 1000);
  
    // Renvoie true si l'écart est inférieur ou égale à 15 secondes
    return diffInSeconds <= 15 * 100;
  }
  isValid(date: string, validityDurationInSeconds: number): boolean {
    const isValid_date = isValid(formatDateToLocale(date),validityDurationInSeconds)
    return isValid_date;
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
  
  
  ngOnInit(): void {
    this.paymentsService.get().subscribe(payments =>{
      this.payments = payments
      this.results = payments
      console.log ( 'payments111 ', payments)

      let a: number = Number((payments.length/per_page))
      // this.checks_table = init_selection(payments)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getPayments())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getPayments())
      }, 1000);
  }

  getPayments(){
    const payments = this.payments &&  this.payments.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('payments  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    this.currentDataPage = payments
    return payments
    return this.payments
  }
  updatePaiement(status, id, index){
    this.paiementUpdated = false
    this.cur_index = index
    this.paymentsService.update({status }, id).subscribe(payment =>{
      index = this.payments.findIndex(p => p.id === id)
      console.log ( 'payments111 ', payment)
      this.currentDataPage[index] = this.payments[0]
      // this.payments.push(this.payments[0])
      window.location.reload()
      this.paiementUpdated = true
      console.log ( 'payments ', this.currentDataPage)
    })
  }
  canScreenDate_sus(status = 0 , created_at = '', updated_at = ''){
    return canScreenDate_sus(status , created_at , updated_at )
  }
  searchData(e){
    // alert(e.target.value)
    const searchConditions = [
      {
        key: ['name'],
        value: e.target.value,
        type: SearchType.LK,
      }
    ];
    this.payments = filterData(this.results, searchConditions);
    let a: number = Number((this.payments.length/per_page))
    //  alert(a)
    this.pagination = new Array(Math.ceil(a));
    // this.payments = matchSorter(this.results,'id')
    console.log('payments filter ',this.results)
  }

  sort(e){
    this.payments = this.payments.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.payments)
  }
  selectOrUnselectAll(s, data){
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.selected_data[index].selected = s
      }

    console.log(this.selected_data, ' ', s)
  }
  init_selection(data){
    while (this.selected_data.length > 0) {
      this.selected_data.pop()
    }
    for (const user of data ) {
      const id = user.id.toString()
      this.selected_data.push({ id , selected: false})
      // console.log(this.selected_data, ' ', )

    }
  }
  selectOrUnselect(s,index){
    console.log(this.selected_data[index].selected)
    this.selected_data[index].selected = s
    console.log(this.selected_data)
  }
  isAllchecked(selected_data?:any[]){
    return this.getAllChecked(selected_data).length === selected_data.length
  }
  isChecked(){

  }
  getAllChecked(selected_data?:any[]){
    let t = []
    for (const d of selected_data) {
      if(d.selected )
        t.push(d)
    }
    // console.log(t)
    return t
  }


}
