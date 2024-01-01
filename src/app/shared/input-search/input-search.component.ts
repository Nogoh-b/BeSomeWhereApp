import { Point } from './../../model/Model/Point';
import { rotateIn } from 'ng-animate';
import { useAnimation, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointService } from 'src/app/service/point/point.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
  animations: [
    trigger('rotateIn', [transition('* => *', useAnimation(rotateIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5 }
    }))])
  ],
})
export class InputSearchComponent implements OnInit {
  constructor(public pointService : PointService) { }
  @Input() focus : boolean = false;
  @Input() label : string = 'Adresse';
  @Input() value : string = '';
  stateLabel = 'Normal';
  @Output() textChanged = new EventEmitter<Point>();

  data: Array<Point> = [] ;
  @Input() currentData : Point | undefined ;

  ngOnInit(): void {
  }

  focusFunction(){
    this.focus = true;
  }
  focusOutFunction(){
    if(!this.focus)
      return
    setTimeout(() => {
      this.focus = false;
    }, 300);
  }
  change(text: string){
    this.focus = true;
    this.getData(text)
    let point = new Point() ;
    point.city = ""
    point.address = text
    point.country = ""
    this.currentData = point
    this.textChanged.emit(point);

    console.log(point);
  }
  input(){
    this.focus = true;
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    alert('kkk');
  }

  //mettre  jour l'adress séllectionée
  setText(i: number){
    this.currentData = this.data[i];
    console.log('points ', this.currentData)
    this.value =this.currentData.address+ ' '+this.currentData.city+ ' '+ this.currentData.country
    this.textChanged.emit(this.currentData);

  }

  // récuperer les autres points
  getData(text){
    this.pointService.get({search: text}).subscribe(result =>{
      console.log('points ', result)
      this.data = result;
    })
  }


}
