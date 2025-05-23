import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist } from 'src/app/model/Model/Checklist';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-checklist',
  templateUrl: './home-checklist.component.html',
  styleUrls: ['./home-checklist.component.css']
})
export class HomeChecklistComponent implements OnInit {
  @Input() checklists: Array<Checklist> = []
  lastChecklist : Checklist
  FutureChecklists : Checklist []
  checkListForm : FormGroup
  constructor(private router: Router,private fb: FormBuilder) { }
  @Output() wantCreateChecklist = new EventEmitter<any>()
  @Input() screen_all = true
  ngOnInit(): void {
    this.lastChecklist =this.getLastChecklist()
    this.FutureChecklists = this.getFutureChecklists()
    this.createForm();

  }

  createForm(checklist?: Checklist) {

    console.log(checklist);
    this.checkListForm = this.fb.group({});
    // this.checkListForm.addControl('for_disabled', new FormControl('0', Validators.required));
      const nbr = 0//this.destinaions.length - 1

      this.checkListForm.addControl('title', new FormControl(checklist ? checklist.title : '', Validators.required));
      this.checkListForm.addControl('with_baby', new FormControl(checklist ? checklist.with_baby : false));
      this.checkListForm.addControl('country0', new FormControl(checklist ? checklist.routes[0].country : '', Validators.required));
      this.checkListForm.addControl('city0', new FormControl(checklist ? checklist.routes[0].city : '', Validators.required));
      this.checkListForm.addControl('begindate0', new FormControl('', [Validators.required]));
      this.checkListForm.addControl('begindate0', new FormControl('', [Validators.required]));
      this.checkListForm.addControl('enddate0', new FormControl('', [Validators.required]));
      this.checkListForm.addControl('id0', new FormControl('0', Validators.required));



  }


  getLastChecklist(checklists: Checklist[] = this.checklists): Checklist | null {
    // Supposons que "checklists" soit votre tableau d'objets de checklists
  
    // Obtenez la date actuelle
    const currentDate = new Date();
  
    // Initialisez la checklist la plus proche pour les dates ultérieures
    let closestChecklistFuture = null;
    let closestTimeDifferenceFuture = Infinity;
  
    // Initialisez la checklist la plus proche pour les dates antérieures
    let closestChecklistPast = null;
    let closestTimeDifferencePast = Infinity;
  
    // Parcourez toutes les checklists
    for (const checklist of checklists) {
      // Parcourez toutes les routes de la checklist
      for (const route of checklist.routes) {
        const startingDate = new Date(route.starting_date);
        //@ts-ignore
        const timeDifference = startingDate - currentDate;
  
        if (timeDifference > 0 && timeDifference < closestTimeDifferenceFuture) {
          // Si la différence de temps est positive (c'est-à-dire que la date de départ est dans le futur)
          // et que la différence de temps est inférieure à la plus petite différence trouvée jusqu'à présent
          closestChecklistFuture = checklist;
          closestTimeDifferenceFuture = timeDifference;
        } else if (timeDifference < 0 && -timeDifference < closestTimeDifferencePast) {
          // Si la différence de temps est négative (c'est-à-dire que la date de départ est dans le passé)
          // et que la différence de temps absolue est inférieure à la plus petite différence trouvée jusqu'à présent
          closestChecklistPast = checklist;
          closestTimeDifferencePast = -timeDifference;
        }
      }
    }
  
    // Priorité aux dates ultérieures, sinon utilisez les dates antérieures
    const finalChecklist = closestChecklistFuture //|| closestChecklistPast;
  
    console.log('finalChecklist ', finalChecklist);
    return finalChecklist;
  }
  
  
  getFutureChecklists(checklists = this.checklists) {
    const currentDate = new Date();
    
    const futureChecklists = checklists.filter(checklist =>
        checklist.routes.some(route => new Date(route.starting_date) > currentDate)
    );

    return futureChecklists;
}
onSubmit(){
  if(this.checkListForm.invalid){
    // this.toast_c.open('information','FillInAllTheFields')
    localStorage.setItem('incoming_checklist', JSON.stringify(this.checkListForm.value))

    this.router.navigate(['checklist/creation'],{queryParams: this.checkListForm.value})
    return
  }
  this.wantCreateChecklist.emit()
}

  
}
