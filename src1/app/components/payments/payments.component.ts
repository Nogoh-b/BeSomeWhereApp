import { PaymentsService } from './../../service/payments/payments.service';
import { Payment } from './../../model/Model/Payment';
import { DataType, addSecondsToDate, ecart, formatDate, formatDateToLocale, isValid, per_page } from './../../../global';
import { Component, OnInit } from '@angular/core';
// import { filterData, SearchType } from 'filter-data';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
// import { isValid } from 'date-fns';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[]
  results: Payment[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Payment
  constructor(private userServiceFireBase: UserServiceFireBase,public paymentsService: PaymentsService) {}

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    let user = this.userServiceFireBase.getCurrentUser();

    this.paymentsService.get(user ? {user_id :  user.id } : null).subscribe(payments =>{

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
    return this.payments
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
  formatDate(date: string){
    return formatDate(formatDateToLocale(addSecondsToDate(date,ecart)))
  }
  getBadgeClasses(status: number,updated_at: string, date_updated: boolean): string[] {
    const isStatus2 = this.isStatus2(addSecondsToDate(updated_at, ecart));

    switch (true) {
        case status === 0:
          return ['badge', 'bg-danger', 'text-white'];
        case status === 1:
          if(isValid(updated_at, ecart))
            return ['badge', 'bg-success', 'text-white'];
          else
            return ['badge', 'bg-primary', 'text-white'];
      default:
        return ['badge', 'bg-secondary', 'text-white'];
    }
  }

  getStatusText(status: number,updated_at: string, date_updated: boolean): string {
    const isStatus2 = this.isStatus2(addSecondsToDate(updated_at, ecart));

    switch (true) {

      case status === 0:
        return 'Non autorisé';
      case status === 1:
        if(isValid(updated_at, ecart))
          return 'En cours';
        else
          return 'Terminé';
      default:
        return 'Statut inconnu';
    }
  }

  isStatus2(updated_at: string): boolean {
    const updatedAtDate = new Date(updated_at);
    const currentDate = new Date();
    return updatedAtDate <= currentDate;
  }
  canScreenDate(status = 0 , created_at = '', updated_at = '') :  boolean{
    switch (true) {

      case status === 0:
        return false;
      case status === 1:
        if(isValid(updated_at, ecart))
          return true;
        else
          return true;
      default:
        return false;
    }
  }

}
