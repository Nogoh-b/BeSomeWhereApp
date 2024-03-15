import { User } from 'src/app/model/Model/Utilisateur';
import { CountriesService } from './../../service/countries/countries.service';
import { Checklist } from './../../model/Model/Checklist';
import { ChecklistService } from './../../service/checklist/checklist.service';
import { RouteChecklist } from './../../model/Model/Route_Checklist';
import { Transport_Checklist } from './../../model/Model/Transport_Checklist';
import { ToastComponent } from './../../shared/toast/toast.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as globals from 'src/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/model/Model/Route';
import { DatePipe, formatDate } from '@angular/common';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { ValidateDate } from 'src/app/validators/date.validator';

@Component({
  selector: 'app-checklist-add',
  templateUrl: './checklist-add.component.html',
  styleUrls: ['./checklist-add.component.css']
})
export class ChecklistAddComponent implements OnInit {

  checkListForm : FormGroup
  submitted = false
  loading = false
  id: string
  user: User
  checklist: Checklist
  @Input() for_home = false
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  model_trans = globals.transport_mode
  destinaions = [new RouteChecklist()]
  valids_array = [{bd : true, ed: true}]

  countries : any[]
  cities : any[]
  currentCity: any
  currentCountry: any
  countryIsvalid = true
  city: string
  country:string
  address:string
  constructor(private countriesService: CountriesService, public datepipe: DatePipe, public route: ActivatedRoute,private router: Router,private fb: FormBuilder, private checklistService: ChecklistService, private userServiceFireBase: UserServiceFireBase ) {

    const routeParams = this.route.snapshot && this.route.snapshot.paramMap;
    this.id = routeParams && routeParams.get('id');
    if(this.id){
      this.checklistService.getCheckList(this.id).subscribe(result =>{
        console.log('checklist ', result)
        this.checklist = result
        this.destinaions = this.checklist.routes
        this.createForm(this.checklist);
      })
    }{
      this.createForm();
    }

   }

  ngOnInit(): void {
    this.user = this.userServiceFireBase.getCurrentUser();

    this.countriesService.getCountry().subscribe(result =>{
      this.countries = result
        /*this.currentCountry = this.countries.filter(result =>{
          let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
          return countryName  === this.station.country.toLowerCase()
        })[0]*/
        console.log(this.currentCountry)
    })
    this.countriesService.getCities().subscribe(result =>{
      // console.log(result)
      this.cities = result
        /*this.currentCity = this.cities.filter(result =>{
          let cityName = result.name.toLowerCase()
          return cityName  === this.station.city.toLowerCase()
        })[0]*/
        console.log(this.currentCity)
    })
  }
  onSubmit(){
    if(!this.user){
      document.getElementById("login_btn")?.click()
      return
    }
    this.submitted = true
    let canSave = true
    if(this.checkListForm.invalid){
      this.toast_c.open('information','FillInAllTheFields')
      return
    }
    // vérifier si les dates son conformes
    for (let index = 0; index < this.valids_array.length; index++) {
      if(new Date(this.checkListForm.value['begindate'+index]) > new Date(this.checkListForm.value['enddate'+index]) ){
        canSave = false
        // alert('ne peut save')
        this.valids_array[index] = {bd : false, ed: false};
      }
      else
        this.valids_array[index] = {bd : true, ed: true};

    }
    if(!canSave){
      this.toast_c.open('information','inconsistent_encrypted_dates', 4000)
      console.log(this.valids_array)
      return
    }


    let selected_trans  = new Array <Transport_Checklist>();
    let selected_routes  = new Array <RouteChecklist>();
    let checklist = new Checklist()
    for (let index = 0; index < this.model_trans.length; index++) {
      const trans = this.model_trans[index];
      if(this.checkListForm.value['trans'+index]){
        let t = new Transport_Checklist()
        t.transport_id = trans.id;
        selected_trans.push(t)
      }
    }
    if(selected_trans.length === 0){
      this.toast_c.open('Information','Vous devez selecionner au moins un mode de transport')
      return
    }

    for (let index = 0; index < this.destinaions.length; index++) {
      const element = this.destinaions[index];
      let route = new RouteChecklist()
      route.country = this.checkListForm.value['country'+index]
      route.city = this.checkListForm.value['city'+index]
      route.starting_date = this.checkListForm.value['begindate'+index]
      route.arrival_date = this.checkListForm.value['enddate'+index]
      route.id = this.checkListForm.value['id'+index]
      selected_routes.push(route)
    }

    checklist.transports = selected_trans;
    checklist.routes = selected_routes;
    checklist.title = this.checkListForm.value['title']
    checklist.with_baby = this.checkListForm.value['with_baby']
    checklist.user_id = Number(this.userServiceFireBase.getCurrentUser().id)
    console.log(checklist)
    // return
    this.loading = true
    console.log(checklist)
    if(this.checklist){
      this.checklistService.update(checklist,this.id).subscribe(result =>{
        console.log('checklist ', result)
        this.loading = false
        this.toast_c.open('BeSomewhere','Checklist Mise a jour')
        setTimeout(() => {
          this.router.navigate(['/checklist', this.id ])
        }, 1500);
      })
    }
    else{
      this.checklistService.post(checklist).subscribe(result =>{
        console.log('checklist ', result)
        this.loading = false
        this.toast_c.open('BeSomewhere','Checklist crée')
        setTimeout(() => {
          window.location.reload()
          // this.router.navigateByUrl('/')
        }, 1500);
      })
    }
    setTimeout(() => {
      // this.router.navigateByUrl('/')
    }, 2000);
    this.destinaions.forEach(element => {
    });


  }

