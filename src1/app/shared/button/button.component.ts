import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() loading = false;
  @Input() disabled : boolean;
  @Input() text = "Payer avec paypal";
  @Input() class_ = "";
  @Input() btn_class = ""
  @Input() bh = "55px"
  // @Input() btn_class = "align-items-center border-2 btn btn-lg btn-outline-light btn-primary d-flex fw-bold justify-content-center me-auto ms-auto w-75"
  constructor() { }

  ngOnInit(): void {
  }

}
