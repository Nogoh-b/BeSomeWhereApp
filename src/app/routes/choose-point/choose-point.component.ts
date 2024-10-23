import { PointService } from 'src/app/service/point/point.service';
import { ToastComponent } from './../../shared/toast/toast.component';
import { RouteService } from './../../service/route/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/Model/Point';
import * as globals from 'src/global';
import { RouteStatus } from 'src/app/model/Model/Route';
import { HomeSearch1Component } from 'src/app/components/home-search1/home-search1.component';
import { MapService } from 'src/app/service/map/map.service';
import { SharedService } from 'src/app/service/shared/shared.service';
import { MapboxService } from 'src/app/service/mapbox.service';
import * as mapboxgl from 'mapbox-gl';
const H = window['H'];

@Component({
  selector: 'app-choose-point',
  templateUrl: './choose-point.component.html',
  styleUrls: ['./choose-point.component.css']
})
export class ChoosePointComponent implements AfterViewInit {
  @ViewChild('h') h ;
  extra: any;
  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild(ToastComponent) toast_c: ToastComponent;
  @ViewChild(HomeSearch1Component) search_c: HomeSearch1Component;

  map: any;
  aroundPoints: Point[] ;
  mapObjects: any[] = [];
  selected_adr: Point ;
  selected_index: number ;


  center: [number, number] = [4.35121, 50.8551];
  circleRadius: number = 1000; // Rayon du cercle en mètres
  circleData: any;
  circlePaint: any;
  // station = {"id":3,"title":"Boutique d","description":"description du point","image":"https://www.tunisianet.com.tn/178823-large/imprimante-tout-en-un-hp-couleur-deskjet-2710-wifi.jpg","country":"Tunisie","city":"Tunis","address":"04 jbal bargou bab bhar","code":null,"longitude":10.18519,"lattitude":36.79482,"type":"0","parent":0,"created_at":"2021-10-21 00:30:19","updated_at":"2021-10-21 20:15:12"}
  station_:Point //= {"id":3,"title":"Boutique d","description":"description du point","image":"https://www.tunisianet.com.tn/178823-large/imprimante-tout-en-un-hp-couleur-deskjet-2710-wifi.jpg","country":"Tunisie","city":"Tunis","address":"04 jbal bargou bab bhar","code":null,"longitude":10.18519,"lattitude":36.79482,"type":"0","parent":new Point(),"created_at":"2021-10-21 00:30:19","updated_at":"2021-10-21 20:15:12"}
  address: Point
  loading = false;
  showContent: boolean = false;
  isLoadingMap: boolean = true;
  informationReaded: boolean = false;

  openContent() {
    this.showContent = true;
  }

  closeContent() {
    this.showContent = false;
  }
  constructor(private router: Router,
    private route: ActivatedRoute,
    private mapboxService: MapboxService,
    private mapService: MapService,
    private pointService: PointService ,
    private sharedService : SharedService,
    private routeService: RouteService) {
    // this.station_ = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.station;
    this.route.queryParams.subscribe(params => {
      this.extra = params//this.router.getCurrentNavigation().extras.state;
      // this.extra.switched = Boolean(this.extra.s)
    })
    console.log('this.extra ',typeof this.extra.s  );
  }

  ngAfterViewInit(): void {


      // Ajouter une icône personnalisée
    mapboxgl.Map.prototype.on('load', function() {
      // this.addImage('custom-marker', '/assets/img/map_point.png');
    });

    this.center = this.mapboxService.getCenter();
    this.circlePaint = this.mapboxService.getCirclePaint();

    if(!this.extra.station){
      this.aroundPoints = []
    }

    this.pointService.getPoint(this.extra.station).subscribe(result => {
      this.station_ =  result.id ? result : new Point()
      console.log(this.station_ , 'station_ ')
      // alert(JSON.stringify(this.station_))
      setTimeout(() => {
        this.search_c && this.search_c.init(this.station_)
        // this.map = this.initializeMap();
        // this.addClickEventListenerToMap(this.map)
        this.addAroundPoints()
        this.mapService.search({q: this.extra.address}).subscribe(result =>{
          console.log('init()=>choosePoint() ', result)
          if(this.mapService.transformResponse(result).items.length === 0 && this.extra.station){
          this.toast_c.open('Be Somewhere', 'Addresse non valide', 3000)
          // return
          }
          if(this.extra && this.extra.station){
            let point = new Point()
            point.address = this.extra.address
            point.lattitude = this.mapService.transformResponse(result).items[0].position.lat
            point.longitude = this.mapService.transformResponse(result).items[0].position.lng
            this.address = point
            // alert(this.extra)
            this.search_c && this.search_c.searchAroundPoints(this.address, this.station_)
          }
          else{
            this.aroundPoints = []
          }
        })
      }, 900);

    }

    )

    // setTimeout(() => {
    //   this.search_c.searchAroundPoints(this.search_c.pointA, this.search_c.pointB)
    // }, 1500);
    // this.addMarker({lng: 10.18519 , lat: 36.79482}, 'Text')
  }
  isSwitched(s){
    return s && JSON.parse(s)
  }

