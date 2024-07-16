import { UserServiceFireBase } from './../../service/core/user.service';
import { PointMap } from './../../model/map/point';
import { User } from './../../model/Model/Utilisateur';
import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MapService } from 'src/app/service/map/map.service';
import { MapboxService } from 'src/app/service/mapbox.service';
import { LngLatLike } from 'mapbox-gl';
declare let bootstrap: any;

@Component({
  selector: 'app-first-reservation-div',
  templateUrl: './first-reservation-div.component.html',
  styleUrls: ['./first-reservation-div.component.css']
})
export class FirstReservationDivComponent implements OnInit {
  is_first_reservation = true
  map: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  selectedTab: string = 'creditCard'; // Onglet par défaut
  @Input() height = '80%'
  users: User[];
  usersByCountry: { [key: string]: User[] } = {};

  user: User;
  currentIndex = 0
  indexCountry = 0
  @Input() is_always_saved: boolean = false
  @Input() after_reservation = true
  circleData ;
    circlePaint ;
  constructor(private mapboxService: MapboxService,private mapService: MapService, private userServiceFireBase: UserServiceFireBase, private userService: UserService) { }
  marginBottomValue: string = '0px'; // Valeur par défaut de margin-bottom
  center: LngLatLike = [2.3522, 48.8566];
  zoom = 10;
  marker: LngLatLike;
  markerPosition: LngLatLike = [2.3522, 48.8566];

  onMapMove() {
    const map = (document.getElementById('map') as any).getMap();
    this.markerPosition = map.getCenter();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenHeight = window.innerWidth;
    // console.log(screenHeight)
    if (screenHeight < 991) {
      // Calculer la valeur de margin-bottom en fonction de la hauteur de l'écran
      this.marginBottomValue = this.height; // Par exemple, vous pouvez définir une valeur spécifique ici
    } else {
      this.marginBottomValue = '0px'; // Réinitialiser la valeur de margin-bottom si la hauteur de l'écran est sup��rieure à 991px
    }
  }
  ngOnInit(): void {
    // return
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
      this.usersByCountry = this.groupUsersByCountry(users);

      this.user = this.userServiceFireBase.getCurrentUser()
      setTimeout(() => {
        // this.map =this.mapService.initializeMap({lat:9.1021, lng:18.2812},2,'fr');
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
      // this.mapService.startClustering(this.map, points)
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
 /* setFirstresrvation(){
    this.is_first_reservation = false
    localStorage.setItem('first_reservation', 'true')
  }*/

  setIndex(i){
    this.currentIndex = i
  }


  /*centerOnUser(user: User){
      let p = new PointMap()
      p.lat = user.lattitude
      p.lng = user.longitude
      console.log(user)
      this.mapService.setCenter(p,this.map)
      this.mapService.setZoom(6,this.map)
      // this.mapService.addMarker(p,this.map)
  }*/

  centerOnContinent(point: PointMap, zoom = 2.5){
      this.mapService.setCenter(point,this.map)
      this.mapService.setZoom(zoom,this.map)
  }

  /*onClickOnContinent(point: PointMap,i, zoom = 2.5){
    this.centerOnContinent(point, zoom)
    this.setIndex(i)
  }*/



  ngAfterViewInit() {
    // this.mapboxService.initializeMap(this.mapElement.nativeElement, [2.3522, 48.8566], 2); // Coordonnées de Paris
    this.circleData = this.mapboxService.getCircleData(this.center);
    this.circlePaint = this.mapboxService.getCirclePaint();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onClickOnContinent(coordinates: { lat: number, lng: number }, index: number, zoom = 2.0) {
    this.currentIndex = index;
    // this.mapboxService.centerOnCoordinates([coordinates.lng, coordinates.lat], zoom);
    // this.mapboxService.addMarker([coordinates.lng, coordinates.lat], `Continent Marker ${index}`);
    this.marker = [coordinates.lng, coordinates.lat]
    this.center = [coordinates.lng, coordinates.lat]
    this.markerPosition = [coordinates.lng, coordinates.lat]
  }

  centerOnUser(user: any) {
    // this.mapboxService.centerOnCoordinates([user.longitude, user.lattitude], 10);
    // this.mapboxService.addMarker([user.longitude, user.lattitude], `User: ${user.name}`);

    // this.mapboxService.clearMarkers(); // Clear previous markers
    // this.mapboxService.centerOnCoordinates([user.longitude, user.lattitude], 10);
    // this.mapboxService.addMarker([user.longitude, user.lattitude], `User: ${user.name}`);
    this.marker = [user.longitude, user.lattitude]
    this.center = [user.longitude, user.lattitude]
    this.markerPosition = [user.longitude, user.lattitude]
  }

  groupUsersByCountry(users: any[]): { [key: string]: any[] } {
    return users.reduce((result, user) => {
      const country = user.country;
      if (!result[country]) {
        result[country] = [];
      }
      result[country].push(user);
      return result;
    }, {});
  }

  setFirstresrvation() {
    this.is_first_reservation = false;
  }
  getMarkerData(): any {
    this.circleData = this.mapboxService.getCircleData(this.center);
    this.circlePaint = this.mapboxService.getCirclePaint();
    return {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': this.center
        },
        'properties': {}
      }]
    };
  }
  getCountryKeys(): string[] {
    return Object.keys(this.usersByCountry);
  }
}
