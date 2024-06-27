import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { MapService } from 'src/app/service/map/map.service';

@Component({
  selector: 'app-input-search-adress',
  templateUrl: './input-search-adress.component.html',
  styleUrls: ['./input-search-adress.component.css']
})
export class InputSearchAdressComponent implements OnInit {

  @Output() addressChange = new EventEmitter<string>()
  @Input() address
  points:any[] = []
  constructor( private mapService: MapService,) { }

  ngOnInit(): void {
  }

  updateAdress(e){
    console.log('updateAdress')
    this.addressChange.emit(e.target.value)
  }
  textInput(e){
    setTimeout(() => {
      this.mapService.search({q:e.target.value}).subscribe(points =>{
        console.log(points.features)
        this.points = this.mapService.transformResponse(points).items
        console.log(this.mapService.transformResponse(points))
      })
    }, 1000);
  }



}
