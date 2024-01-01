import { FolderStats, File_Checklist } from './../../model/Model/Folder_Checklist';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-folder-state',
  templateUrl: './folder-state.component.html',
  styleUrls: ['./folder-state.component.css']
})
export class FolderStateComponent implements OnInit {

  @Input() stats : FolderStats
  @Input() title : string
  @Input() files : File_Checklist[]
  @Output() folderSelected = new EventEmitter<number>()
  @Output() wantEdit = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
    console.log('folders[folders.length - 1].stats' ,this.files)
  }
  onClick(index){
    this.folderSelected.emit(index)
  }
  wantEdit_(index){
    this.wantEdit.emit(index)

  }

}
