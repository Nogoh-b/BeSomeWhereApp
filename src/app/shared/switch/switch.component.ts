import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { rotateIn } from 'ng-animate';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  animations: [
    trigger('rotateIn', [transition('* => *', useAnimation(rotateIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5 }
    }))])
  ],
})
export class SwitchComponent implements OnInit {

  @Input() switched = false;
  @Output() onSwitched = new EventEmitter<boolean>();
  stateSwitch = 'Normal';
  constructor() { }

  ngOnInit(): void {

  }

  change(){
    this.switched = !this.switched
    this.stateSwitch = this.switched ? 'Switched' : 'Normal';
    this.onSwitched.emit(this.switched);
  }

}
