import { DriveBaseService } from './../../../service/drive-base.service';
import { Drive_Base } from './../../../model/Model/Drive_Base';
import { DriveService } from './../../../service/drive/drive.service';
import { PointService } from 'src/app/service/point/point.service';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Point } from 'src/app/model/Model/Point';
import { Drive } from 'src/app/model/Model/Drive';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-modal-create-drive',
  templateUrl: './modal-create-drive.component.html',
  styleUrls: ['./modal-create-drive.component.css']
})
export class ModalCreateDriveComponent implements OnInit {
  formGroupDrive : FormGroup
  points: Point[]
  point1: Point
  point2: Point
  loading = false
  address1Isvalid = true
  address2Isvalid = true
  @ViewChild(ToastComponent) toast_c: ToastComponent;

  @Output() trajectCreated = new EventEmitter <Drive_Base>()
  @Input() id: string

    constructor(private pointService: PointService,  private fb : FormBuilder,private driveService: DriveBaseService) { }

  ngOnInit(): void {
    this.createForm()
    this.pointService.get({status: '0'}).subscribe(points =>{
      this.points = points
    })

  }
  createForm(){


    this.formGroupDrive = this.fb.group({});
    this.formGroupDrive.addControl('price', new FormControl( '1', Validators.required));
    // this.formGroupDrive.addControl('places', new FormControl( 1, Validators.required));
    this.formGroupDrive.addControl('id_car', new FormControl( '', Validators.required));
    this.formGroupDrive.addControl('to_station', new FormControl( false, Validators.required));
    this.formGroupDrive.addControl('station', new FormControl( parseInt(this.id), Validators.required));
    this.formGroupDrive.addControl('date', new FormControl( new Date(), Validators.required));
    this.formGroupDrive.addControl('total_places', new FormControl(1, Validators.required));
  }
  onSubmitDrive(){
   /* if(this.formGroupDrive.status == 'INVALID' || !this.point1 || !this.point2){
      this.address1Isvalid = this.point1 !== undefined
      this.address2Isvalid = this.point2 !== undefined
      this.toast_c.open('Be Somewhere', 'rempllissez toute les informations ')
      return
    }
    if(this.point1.id === this.point2.id){
      this.toast_c.open('Be Somewhere', 'Les adresses sont les mêmes')
      return
    }
    let d = this.formGroupDrive.value
    d.point_a = this.point1.id
    d.point_b = this.point2.id*/
    this.loading =true
    this.formGroupDrive.value.places = this.formGroupDrive.value.total_places
    let d_s = new Date(this.formGroupDrive.value.date)

    // console.log(this.formGroupDrive.value);

    // console.log(d_s.toLocaleDateString());

    // return
    this.driveService.post(this.formGroupDrive.value).subscribe(drive =>{
      this.loading =false
      this.trajectCreated.emit(drive)
      this.toast_c.open("Be Somewhere ", "Horraire Ajouter")
      console.log(drive)
    })
  }

  adressSelected(c,a){
    let adrs= this.points.filter(result =>{
      return result.address.toLowerCase()  === c.target.value.toLowerCase()
    })
    if(a){
      this.point1 = undefined
      this.address1Isvalid = adrs.length > 0
    }
    else{
      this.point2 = undefined
      this.address2Isvalid = adrs.length > 0
    }
    if(adrs.length > 0){
      if(a)
        this.point1 = adrs[0]
      else
        this.point2 = adrs[0]
    }
  }
}
