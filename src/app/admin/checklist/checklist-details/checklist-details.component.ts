
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';
import { FileChecklistService } from 'src/app/service/file_checklist/file-checklist.service';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { ChecklistService } from 'src/app/service/checklist/checklist.service';

@Component({
  selector: 'app-checklist-details',
  templateUrl: './checklist-details.component.html',
  styleUrls: ['./checklist-details.component.css']
})
export class ChecklistDetailsComponent implements OnInit {
  id= '';
  files : Array<File_Checklist> = []
  fillesTree : Array<File_Checklist[]> = []
  folders : Array<File_Checklist> = []
  @ViewChild(ToastComponent) toast_c: ToastComponent
  checklist : Checklist //= {"id":1,"title":"Visite Cameroun","with_baby":false,"user_id":1,"created_at":"2021-10-07 19:48:03","updated_at":"2021-11-09 01:41:03","stats":{"total_files":8,folders: {id:1},files: {id:1},"total_folders":5,"total_qty":280,"qty":83},"transports":[{"id":99,"transport_id":1,"checklist_id":1,"created_at":"2021-11-09 01:41:03","updated_at":"2021-11-09 01:41:03"},{"id":100,"transport_id":2,"checklist_id":1,"created_at":"2021-11-09 01:41:03","updated_at":"2021-11-09 01:41:03"},{"id":101,"transport_id":4,"checklist_id":1,"created_at":"2021-11-09 01:41:03","updated_at":"2021-11-09 01:41:03"}],"routes":[{"id":9,"country":"France","city":"Paris","checklist_id":1,"starting_date":"2021-11-08 00:00:00","arrival_date":"2011-11-28 00:00:00","created_at":"2021-11-08 18:29:20","updated_at":"2021-11-09 01:41:03"}]}
  constructor(public route: ActivatedRoute,
    private router: Router,
    private checklistService: ChecklistService,
    private fileChecklistService: FileChecklistService) {

    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
  }

  getFiles(file: File_Checklist,id, for_back?: boolean){
    this.fileChecklistService.get({parent: file.id , checklist_id: id }).subscribe(result =>{
      console.log('fichier ', result,' ',{parent: file.id , checklist_id: id } )
      this.files = result;
      this.fillesTree.push(result)
      if(file.id && !for_back){
        this.folders.push(file)
      }
    })
  }

  ngOnInit(): void {
    this.reset()
  }
  reset(){
    this.checklistService.getCheckList(this.id).subscribe(result => {
      console.log(result)
      this.checklist = result;
      let file = new File_Checklist()
      file.id = 0
      this.getFiles(file,this.checklist.id);
    })
  }

  //@ts-ignore
  //récupperer le dossier courant
  getFolders(){
    if(this.fillesTree.length > 0)
      return this.fillesTree[this.fillesTree.length - 1].filter(file =>{
        return file.isFolder
      })
  }

  // récuperer les element du fichier courant
  //@ts-ignore
  getElements(){
    if(this.fillesTree.length > 0)
      return this.fillesTree[this.fillesTree.length - 1].filter(file =>{
        return !file.isFolder
      })
  }

  folderDeleted(index){
    this.toast_c.open("Be Somewhere", "Sac suprimé")
    this.navigateToFolder(index)
  }

  fileDeleted(id){
    this.toast_c.open("Be Somewhere", "Elément suprimé")
    this.refresh(id)
  }

  navigateToFolder(index){
    console.log('navigate to folder ', index)
    const len  = this.folders.length - 1
    for (let i = index; i < len ; i++) {
      this.folders.pop()
      this.fillesTree.pop()
    }
    let f = new File_Checklist
    f.id = 0
    if(this.folders.length > 0){
      console.log(f, index)
      const i = this.folders.length - 1
      f = this.folders[i]
    }
    this.getFiles(f,this.checklist.id,true)
  }

  //ajoute un element depuis la checklist proposée
  addItemToFileTree(item: File_Checklist){
    // this.fillesTree[this.fillesTree.length - 1].push(item)
    this.refresh(this.checklist.id)
  }

  //refresh on new item added
  refresh(id){
    if(this.folders.length <= 0){
      this.reset()
    }
    else{
      const index = this.folders.length - 1
      let file = this.folders[index]

      // recuperation ou actualistation du dossier
      this.fileChecklistService.getFile(file.id).subscribe(file_r => {
        file = file_r;

        this.fileChecklistService.get({parent: file.id , checklist_id: this.checklist.id }).subscribe(result =>{
          // console.log('fichier ', file, ' ', result,' ',{parent: file.parent , checklist_id: id } )
          console.log('fichier ', result,' ',file)
          this.files = result;
          this.fillesTree[this.fillesTree.length - 1] = result
          this.folders[this.folders.length - 1] = file
        })
        this.checklistService.getCheckList(this.id).subscribe(result => {
          console.log(JSON.stringify(result))
          this.checklist = result;
        })

      })
    }
  }


  //retourne le id du dossier courant
  getCurrentFileId(){
    return !this.getCurrentFolder() ? 0 : this.getCurrentFolder().id
  }
  getCurrentFolder(){
    return this.folders && this.folders.length <= 0 ? null : this.folders[this.folders.length-1]
  }
  getPreviousFileIndex(){
    return this.folders && this.folders.length <= 1  ? -1 : this.folders.length - 2
  }
  getPreviousFolder(){
    return this.folders && this.folders.length <= 1 ? null : this.folders[this.folders.length-2]
  }

  checklistDeleted(){
    this.toast_c.open("Be Somewhere", "Checklist suprimée")
    setTimeout(() => {
      this.router.navigateByUrl('/')
    }, 2500);
  }



}
