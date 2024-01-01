import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/model/Model/Reservation';
import { ReservationService } from './../../service/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { TrajetCardStatus, total_take_at_homr } from 'src/global';
import { User } from 'src/app/model/Model/Utilisateur';
import { UserServiceFireBase } from 'src/app/service/core/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user: User
  reservations: Reservation[]
  status: number = TrajetCardStatus.Created
  take_at_home_price = JSON.parse(localStorage.getItem('conf')).price_take_to_home
  isArchived: boolean
  constructor(private route: ActivatedRoute,private router:Router,private userServiceFireBase: UserServiceFireBase,private reservationService: ReservationService) {

    this.user = this.userServiceFireBase.getCurrentUser()
    route.queryParams.subscribe(params=>{
    //@ts-ignore
    this.isArchived = JSON.parse(params['archived'])
      this.getData({user_id:this.user.id, all_: true, archived: this.isArchived })
      return;
      if(this.isArchived){
        console.log(params)
        this.getData({user_id:this.user.id, archived:this.isArchived})
      }
      else{
        console.log(params)
        this.getData({user_id:this.user.id, archived:this.isArchived})
      }
    })
  }
  getTakeAtHomeOption(reservation){
    // console.log('reservation.take_at_home ' ,reservation && reservation.take_at_home)
    return reservation.take_at_home ? this.take_at_home_price * total_take_at_homr(reservation.passengers,reservation.take_at_home) : 0
  }
  takeAtHomeCount(passengers, take_at_home){
    return total_take_at_homr(passengers, take_at_home)
  }
  ngOnInit(): void {


  }
  getData(params){
    this.user = this.userServiceFireBase.getCurrentUser()
    if(this.user){
      this.reservationService.get(params).subscribe( result => {
        this.reservations = result
        console.log(this.reservations)
        this.reservations = this.reservations.sort((reservation1,reservation2) => {
          return new Date(reservation1.starting_date).getTime() - new Date(reservation2.starting_date).getTime()
        })
      })
    }
    else{
      this.reservations = []
    }
  }

  screen_archived(isArchived){
    console.log(!isArchived ,' ', isArchived)
    this.reservations = null
    this.router.navigate(['/mes-trajets/'],{queryParams:{archived: !isArchived}})
    setTimeout(() => {
      // window.location.reload();
    }, 500);
    return
    if(isArchived)
      this.router.navigate(['/mes-checklists'],{queryParams:{archived: isArchived}})
    else
      this.router.navigate(['/mes-checklists'])
  }

}
