import { ToastComponent } from './../../shared/toast/toast.component';
import { MapService } from './../../service/map/map.service';
import { DriveService } from './../../service/drive/drive.service';
import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import { Router } from '@angular/router';
import { PointService } from 'src/app/service/point/point.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements AfterViewInit {
  @Input() screen_all = true;
  @Input() switched = false;
  @Input() date = "";
  @Input() pointA: Point
  @Input() pointB: Point

  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild('label1') label1 ;
  @ViewChild('label2') label2;
  @ViewChild('date_') date_element: ElementRef;
  @Output() points_retreived = new EventEmitter<Point[]>();

  //for form
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private driveService: DriveService, private route: Router, private mapService: MapService,public pointService : PointService) { }

  ngAfterViewInit(): void {
    // alert(this.pointB.address)
    if(this.pointB){
      this.label2.value = this.pointB.address+ ' , '+this.pointB.city+ ' , '+ this.pointB.country
    }
    if (this.pointA) {
      this.label1.value = this.pointA.address+ ' , '+this.pointA.city+ ' , '+ this.pointA.country
    }

      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, {
        // validator: MustMatch('password', 'confirmPassword')
    });

  }

  switch_(s : boolean){
    // alert(this.label1.);
    this.switched = s;
    const t = this.label2.value;
    this.label2.value =this.label1.value;
    this.label1.value =t;
    console.log('point A and B ', this.pointA, this.pointB)

    //  alert(JSON.stringify(this.pointA));
    //  alert(this.label1.value);
  }

  searchDrive(){
     let start0 = this.switched ? this.pointB.longitude+','+this.pointB.lattitude : this.pointA.longitude+','+this.pointA.lattitude
     this.pointService.get().subscribe(points =>{
       console.log('points ', points)
       let destinations: string[] = [];
       points.forEach(point => {
         destinations.push(point.longitude+','+point.lattitude)
        });
        this.mapService.getMatrix({start0,destinations}).subscribe(result =>{
          console.log('Matrix ',result.response.matrixEntry);
          let arroundPoints: Point[]  = [];
          for (let index = 0; index < points.length; index++) {
            let point = points[index]
            if(result.response.matrixEntry[index].summary && result.response.matrixEntry[index].summary.distance  > 0){
              point.distance = result.response.matrixEntry[index].summary.distance / 1000  ;
              arroundPoints.push(point);
            }
          }
          console.log('Points ',arroundPoints);

        })
      })

  }

  btnclicked(){
    // let station_p = this.switched ? this.pointA : this.pointB
    if(!this.pointA || this.pointA.address === '' ){
      this.toast_c.open('Be Somewhere', 'vous devez remplir votre adresse', 3000)
      return
    }
    if(!this.pointB || this.pointB.address === '' ){
      this.toast_c.open('Be Somewhere', 'vous devez choisir une station', 3000)
      return
    }
    if(!this.pointB.id){
      this.toast_c.open('Be Somewhere', 'vous devez selectionner la station parmi celles proposées', 3000)
      return
    }
    console.log('point A and B ', this.pointA.id, this.pointB.id)

    // vérifier si l'adresse existe dans la base de donnée puis dans le her map au cas ou
    let index =  0
    let point = new Point()
    this.pointService.get({search : this.getText(index)}).subscribe(result =>{
      console.log('point!!! ', point)
      if(result.length === 1){
        console.log('point trouvé ', this.getText(index) , result[0])
        this.pointA = result[0]
        this.searchAroundPoints(this.pointA, this.pointB)
      }
      else{
        console.log('point non trouvé ', this.getText(index))
        this.mapService.search({q : this.getText(index) }).subscribe(result =>{
          if(result.items.length > 0){
            console.log(result.items[0])
            this.pointA.lattitude = result.items[0].position.lat
            this.pointA.longitude = result.items[0].position.lng
            this.searchAroundPoints(this.pointA, this.pointB)

          }
          else{
            this.toast_c.open('Be Somewhere', 'Point Non valide',3500)
          }
        })
      }

    })
  }

  searchAroundPoints(pointA: Point, pointB: Point){
    if(!pointA || !pointB)
      return
    if(this.route.url.includes('/trajet')){
      // let start0 = this.switched ? pointB.longitude+','+pointB.lattitude : pointA.longitude+','+pointA.lattitude
      let start0 =  pointA.longitude+','+pointA.lattitude



      this.pointService.get({all: true}).subscribe(points =>{
      console.log('points ', points)
      let destinations: string[] = [];
      points.forEach(point => {
        destinations.push(point.longitude+','+point.lattitude)
       });
       this.mapService.getMatrix({start0,destinations}).subscribe(result =>{
         console.log('Matrix ',result.response.matrixEntry);
         let arroundPoints: Point[]  = [];
         for (let index = 0; index < points.length; index++) {
           let point = points[index]
           if(result.response.matrixEntry[index].summary && result.response.matrixEntry[index].summary.distance  > 0){
             point.distance = result.response.matrixEntry[index].summary.distance / 1000  ;
             arroundPoints.push(point);
           }
         }
         console.log('Points ',arroundPoints);
         this.points_retreived.emit(arroundPoints);

       })
      })
    }
    else{
      this.route.navigate(['trajets/creation/1'], {state: {pointA: this.pointA, pointB: this.pointB, date: this.date}})
    }
  }
  getText(i){
    if(this.label1)
      console.log(this.label1.value )
    if(i === 0){
      return this.pointA ? this.pointA.address+ ' '+this.pointA.city+ ' '+ this.pointA.country : ''
    }
    return this.pointB ? this.pointB.address+ ' '+this.pointB.city+ ' '+ this.pointB.country : ''
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

change(val){
  console.log(val)
}

}
