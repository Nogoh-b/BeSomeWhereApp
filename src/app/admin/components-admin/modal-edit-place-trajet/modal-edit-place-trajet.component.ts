import { FormGroup } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { RouteService } from 'src/app/service/route/route.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Route } from 'src/app/model/Model/Route';

@Component({
  selector: 'app-modal-edit-place-trajet',
  templateUrl: './modal-edit-place-trajet.component.html',
  styleUrls: ['./modal-edit-place-trajet.component.css']
})
export class ModalEditPlaceTrajetComponent implements OnInit {
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  loading = false
  formGroupRoute : FormGroup
  route: Route
  @Output() route_updated = new EventEmitter<any>()
  constructor(  private fb : FormBuilder,private routeService: RouteService) { }

  ngOnInit(): void {
    this.updateForm()
  }
  updateForm(data?: Route){
    console.log(data)
    this.route = data
    this.formGroupRoute = this.fb.group({});
    this.formGroupRoute.addControl('places', new FormControl(this.route && this.route.places, Validators.required));
  }
  onSubmitRoute(){
    this.loading = true
    this.route.places = this.formGroupRoute.value.places
    console.log(this.route)
    this.routeService.update(this.route, this.route.id).subscribe(r =>{
      this.route_updated.emit("")
      var close_btn = document.getElementById("close_btn")
      close_btn.click()
      this.toast_c.open('Be Somewhere', 'Elément mis à jour')
      this.loading = false
    })
  }

}
