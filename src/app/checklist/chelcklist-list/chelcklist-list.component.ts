import { ChecklistService } from './../../service/checklist/checklist.service';
import { Component, OnInit } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';
import { User } from 'src/app/model/Model/Utilisateur';
import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chelcklist-list',
  templateUrl: './chelcklist-list.component.html',
  styleUrls: ['./chelcklist-list.component.css']
})
export class ChelcklistListComponent implements OnInit {

  user: User
  checklists: Array<Checklist>
  isArchived: boolean
  constructor(private route: ActivatedRoute, private router:Router, private userServiceFireBase: UserServiceFireBase,private checklistService: ChecklistService) {
    this.user = this.userServiceFireBase.getCurrentUser()
      route.queryParams.subscribe(params=>{
        this.isArchived = JSON.parse(params['archived'])
        this.getData({user_id:this.user.id, archived: this.isArchived })
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

  ngOnInit(): void {
    // this.getData({user_id:this.user.id, archived: false})
  }
  getData(params){

    this.checklists = null
    if(this.user){
      this.checklistService.get(params).subscribe(result =>{
        let routes = []
        console.log(result)
        if(result.length !== 0){
          result[result.length - 1].routes = result[result.length - 1].routes.sort((r1, r2) => {
            return new Date(r2.starting_date).getTime() - new Date(r1.starting_date).getTime()
          })

          console.log(result[result.length - 1].routes)
          this.checklists = result

          this.checklists = this.checklists.sort((checklists1,checklists2) => {
            checklists1.routes = checklists1.routes.sort((r1, r2) => {
              return new Date(r2.starting_date).getTime() - new Date(r1.starting_date).getTime()
            })
            checklists2.routes = checklists2.routes.sort((r1, r2) => {
              return new Date(r2.starting_date).getTime() - new Date(r1.starting_date).getTime()
            })
            let fRoute_date = '1995-11-01'
            let sRoute_date = '1995-11-01'
            for (const r1 of checklists1.routes) {
                if(new Date(fRoute_date) < new Date(r1.starting_date) )
                  fRoute_date = r1.starting_date
            }
            for (const r2 of checklists2.routes) {
                if(new Date(sRoute_date) < new Date(r2.starting_date) )
                  sRoute_date = r2.starting_date
            }
            console.log(fRoute_date, ' ', sRoute_date)
            return new Date(checklists1 && checklists1.routes[0].starting_date).getTime() - new Date(checklists2 && checklists2.routes[0].starting_date).getTime();
          })
        }
        else{
          this.checklists = result
        }
      })
    }
    else{
      this.checklists = []
    }
  }
  screen_archived(isArchived){
    console.log(!isArchived ,' ', isArchived)
    this.checklists = null
    this.router.navigate(['/mes-checklists'],{queryParams:{archived: !isArchived}})
    // window.location.reload();
    return
    if(isArchived)
      this.router.navigate(['/mes-checklists'],{queryParams:{archived: isArchived}})
    else
      this.router.navigate(['/mes-checklists'])
  }
}
