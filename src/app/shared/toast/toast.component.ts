import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeOut, fadeOutUp, rotateIn, slideInDown, slideInUp } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';
import { TranslatePipe } from 'src/app/pipe/translation/translation.pipe';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [TranslatePipe], // Ajoutez le pipe ici pour qu'il soit injectable
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
  constructor(private toastr: ToastrService, private translatePipe: TranslatePipe) {}

  @Input() title = 'Be SomeWhere'
  @Input() status = 'close'
  @Input() desc = 'NoSharedTaxi'
  time : number = 2500
  opened : boolean = false
  // @Input() desc = 'Be SomeWhere'

  open(title?:string, desc?:string, delay:number = this.time){
    const translatedText = this.translatePipe.transform(desc, { variable: 'value' });
    this.toastr.info( translatedText,title,{closeButton: true,timeOut : delay, enableHtml: true, positionClass: 'toast-bottom-right'});
    return

    //@ts-ignore
    this.close()
    this.title = title != '' ? title : this.title;
    //@ts-ignore
    this.desc = desc
    this.opened = true

    // this.status = 'open'
    setTimeout(() => {
      this.close()
      // return this.http.get('')
    }, delay);
  }

  close(){
    this.title = '';
    this.desc = ''
    this.opened = false
    // this.status = 'close'
  }

    //@ts-ignore


    ngOnInit() {

    }

 openToast(title: string, desc: string) {
    this.title = title;
    this.desc = desc;
    this.opened = true;

    // Close the toast automatically after 3 seconds
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.opened = false;
  }

}
