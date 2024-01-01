import { Component, Input, OnInit } from '@angular/core';
import { FolderStats } from 'src/app/model/Model/Folder_Checklist';

@Component({
  selector: 'app-checklist-state',
  templateUrl: './checklist-state.component.html',
  styleUrls: ['./checklist-state.component.css']
})
export class ChecklistStateComponent implements OnInit {

  constructor() { }
  @Input() stats : FolderStats

  ngOnInit(): void {
  }

}
