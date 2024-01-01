import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.component.html',
  styleUrls: ['./home-visit.component.css']
})
export class HomeVisitComponent implements OnInit {

  @Input() users
  constructor() { }

  ngOnInit(): void {
  }

}
