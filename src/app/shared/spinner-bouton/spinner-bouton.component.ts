import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner-bouton',
  templateUrl: './spinner-bouton.component.html',
  styleUrls: ['./spinner-bouton.component.css']
})
export class SpinnerBoutonComponent implements OnInit {

  @Input() max_value: number = 20;
  @Input() label: string = 'passenger';
  @Input() value = 0 ;
  @Input() class_ = "align-items-center d-flex justify-content-center pb-2 pb-sm-4 pe-2 pe-sm-2 ps-2 ps-sm-2 pt-0 pt-sm-4 t-neutral" ;
  // @Input() class_ = "align-items-center d-flex justify-content-center pb-4 pt-4 t-neutral" ;
  @Output() value_changed = new EventEmitter<number>();
  @Output() is_invalid = false
  constructor() { }

  ngOnInit(): void {
  }
    //@ts-ignore

  getValue(v){
    // alert(this.value)
    // this.value += v
    this.value_changed.emit(this.value);
  }
  //@ts-ignore
  setValue(v){
    // if(this.value  > 0 && this.value < this.max_value){
      this.value += v
      this.value_changed.emit(this.value);
    // }
  }
  onBlur() {
    console.log('La méthode onBlur() a été appelée');
    if (this.value > this.max_value) {
      this.value = this.max_value;
    }
  }
  onKeyPress() {
    console.log('La méthode onKeyPress() a été appelée');
    this.is_invalid = this.value > this.max_value
  }
}
