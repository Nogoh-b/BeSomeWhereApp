import { Router } from '@angular/router';
import { ReservationService } from './../service/reservation/reservation.service';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/Model/Utilisateur';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChecklistService } from '../service/checklist/checklist.service';
import { Checklist } from '../model/Model/Checklist';
import { Reservation } from '../model/Model/Reservation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  checklists: Array<Checklist>
  reservations: Reservation[]
  user: User
  constructor(private userServiceFireBase: UserServiceFireBase, private fb: FormBuilder,
    private checklistService: ChecklistService,
    private route: Router,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.user =this.userServiceFireBase.getCurrentUser()
    this.checklistService.get({user_id:this.user.id}).subscribe(result =>{
      console.log(result)
      this.checklists = result
    })
    this.reservationService.get({user_id :this.user.id, all_: true}).subscribe( result => {
      this.reservations = result
      console.log(this.reservations)
    })
  }

  wantCreateChecklist(){
    this.route.navigateByUrl("checklist/creation")
  }

}
