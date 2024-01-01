import { proposedChecklist_cat } from './../../../global';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { FileChecklistService } from './../../service/file_checklist/file-checklist.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
declare let bootstrap: any;

@Component({
  selector: 'app-modal-new-folder',
  templateUrl: './modal-new-folder.component.html',
  styleUrls: ['./modal-new-folder.component.css']
})
export class ModalNewFolderComponent implements OnInit {

  folderForm : FormGroup
  @Input() cheklist_id : number
  @Input() forEdit = false
  @Input() isFirstLevel = false
  proposedChecklist  =  proposedChecklist_cat
  @Input() folder_id : number = 0
  @Input() cur_folder : File_Checklist
  @Output() onFolderCreate = new EventEmitter<File_Checklist>()
  @Output() onFolderUpdated = new EventEmitter<File_Checklist>()
  @ViewChild('#newf') newfolderModal: ElementRef;
  loading =  false
  title =  'Création de la valise '

  opt_checklist = proposedChecklist_cat
  constructor(private fb: FormBuilder, private fileChecklistService: FileChecklistService) {
    /*this.newfolderModal.onOpen.subscribe(() => {
      //do something
    });*/
  }

  ngOnInit(): void {

    this.createForm();
  }

  init( data){
    // this.createForm(data)
    this.title = 'Edition  de la valise '
    this.cur_folder = data
    console.log(Number(this.cur_folder.isDefault).toString(), ' cur_folder ', this.cur_folder)
    this.folderForm.controls['name'].setValue(this.cur_folder.name)
    this.folderForm.controls['is_default'].setValue(Number(this.cur_folder.isDefault).toString())
  }

  createForm(data?:any) {
    // alert(data)
    this.folderForm = this.fb.group({});
      this.folderForm.addControl('name', new FormControl(data ? data.name : '', Validators.required));
      this.folderForm.addControl('is_default', new FormControl('0'));

  }
  isInvalid(){
      let elts = this.proposedChecklist.filter(r => r.name === this.folderForm.controls['name'].value)
      console.log(Number(this.folderForm.controls['is_default'].value) === 1,  elts)
      return Number(this.folderForm.controls['is_default'].value) === 1 && elts.length === 0
  }
  onSubmit(){
    let folder = this.cur_folder ? this.cur_folder : new File_Checklist
    this.loading = true
    folder.isFolder = true
    folder.name = this.folderForm.controls['name'].value
    folder.isDefault = this.folderForm.controls['is_default'].value
    folder.checklist_id = this.cheklist_id
    folder.parent = this.folder_id

      this.fileChecklistService.post(folder).subscribe(result =>{
        console.log('dossier créer ', result)
        this.closeModal()
        this.onFolderCreate.emit(folder)
      })
  }

  closeModal(){
    this.loading = false
    var close_btn = document.getElementById("close")
    close_btn?.click()
    this.reset()
  }
  reset(){
    this.folderForm.controls['name'].setValue('')
    this.folderForm.controls['is_default'].setValue('0')
    this.title =  'Création de la valise '
  }

}
