import { ItemProposedService } from './../../service/item_proposed/item-proposed.service';
import { FileChecklistService } from './../../service/file_checklist/file-checklist.service';
import { ItemChecklist } from './../../model/Model/Item_Checklist';
import * as globals from './../../../global';
import {SERVER_FOR_UPLOAD} from './../../../global';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { ItemChecklistCategoryService } from 'src/app/service/item_checklist_category/item-checklist-category.service';
import { TranslationService } from 'src/app/service/translation/translation.service';
import { Item_Proposed } from '../../model/Model/Item_Proposed';

@Component({
  selector: 'app-proposed-checklist',
  templateUrl: './proposed-checklist.component.html',
  styleUrls: ['./proposed-checklist.component.css']
})
export class ProposedChecklistComponent implements OnInit {

  proposedChecklist: any[];
  items = new Array <File_Checklist>();
  @Output() onItemAdded = new EventEmitter<File_Checklist>()
  @Input() checklist_id: number
  @Input() file_id: number
  @Input() file: File_Checklist
  @Input() files: File_Checklist[]

  language = 'en'

  SERVER_FOR_UPLOAD = SERVER_FOR_UPLOAD

  constructor(private fileChecklistService: FileChecklistService, private translationService: TranslationService , private itemProposedService : ItemProposedService , private item_category_service : ItemChecklistCategoryService ) { }

  ngOnInit(): void {
   
    this.item_category_service.get().subscribe(res => {
      this.proposedChecklist = res
      this.itemProposedService.get().subscribe(res => {
      // this.proposedChecklist = res
        for (const item of res) {
          let data = new File_Checklist();
          data.name = item.name
          data.parent = item.category_id
          data.qty = 0
          data.name_en = item.name_en
          data.isFolder = false
          data.id = item.id
          data.checklist_id = this.checklist_id
          data.total = 0
          this.items.push(data)
          console.log('item added12 ', item)
        }

      })
    })


    // this.proposedChecklist = globals.proposedChecklist_cat
  }

  getLanguage(){
    return  this.translationService.getLanguage()
  }

  isInFolder(id){
    return this.files.findIndex(d => d.isDefault === id) != -1
  }
  getItems(id){
    return this.items.filter(result =>{
      return result.parent === id
    })
  }

  addItem(item: File_Checklist){
    console.log(item)
    let data = new File_Checklist();
    data.name = item.name
    data.name_en = item.name_en
    data.parent = this.file_id
    data.qty = item.qty
    data.isFolder = false
    data.isDefault = item.id
    data.checklist_id = this.checklist_id
    data.total = item.total
    // return
    this.fileChecklistService.post(data).subscribe(result =>{
      console.log('item added ', result)
      this.onItemAdded.emit(result)
    })
  }

}
