import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeOut, fadeOutUp, rotateIn, slideInDown, slideInUp } from 'ng-animate';
import { of } from 'rxjs';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('slideInDown', [
      transition('* => open', useAnimation(slideInDown, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.3 }
    })),
    transition('open => *', useAnimation(fadeOut, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.3 }
    }))
  ])
  ]
})
export class ToastComponent implements OnInit {

  @Input() title = 'Be SomeWhere'
  @Input() status = 'close'
  @Input() desc = 'NoSharedTaxi'
  time : number = 2500
  opened : boolean = false
  // @Input() desc = 'Be SomeWhere'

  open(title?:string, desc?:string, delay:number = this.time){
    //@ts-ignore
    this.title = title != '' ? title : this.title;
    //@ts-ignore
    this.desc = desc
    this.opened = true
    this.status = 'open'
    setTimeout(() => {
      this.close()
      // return this.http.get('')
    }, delay);
  }

  close(){
    this.title = '';
    this.desc = ''
    this.opened = false
    this.status = 'close'
  }

    //@ts-ignore

    constructor() { }

    ngOnInit() {

    }



}