  points_retreived(points: Point[]){
    if(points.length === 0){
      this.toast_c.open('Aucun point aux alentours de votre adresse !')
    }
    this.aroundPoints = points
    console.log(' choosepoint() => Point  ', points);
    // this.map.center = this.h.switched ? this.h.pointB.longitude+','+this.h.pointB.lattitude : this.h.pointA.longitude+','+this.h.pointA.lattitude
    const centerPoint = /*this.h.switched ? this.h.pointB : */this.aroundPoints.length > 0 ? this.aroundPoints[0] : this.address
    this.setCenter(centerPoint)
    // console.log(this.map.i.center, ' tttttt ', centerPoint);
    // this.addMarker({lat : centerPoint.lattitude, lng: centerPoint.longitude}, centerPoint.address + ', '+centerPoint.city+ ', '+centerPoint.country)

    // this.addCircleToMap(this.map,centerPoint);
    this.circleData = this.mapboxService.getCircleData(centerPoint);
    this.circlePaint = this.mapboxService.getCirclePaint();
    // this.aroundPoints.forEach(point => {
    //   // this.addMarker({lat : point.lattitude, lng: point.longitude}, point.address + ', '+point.city+ ', '+point.country)
    // });
    this.addAroundPoints()
    // alert(this.h.date_.value)
  }

  onSearch(adr, d){
    this.selected_index = -1
    this.selected_adr = null
    this.aroundPoints = null
    if(!this.address){
      this.address = new Point()
    }
    this.sharedService.scroll(d,-100)

    this.address.address = adr
  }
  setPoint(i, d){
    console.log(this.selected_index);
    // this.openContent()
    this.markOrUnMark(i)
    setTimeout(() => {
      this.sharedService.scroll(d,-100)
    }, 150);
  }

  initializeMap() {
    const platform = new H.service.Platform({
      apiKey: 'EUG3oA3f96-F-8tdkrL7M8Nuvb69UHY_Ww35-dvPcMY',
      useCIT: true,
      useHTTPS: true
    });

    var defaultLayers = platform.createDefaultLayers({lg: 'fr'});
    //Step 2: initialize a map
    var map = new H.Map(document.getElementById('map'),
      defaultLayers.vector.normal.map,{
      center: {lng: 10.18519 , lat: 36.79482},
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


    return map;
  }

  convertSeconds(seconds: number): string {
    return globals.convertSeconds(seconds)
  }

  addMarker(coord, adr){

    // this.circleData = this.mapboxService.getCircleData();
    // this.circlePaint = this.mapboxService.getCirclePaint();
    return
    //Create the svg mark-up
    var svgMarkup = '<svg width="5em" height="5em" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">' +
    '<g>'+
    '        <path fill="none" d="M0 0h24v24H0z"/>'+
    '        <path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>'+
    '    </g>'+
    '</svg>';
    var icon = new H.map.DomIcon(globals.divMap);

    var myIcon = new H.map.Icon(svgMarkup, {
      anchor: {x: 0, y: 0}
    }),
    marker = new H.map.Marker(coord,  {
      icon: myIcon
    });
    var standardMarker = new H.map.Marker(new H.geo.Point( coord.lat, coord.lng ));
    // add custom data to the marker
    marker.setData("index" + 1);

    // set draggable attribute on the marker so it can recieve drag events
    marker.draggable = true;
    // this.map.addObject(marker);
    const obj = this.map.addObject(standardMarker);
    this.mapObjects.push(obj)
  }
  removeMarker(objs: any[]){
    this.map.removeObjects(objs);
    while (objs.length > 0) {
      objs.pop()
    }

  }

  setCenter(point: Point){
    this.center = [point.longitude, point.lattitude];

    // this.map.setCenter({lat: point.lattitude, lng: point.longitude});
  }
  getMarkerData(): any {
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
  addClickEventListenerToMap(map) {
    // add 'tap' listener
    let t = this
    this.isLoadingMap = true;
    map.addEventListener('tap', function (evt) {
      var coords =  map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      console.log(coords)
    }, false);
    map.addEventListener('mapviewchangeend', function () {
      console.log('La carte a fini de charger');
    }, false);
  }

  addCircleToMap(map, point: Point){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat:point.lattitude, lng:point.longitude},
      // The radius of the circle in meters
      3000,
      {
        style: {
          strokeColor: 'rgba(55, 85, 170, 0.2)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 128, 0, 0.2)'  // Color of the circle
        }
      }
    ));
  }

