import { AuthService } from './../../service/core/auth.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/Model/Utilisateur';
import { ReservationService } from './../../service/reservation/reservation.service';
import { ChecklistService } from './../../service/checklist/checklist.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { FileChecklistService } from 'src/app/service/file_checklist/file-checklist.service';
import { TranslationService } from 'src/app/service/translation/translation.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  @Input() currentFolder: File_Checklist
  @Input() currentCheklist: File_Checklist
  @Input() currentFile: File_Checklist
  @Input() user: User
  @Input() checklist: Checklist
  @Input() reservation: Checklist
  @Output() onFileDeleted = new EventEmitter<File_Checklist>()
  @Output() onFolderDeleted = new EventEmitter<File_Checklist>()
  @Output() onChecklistDeleted = new EventEmitter<Checklist>()
  @Output() onReservationDeleted = new EventEmitter<Checklist>()
  @Output() userDeleted = new EventEmitter<User>()

  constructor(private userService: UserService
    , private translationService: TranslationService,
     private fileChecklistService: FileChecklistService,
     private reservationService: ReservationService,
     private authService: AuthService,
      private checklsitservice: ChecklistService) { }

  ngOnInit(): void {
  }
  want_delete_cheklist(checklist){
    this.currentFile = null
    this.currentFolder = null
    this.checklist = checklist
  }
  want_delete_reservation(reservation){
    this.currentFile = null
    this.currentFolder = null
    this.reservation = reservation
  }
  want_delete_file(file){
    this.currentFile = file
    this.currentFolder = null
  }
  want_delete_folder(folder){
    this.currentFile = null
    this.currentFolder = folder
  }
  getLanguage(){
    return  this.translationService.getLanguage()
  }
  want_delete_user(user){
    this.currentFile = null
    this.currentFolder = null
    this.reservation = null
    this.user = user
  }

  deleteFolderOrChecklist(id){
    const f = this.currentFile ? this.currentFile : this.currentFolder
    if(this.currentFolder || this.currentFile){
      this.fileChecklistService.deleteFile(f.id).subscribe(result => {
        console.log('fichier suprimer', f.name)
        if(this.currentFile){
          this.onFileDeleted.emit(f)
          this.currentFile = null
        }
        else if(this.currentFolder){
          this.onFolderDeleted.emit(f)
          this.currentFolder = null
        }
      })
    }else if (this.checklist){
        this.checklsitservice.deleteChecklist(this.checklist.id).subscribe(r =>{
          this.onChecklistDeleted.emit(this.checklist)
        })
    }else if (this.reservation){
      this.reservationService.deleteReservation(this.reservation.id).subscribe(r =>{
        // alert(r)
        console.log(r)
        this.onReservationDeleted.emit(this.reservation)
      })
  }else if (this.user){
    this.authService.delUser()
    /*this.userService.getUser(this.user.id).subscribe(r =>{
      // alert(r)
      console.log(r)
      this.userDeleted.emit(this.user)
    })*/
  }
  }

}
