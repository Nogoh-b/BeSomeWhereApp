import * as globals from './../../../global';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Checklist } from 'src/app/model/Model/Checklist';

@Component({
  selector: 'app-checklist-card',
  templateUrl: './checklist-card.component.html',
  styleUrls: ['./checklist-card.component.css']
})
export class ChecklistCardComponent implements OnInit {

  @Input() checklist : Checklist
  @Input() forCustomize = false
  @Output() onWantDeleted = new EventEmitter<Checklist>()
  screenAll = false
  model_trans = globals.transport_mode

  constructor() { }

  ngOnInit(): void {
  }

  switchScreenAll(){
    this.screenAll = !this.screenAll
  }

  wantDeleted(){
    this.onWantDeleted.emit(this.checklist)
  }

  getIndexTrans(id){
    let i = false
    for (let index = 0; index < this.checklist.transports.length; index++) {
      const element = this.checklist.transports[index];
      if(element.transport_id === id ){
        i = true
        return i
      }
    }
    return i
  }

}
