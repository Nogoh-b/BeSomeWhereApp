import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.css']
})
export class EmptyPageComponent implements OnInit {

  @Input() btn1_text
  @Input() details
  @Input() details_class = ''
  @Input() title = 'Aucune Donnée trouvé'
  @Input() title_class = ''
  @Input() btn2_text
  @Input() route_btn1
  @Input() route_btn2
  @Output() btn1_clicked = new EventEmitter<any>()
  @Output() btn2_clicked = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }
  onClickBtn1(){
    this.btn1_clicked.emit()
  }
  onClickBtn2(){
    this.btn2_clicked.emit()
  }

}
