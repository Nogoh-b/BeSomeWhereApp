import { ChecklistService } from './../../service/checklist/checklist.service';
import { Component, OnInit } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  checklists: Array<Checklist> = []
  constructor(private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.checklistService.get({user_id:1}).subscribe(result =>{
      console.log(result)
      this.checklists = result
      this.checklists = this.checklists.sort((checklists1,checklists2) => {
        return new Date(checklists1.created_at).getTime() - new Date(checklists2.created_at).getTime();
      })
    })
  }

}
