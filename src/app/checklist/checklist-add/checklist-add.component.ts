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
import { EmailService } from 'src/app/service/email/email.service';

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
routeParams 
  countries : any[]
  cities : any[]
  currentCity: any
  currentCountry: any
  countryIsvalid = true
  city: string
  country:string
  address:string

  schedulesMails = `<p><strong>Dear passenger,</strong></p>
<p><span style="color: #0000ff;"><strong>[Fran&ccedil;ais en dessous]</strong></span></p>
<p>&nbsp;</p>
<h4>Your departure is approaching&mdash;it&rsquo;s tomorrow!&nbsp; To ensure a stress-free journey, we encourage you to finalize your BESOMEWHERE checklist before you leave.</h4>
<h4><strong>This will help you make sure that you haven&rsquo;t forgotten anything and that everything is in order for your trip. Take a few minutes to double-check your documents, luggage, and all the essentials. A quick review now will save you a lot of trouble on the big day!</strong></h4>
<p><strong>Need a little help? Feel free to use the checklist provided.</strong></p>
<p><strong>Also, don't forget to check out our travel tips and advice tailored to your destination in our articles on <a href="https://besomewhereapp.com/#/article">Be Somewhere (besomewhereapp.com)</a></strong></p>
<p>&nbsp;</p>
<p><strong>We wish you a wonderful journey with BESOMEWHERE!<br />See you soon,<br />The BESOMEWHERE Team</strong><strong><br /><br /></strong></p>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">[Fran&ccedil;ais] </span></strong></p>
<p><strong><span style="color: #0000ff;">Cher passagers,<br /></span></strong></p>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">Votre d&eacute;part approche : c&rsquo;est demain !&nbsp;</span></strong><strong><span style="color: #0000ff;">Pour un voyage sans stress, nous vous encourageons &agrave; finaliser votre check-list BESOMEWHERE avant de partir.</span></strong></p>
<p><strong><span style="color: #0000ff;"> Cela vous permettra de vous assurer que vous n'avez rien oubli&eacute; et que tout est en ordre pour votre voyage.&nbsp;</span></strong><strong><span style="color: #0000ff;">Prenez quelques minutes pour v&eacute;rifier vos documents, vos bagages et tous les &eacute;l&eacute;ments n&eacute;cessaires.&nbsp;</span></strong><strong><span style="color: #0000ff;">Un petit geste maintenant vous &eacute;vitera bien des soucis le jour J !</span></strong></p>
<p><strong><span style="color: #0000ff;">Besoin d&rsquo;un coup de pouce ? N'h&eacute;sitez pas &agrave; utiliser la check-list propos&eacute;e.</span></strong></p>
<p><strong><span style="color: #0000ff;">Pensez &eacute;galement &agrave; consulter nos astuces et conseils de voyage adapt&eacute;s &agrave; votre destination dans nos articles sur : <a href="https://besomewhereapp.com/#/article">Be Somewhere (besomewhereapp.com)</a></span></strong></p>
<p><strong><span style="color: #0000ff;">&nbsp;</span></strong></p>
<p><strong><span style="color: #0000ff;"><br />Nous vous souhaitons un excellent voyage avec BESOMEWHERE !<br />&Agrave; tr&egrave;s bient&ocirc;t,<br />L&rsquo;&eacute;quipe BESOMEWHERE<br /><br /></span></strong></p>
<p>&nbsp;</p>`
    
    constructor(private countriesService: CountriesService, public datepipe: DatePipe, public emailService: EmailService, public route: ActivatedRoute,private router: Router,private fb: FormBuilder, private checklistService: ChecklistService, private userServiceFireBase: UserServiceFireBase ) {
    route.queryParams.subscribe(params=>{
      this.routeParams = params
      const routeParams = this.route.snapshot && this.route.snapshot.paramMap;
     this.id = routeParams && routeParams.get('id');
     
    //  if(JSON.parse(localStorage.getItem('incoming_checklist')))
    console.log('incoming_checklist ',this.checklist, ' ', JSON.stringify(localStorage.getItem('incoming_checklist')))
    this.checklist = localStorage.getItem('incoming_checklist') != undefined ? JSON.parse(localStorage.getItem('incoming_checklist')) : new Checklist()
    // localStorage.removeItem('incoming_checklist')
     if(this.id){
       this.checklistService.getCheckList(this.id).subscribe(result =>{
         console.log('checklist ', result)
         this.checklist = result
         this.destinaions = this.checklist.routes
         this.createForm(this.checklist);
       })
     }{
       this.createForm(this.checklist);
     }

    }) 

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
    checklist.user_id = this.userServiceFireBase.getCurrentUser() ? Number(this.userServiceFireBase.getCurrentUser().id) : 0
    console.log(checklist)
    // return
    this.loading = true
    console.log(checklist)
    if(!this.user){
      document.getElementById("login_btn")?.click()
      localStorage.setItem('incoming_checklist', JSON.stringify(checklist))
      return
    }

    if((!checklist || (checklist && !checklist.routes)) || (this.routeParams && this.routeParams.begindate && this.routeParams.begindate != '') ){
      this.checklistService.update(checklist,this.id).subscribe(result =>{
        console.log('checklist ', result.routes)
        this.loading = false
        this.toast_c.open('BeSomewhere','checklistUpdated')
        setTimeout(() => {
          this.router.navigate(['/checklist', this.id ])
        }, 1500);
      })
    }
    else{
      this.checklistService.post(checklist).subscribe(result =>{
        console.log('checklist ', result)
        this.loading = false
        this.toast_c.open('BeSomewhere','checklistCreated')
        setTimeout(() => {
          // window.location.reload()
          this.router.navigate(['/mes-checklists'])
          const user : User = JSON.parse(localStorage.getItem('user'))
          for (const route of result.routes) {
            this.emailService.sendMailScheduleEmail({ "email": user.email,
              "subject": "Commande / Order",
              "send_at" : this.getPreviousDay(route.starting_date),
              "content": this.schedulesMails}).subscribe(r => {console.log(r)})
            
          }

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


  getPreviousDay(dateStr: string): string {
    // Convertir la chaîne de caractères en un objet Date
    const date = new Date(dateStr);
  
    // Soustraire un jour
    date.setDate(date.getDate() - 1);
  
    // Formater la date en YY-MM-DD H:i:s
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yy-MM-dd HH:mm:ss')!;
  }

  createForm(checklist?: Checklist) {

    console.log(checklist);
    this.checkListForm = this.fb.group({});
    // this.checkListForm.addControl('for_disabled', new FormControl('0', Validators.required));
      const nbr = 0//this.destinaions.length - 1

      this.checkListForm.addControl('title', new FormControl(checklist ? checklist.title : this.routeParams.title, Validators.required));
      this.checkListForm.addControl('with_baby', new FormControl(checklist ? checklist.with_baby : false));
      this.checkListForm.addControl('country'+nbr, new FormControl(checklist && checklist.routes ? checklist.routes[0].country : this.routeParams.country0, Validators.required));
      this.checkListForm.addControl('city'+nbr, new FormControl(checklist && checklist.routes ? checklist.routes[0].city : this.routeParams.city0, Validators.required));
      this.checkListForm.addControl('begindate'+nbr, new FormControl(checklist && checklist.routes ? this.datepipe.transform(checklist.routes[0].starting_date, 'yyyy-MM-dd')   : this.datepipe.transform(this.routeParams.begindate0, 'yyyy-MM-dd'), [Validators.required]));
      this.checkListForm.addControl('begindate'+nbr, new FormControl(checklist && checklist.routes ? this.datepipe.transform(checklist.routes[0].starting_date, 'yyyy-MM-dd')   : this.datepipe.transform(this.routeParams.begindate0, 'yyyy-MM-dd'), [Validators.required, ValidateDate()]));
      this.checkListForm.addControl('enddate'+nbr, new FormControl(checklist && checklist.routes ? this.datepipe.transform(checklist.routes[0].arrival_date, 'yyyy-MM-dd')  : this.datepipe.transform(this.routeParams.enddate0, 'yyyy-MM-dd') , [Validators.required]));
      this.checkListForm.addControl('id'+nbr, new FormControl(checklist  && checklist.routes? checklist.routes[0].id : '0', Validators.required));
      

      if(checklist && checklist.routes ){
        for (let index = 1; index < checklist.routes.length; index++) {
          const route = checklist.routes[index];
          this.checkListForm.addControl('country'+index, new FormControl(route.country , Validators.required));
          this.checkListForm.addControl('city'+index, new FormControl(route.city , Validators.required));
          this.checkListForm.addControl('begindate'+index, new FormControl((new Date(route.starting_date)).toISOString().split('T')[0] , Validators.required));
          this.checkListForm.addControl('enddate'+index, new FormControl((new Date(route.arrival_date)).toISOString().split('T')[0] , Validators.required));
          this.checkListForm.addControl('id'+index, new FormControl(route.id , Validators.required));
        }
        console.log('value_trans ', this.model_trans)

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
       this.currentCountry = ''
      this.currentCity = null
    }
  }
}
