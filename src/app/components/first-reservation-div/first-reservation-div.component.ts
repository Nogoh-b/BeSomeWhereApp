import { UserServiceFireBase } from './../../service/core/user.service';
import { PointMap } from './../../model/map/point';
import { User } from './../../model/Model/Utilisateur';
import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MapService } from 'src/app/service/map/map.service';
declare let bootstrap: any;

@Component({
  selector: 'app-first-reservation-div',
  templateUrl: './first-reservation-div.component.html',
  styleUrls: ['./first-reservation-div.component.css']
})
export class FirstReservationDivComponent implements OnInit {
  is_first_reservation = true
  map: any;
  @Input() height = '250px'
  users: User[];
  user: User;
  currentIndex = 0
  @Input() is_always_saved: boolean = false
  @Input() after_reservation = true

  constructor(private mapService: MapService, private userServiceFireBase: UserServiceFireBase, private userService: UserService) { }
  marginBottomValue: string = '0px'; // Valeur par défaut de margin-bottom

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenHeight = window.innerWidth;
    // console.log(screenHeight)
    if (screenHeight < 991) {
      // Calculer la valeur de margin-bottom en fonction de la hauteur de l'écran
      this.marginBottomValue = this.height; // Par exemple, vous pouvez définir une valeur spécifique ici
    } else {
      this.marginBottomValue = '0px'; // Réinitialiser la valeur de margin-bottom si la hauteur de l'écran est supérieure à 991px
    }
  }
  ngOnInit(): void {
    const screenHeight = window.innerWidth;
    // console.log(screenHeight)
    if (screenHeight < 991) {
      // Calculer la valeur de margin-bottom en fonction de la hauteur de l'écran
      this.marginBottomValue = this.height; // Par exemple, vous pouvez définir une valeur spécifique ici
    } else {
      this.marginBottomValue = '0px'; // Réinitialiser la valeur de margin-bottom si la hauteur de l'écran est supérieure à 991px
    }
    this.userService.get({joined: 1}).subscribe(users=>{
      console.log('userssss ',users)
      this.users = users
      this.user = this.userServiceFireBase.getCurrentUser()
      setTimeout(() => {
        this.map =this.mapService.initializeMap({lat:9.1021, lng:18.2812},2,'fr');
        let points: PointMap[] = []
        for (const user of this.users) {
          let p = new PointMap()
          p.lat = user.lattitude
          p.lng = user.longitude
          p.name = user.name
          if(p.lat && p.lng)
            points.push(p)
        }
        console.log('pointssss ',points)
      this.mapService.startClustering(this.map, points)
      }, 1000);
    })

    var myModal = new bootstrap.Modal(document.getElementById('addressModal'));
    console.log(myModal)
    myModal._element.addEventListener('shown.bs.modal', function (e) {
      // do something...
    });
    myModal._element.addEventListener('hidden.bs.modal', function (e) {
      // do something...
        // alert("fffff")
    });
  }
  setFirstresrvation(){
    this.is_first_reservation = false
    localStorage.setItem('first_reservation', 'true')
  }

  setIndex(i){
    this.currentIndex = i
  }


  centerOnUser(user: User){
      let p = new PointMap()
      p.lat = user.lattitude
      p.lng = user.longitude
      console.log(user)
      this.mapService.setCenter(p,this.map)
      this.mapService.setZoom(6,this.map)
      // this.mapService.addMarker(p,this.map)
  }

  centerOnContinent(point: PointMap, zoom = 2.5){
      this.mapService.setCenter(point,this.map)
      this.mapService.setZoom(zoom,this.map)
  }

  onClickOnContinent(point: PointMap,i, zoom = 2.5){
    this.centerOnContinent(point, zoom)
    this.setIndex(i)
  }

}
