import { FileChecklistService } from './../../service/file_checklist/file-checklist.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';

@Component({
  selector: 'app-toolsbar-checklist',
  templateUrl: './toolsbar-checklist.component.html',
  styleUrls: ['./toolsbar-checklist.component.css']
})
export class ToolsbarChecklistComponent implements OnInit {

  constructor(private fileChecklistService: FileChecklistService) { }
  @Output() onActionPerformed = new EventEmitter<string>()
  @Output() onDeposit = new EventEmitter<string>()
  @Output() onEdit = new EventEmitter<string>()
  @Output() onDelete = new EventEmitter<string>()
  @Output() onCreateFile = new EventEmitter<string>()
  @Output() onCreateFolder = new EventEmitter<string>()
  @Input() currentFolder : File_Checklist
  @Input() currentCopy : File_Checklist
  @Input() currentCut : File_Checklist
  @Input() currentDel : File_Checklist
  ngOnInit(): void {
  }

  copy(folder?: File_Checklist){
    this.currentCut = null
    console.log(folder)
    this.currentCopy = folder ;
    this.onActionPerformed.emit(this.currentCopy.name +' '+ 'à été copié')
  }
  cut(){
    this.currentCopy = null
    this.currentCut = this.currentFolder
    this.onActionPerformed.emit(this.currentCut.name +' '+ 'à été coupé')
    console.log(this.currentCut)
  }
  edit(){
    this.onEdit.emit('')
  }
  delete(){
    this.onDelete.emit('')
  }
  createFolder(){
    this.onCreateFolder.emit('')
  }

  createFile(){
    this.onCreateFile.emit('')
  }

  paste(){
    if(this.currentCut){
      this.fileChecklistService.update({parent: this.currentFolder.id }, this.currentCut.id).subscribe(result => {
        console.log(this.currentCut.name+ ' à bien été coupé dans ', result)
      })
      this.onDeposit.emit()
      this.onActionPerformed.emit(this.currentCut.name+ ' à bien été coupé dans '+ this.currentFolder.name)
      this.currentCut = null
    }else{
      this.currentCopy.parent = this.currentFolder.id
      this.fileChecklistService.post(this.currentCopy).subscribe(result => {
        console.log(this.currentCopy.name+ ' à bien été copié dans ', result)
        this.onActionPerformed.emit(this.currentCopy.name+ ' à bien été copié dans '+ this.currentFolder.name)
      })
      this.onDeposit.emit()
      this.currentCopy = null
    }
  }

  canPaste(){
    if(this.currentCopy){
      return true
    }
    else if(this.currentCut){
      if(this.currentFolder && (this.currentFolder.id != this.currentCut.id) && this.currentFolder.id != this.currentCut.parent && this.currentFolder.parent != this.currentCut.id){

        // console.warn('can paste ' ,this.currentFolder.stats.folders[this.currentCut.id], ' ', this.currentFolder, ' ', this.currentCut)
        if(!this.currentFolder.stats.folders || !this.currentFolder.stats.folders[this.currentFolder.id] ){
          return true
        }
        // if(this.currentFolder.id != this.currentCut.parent)
        //   return true
      }
    }
    return false
    // currentCopy || ((currentCut && this.currentFolder.id != currentCut.id) && this.currentFolder && this.currentFolder.stats.folders && this.currentFolder.stats.folders[currentCut.id] )
  }

}