  addAroundPoints(){
    // Step 4: create custom logging facilities
    var logContainer = document.createElement('div');
    var elt = document.getElementsByClassName('H_imprint')

    // alert(elt[0])
    // logContainer.className ='arround';
    // logContainer.innerHTML = globals.divMap;
    // logContainer.prepend('qsdsqdsqdsqds')
    // elt[0].innerHTML =globals.divMap;
    // this.map.getElement().appendChild(logContainer);
    // document.appendChild(logContainer);
  }

  markOrUnMark(index){
    console.log(this.aroundPoints[index], ' ', this.h.date)

    // this.removeMarker(this.mapObjects)
    // return
    var logContainer = document.createElement('div');
    var divParent = document.getElementsByClassName('H_imprint')
    this.selected_adr = this.aroundPoints[index]
    this.selected_index = index
    this.addMarker({lat : this.selected_adr.lattitude, lng: this.selected_adr.longitude}, this.selected_adr.address + ', '+this.selected_adr.city+ ', '+this.selected_adr.country)
    this.setCenter(this.selected_adr )

    /*let loisirs = this.selected_adr.arround

    let data = '';
    if(loisirs){
      loisirs.forEach(point => {
        let list = globals.listString ;
        list  = list.replace('{$text}', point.title)
        data += list
      });
      //let divContent = globals.divMap.replace('{$data}',data)
      let divContent = globals.divMap.replace('{$data}',this.selected_adr.description)
      divContent  = divContent.replace('{$name}', this.selected_adr.address)
      // let data = globals.divMap ;

      // alert(elt[0])
      logContainer.className ='arround';
      logContainer.innerHTML = globals.divMap;
      divParent[0].innerHTML =divContent;
    }*/
  }


  getRoute(switched){

    if(!this.informationReaded){
      // this.toast_c.open(vous devez)
      return
    }

    // Convertir la date en string à un objet Date
    const dateString: string = this.h.date; // ex: "2024-11-05" (format YYYY-MM-DD)
    const inputDate: Date = new Date(dateString);

    // Définir les bornes de l'intervalle
    const startDate: Date = new Date('2024-11-01'); // 01-11-2024
    const endDate: Date = new Date('2024-11-11'); // 11-11-2024

    // Vérifier si la date est dans l'intervalle
    if (inputDate >= startDate && inputDate <= endDate) {
      console.log('La date est dans l\'intervalle.');
      this.toast_c.open('BeSomeWhere','routeInteruption',30000)
      return
    } else {
      console.log('La date n\'est pas dans l\'intervalle.');
    }


    console.log('station/gare ', this.h.station)
    console.log('adresse ', this.selected_adr)
    let pointA : Point = this.h.switched ? this.h.station : this.selected_adr
    // let pointB : Point = this.h.pointB
    let pointB : Point = !this.h.switched ? this.h.station : this.selected_adr

    console.log('PointA ', pointA.address)
    console.log('PointB ', pointB.address)
    // console.log({starting_date : this.h.date, point_a : pointA.id, point_b : pointB.id })

    // alert(switched)
    this.loading = true
    // this.toast_c.open('Be SomeWhere','Aucun traje n&apos;a été trouvé ! vous pouvez modifier vos informations pour trouver le trajet adéquat',2000)
    // return
    // this.routeService.get({starting_date : this.h.date, point_a : pointA.id, point_b : pointB.id , status : RouteStatus.Available.toString(), to_station : switched   }).subscribe(result =>{
    const queryParams = {starting_date : this.h.date, point_a : this.h.station.id , point_b : this.selected_adr.id , status : RouteStatus.Available.toString(), to_station : !switched ? 1 : 0}
    this.routeService.get(queryParams).subscribe(result =>{
        setTimeout(() => {
        this.loading = false
        const desc = result.length >0  ? '' : 'NoSharedTaxi'
        // const desc = result.length >0  ? 'Le trajet à été touvé' : 'NoSharedTaxi'
        if(result.length === 0)
          this.toast_c.open('BeSomeWhere',desc,30000)
        if(result.length > 0){
          this.router.navigate(['trajets/creation/2'], {queryParams} )
        }
      }, 1000);
      console.log(result);
    })
  }

}
