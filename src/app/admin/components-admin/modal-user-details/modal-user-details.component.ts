import { Component, OnInit, Input } from '@angular/core';
import { ChecklistService } from 'src/app/service/checklist/checklist.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { Checklist } from 'src/app/model/Model/Checklist';
import { Reservation } from 'src/app/model/Model/Reservation';
import { User } from 'src/app/model/Model/Utilisateur';

@Component({
  selector: 'app-modal-user-details',
  templateUrl: './modal-user-details.component.html',
  styleUrls: ['./modal-user-details.component.css']
})
export class ModalUserDetailsComponent implements OnInit {
  @Input() user: User
  checklists: Array<Checklist>
  reservations: Reservation[]
  constructor(    private checklistService: ChecklistService,
    private reservationService: ReservationService) { }
  init(user: User){
    this.user = user
    console.log(user)
    this.checklistService.get({user_id:this.user.id}).subscribe(result =>{
      console.log(result)
      this.checklists = result
    })
    this.reservationService.get({user_id :this.user.id, all_: true}).subscribe( result => {
      this.reservations = result
      console.log(this.reservations)
    })
  }
  ngOnInit(): void {
  }

}
