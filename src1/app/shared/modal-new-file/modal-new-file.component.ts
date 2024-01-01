import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { FileChecklistService } from './../../service/file_checklist/file-checklist.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-modal-new-file',
  templateUrl: './modal-new-file.component.html',
  styleUrls: ['./modal-new-file.component.css']
})
export class ModalNewFileComponent implements OnInit {

  fileForm : FormGroup
  @Input() cheklist_id : number
  @Input() folder_id : number = 0
  @Output() onFileCreate = new EventEmitter<File_Checklist>()
  @Output() onFileUpdated = new EventEmitter<File_Checklist>()
  @Input() currentFolder: File_Checklist
  @Input() currentFileToEdit: File_Checklist
  @Input() cur_file : File_Checklist
  @ViewChild(ToastComponent) toast_c: ToastComponent
  title =  'Création de l\'élément'
  loading = false

  constructor(private fb: FormBuilder, private fileChecklistService: FileChecklistService) { }

  ngOnInit(): void {
    this.createForm();
    $("#newfileModal").on('hide.bs.modal', function(){
      alert('The modal is about to be hidden.');
    });
    $('#newfileModal').on('shown.bs.modal', function () {
      alert('The modal is about to be hidden.');
    })
    $(window).click(function () {
      // alert('JQuery est installé');
    });
  }

  edit(data){
    this.title = 'Edition de l\'élément'
    this.cur_file = data
    // console.log(Number(this.cur_file.isDefault).toString())
    this.fileForm.controls['name'].setValue(this.cur_file.name)
    this.fileForm.controls['total'].setValue(this.cur_file.total)
    this.fileForm.controls['qty'].setValue((this.cur_file.qty))
  }

  createForm() {
    this.fileForm = this.fb.group({});
    // this.fileForm.addControl('for_disabled', new FormControl('0', Validators.required));
      this.fileForm.addControl('name', new FormControl(this.currentFileToEdit ? this.currentFileToEdit.name :'', Validators.required));
      this.fileForm.addControl('total', new FormControl(this.currentFileToEdit ? this.currentFileToEdit.total :'1', Validators.required));
      this.fileForm.addControl('qty', new FormControl(this.currentFileToEdit ? this.currentFileToEdit.qty :'', Validators.required));

  }
  onSubmit(){

    let folder = new File_Checklist

    folder.isFolder = false
    folder.name = this.fileForm.controls['name'].value
    folder.isDefault = false
    folder.checklist_id = this.cheklist_id
    folder.parent = this.folder_id
    folder.total = this.fileForm.controls['total'].value
    folder.qty = this.fileForm.controls['qty'].value
    if(folder.total < folder.qty){
      this.toast_c.open("Be Somewherer", "La quantité due ne dois pas être suppérieur à la quantité totale")
      this.fileForm.controls['qty'].setValue(folder.total)
      console.log(folder)
      // return
    }

    if(this.cur_file){
      this.fileChecklistService.update(this.fileForm.value, this.cur_file.id).subscribe(result =>{
        console.log('file Update créer ', result)
        this.onFileUpdated.emit(folder)
      })
    }else{
      this.fileChecklistService.post(folder).subscribe(result =>{
        console.log('Fle créer ', result)
        this.onFileCreate.emit(folder)
      })
    }

  }
  closeModal(){
    this.loading = false
    var close_btn = document.getElementById("close")
    close_btn?.click()
    this.reset
  }
  reset(){
    this.fileForm.controls['name'].setValue('')
    this.fileForm.controls['total'].setValue('1')
    this.fileForm.controls['qty'].setValue('')
    this.title =  'Création de l\'élément'
  }
  validateTotalGreaterThanQty(control: AbstractControl): { [key: string]: any } | null {
    const totalValue = control.get('total').value;
    const qtyValue = control.get('qty').value;
  
    if (totalValue !== null && qtyValue !== null && totalValue <= qtyValue) {
      return { 'totalLessThanQty': true };
    }
  
    return null;
  }
}
