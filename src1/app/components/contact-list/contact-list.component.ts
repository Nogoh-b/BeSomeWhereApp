import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/Model/Contact';
import { ContactService } from 'src/app/service/contact/contact.service';
import { DataType, per_page } from 'src/global';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contact: Contact[]
  results: Contact[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []

  selected_data: any[] = []
  datatype = DataType.Contact
  conf = JSON.parse(localStorage.getItem("conf"))

  constructor(public contactService: ContactService) {}

  change(){
    console.log(this.sort_option)
  }

  ngOnInit(): void {
    this.contactService.get().subscribe(contact =>{
      this.contact = contact
      this.results = contact
      console.log ( 'contact111 ', contact)

      let a: number = Number((contact.length/per_page))
      // this.checks_table = init_selection(contact)
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      this.init_selection(this.getContacts())
    })
  }

  navigateToPage(i){
    if(i === ( this.pagination && this.pagination.length) || i < 0  )
      return
      this.currentPage = i
      setTimeout(() => {
        this.init_selection(this.getContacts())
      }, 1000);
  }

  getContacts(){
    const contact = this.contact &&  this.contact.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
    // console.log('contact  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    return this.contact
  }


  sort(e){
    this.contact = this.contact.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
    console.log(this.contact)
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
  getTextPlan(plan: string){
    if(plan === "Journalier"){
      return "Jour(s)"
    }
    if(plan  === "Hebdomadaire"){
      return "Semaine(s)"
    }
    if(plan  === "Mensuel"){
      return "Mois"
    }
    return "-"
  }


}