  createForm(checklist?: Checklist) {

    console.log(checklist);
    this.checkListForm = this.fb.group({});
    // this.checkListForm.addControl('for_disabled', new FormControl('0', Validators.required));
      const nbr = 0//this.destinaions.length - 1

      this.checkListForm.addControl('title', new FormControl(checklist ? checklist.title : '', Validators.required));
      this.checkListForm.addControl('with_baby', new FormControl(checklist ? checklist.with_baby : false));
      this.checkListForm.addControl('country'+nbr, new FormControl(checklist ? checklist.routes[0].country : '', Validators.required));
      this.checkListForm.addControl('city'+nbr, new FormControl(checklist ? checklist.routes[0].city : '', Validators.required));
      this.checkListForm.addControl('begindate'+nbr, new FormControl(checklist ? this.datepipe.transform(checklist.routes[0].starting_date, 'yyyy-MM-dd')   : '', [Validators.required]));
      this.checkListForm.addControl('begindate'+nbr, new FormControl(checklist ? this.datepipe.transform(checklist.routes[0].starting_date, 'yyyy-MM-dd')   : '', [Validators.required, ValidateDate()]));
      this.checkListForm.addControl('enddate'+nbr, new FormControl(checklist ? this.datepipe.transform(checklist.routes[0].arrival_date, 'yyyy-MM-dd')  : '', [Validators.required]));
      this.checkListForm.addControl('id'+nbr, new FormControl(checklist ? checklist.routes[0].id : '0', Validators.required));

      if(checklist){
        for (let index = 1; index < checklist.routes.length; index++) {
          const route = checklist.routes[index];
          this.checkListForm.addControl('country'+index, new FormControl(route.country , Validators.required));
          this.checkListForm.addControl('city'+index, new FormControl(route.city , Validators.required));
          this.checkListForm.addControl('begindate'+index, new FormControl((new Date(route.starting_date)).toISOString().split('T')[0] , Validators.required));
          this.checkListForm.addControl('enddate'+index, new FormControl((new Date(route.arrival_date)).toISOString().split('T')[0] , Validators.required));
          this.checkListForm.addControl('id'+index, new FormControl(route.id , Validators.required));
        }
       /* for (const trans of this.model_trans) {
            for (let index = 0; index < checklist.transports.length; index++) {
              const t = checklist.transports[index];
              if(t.id === trans.id){
                checklist.transports[index]
              }
            }
        }*/
      }

    for (let i = 0; i < this.model_trans.length; i++) {
      let value_trans = false
      if(checklist && checklist.transports){
        for (let index = 0; index < checklist.transports.length; index++) {
          const t = checklist.transports[index];
          if(t.transport_id === this.model_trans[i].id){
            value_trans = true
          }
        }
      }
      this.checkListForm.addControl('trans'+i, new FormControl(value_trans));
    }

  }

  addDestination(checklist?: Checklist){
      this.destinaions.push(new RouteChecklist());
      this.valids_array.push({bd : true, ed: true});
      const nbr = this.destinaions.length - 1
      this.checkListForm.addControl('country'+nbr, new FormControl(checklist ? checklist.routes[0].country : '', Validators.required));
      this.checkListForm.addControl('city'+nbr, new FormControl(checklist ? checklist.routes[0].city : '', Validators.required));
      this.checkListForm.addControl('begindate'+nbr, new FormControl(checklist ? this.datepipe.transform(checklist.routes[0].starting_date, 'yyyy-MM-dd')  : '', Validators.required));
      this.checkListForm.addControl('enddate'+nbr, new FormControl(checklist ? this.datepipe.transform(checklist.routes[0].arrival_date, 'yyyy-MM-dd')  : '', Validators.required));
      this.checkListForm.addControl('id'+nbr, new FormControl('0', Validators.required));

  }

  removeDestination(index){
    this.destinaions.splice(index,1);
    this.valids_array.splice(index,1);
    this.checkListForm.removeControl('country'+index);
    this.checkListForm.removeControl('city'+index);
    this.checkListForm.removeControl('begindate'+index);
    this.checkListForm.removeControl('enddate'+index);
    this.checkListForm.removeControl('id'+index);
  }

  onMousenter(v: any){
    // console.log(this.checkListForm.value.trans0)
  }
  onMouseleave(v: any, value?: string, i?: number){
    if(!this.checkListForm.value['trans'+i])
        v.src = 'assets/img/transport/'+value+'.png'
    // console.log(v.value)
  }

  //@ts-ignore
  getCities(iso2){
    if(this.cities && this.currentCountry){
      // console.log('this.currentCountry.iso2 ',this.currentCountry)
      let cities = this.cities.filter(result =>{
        return result.country_code === this.currentCountry.iso2
      })
      // console.log(this.cities[0].country_code +'==='+ this.currentCountry.iso2)
      // console.log(cities, ' ',this.currentCountry)
      return cities

    }
  }
  countrySelected(c){
    const i = this.countries.filter(result =>{
      let countryName = result.translations && result.translations.fr ? result.translations.fr.toLowerCase() : result.name.toLowerCase()
      return countryName  === c.target.value.toLowerCase()
    })
    // console.log(i)
    this.countryIsvalid = i.length > 0
    if(i.length > 0){
      this.currentCountry = i[0]
      this.currentCity = null
      this.city = ''
      console.log(this.currentCountry.iso2)
    }
    else{
      // this.currentCountry = null
      this.currentCity = null
    }
  }
}
