import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import {Drive}from '../../model/Model/Drive'
import { PointMap } from 'src/app/model/map/point';
import { MapboxService } from '../mapbox.service';
declare let H: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  apiKey = 'iQXmtS5NDoiQC8cT-STdItKFmcLcNQBo8oBXhsKYbxw';


  constructor(private httpClient: HttpClient, private mapboxService: MapboxService) { }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  initializeMap(center: PointMap,zoom: number,lg: string) {
    const platform = new H.service.Platform({
      apiKey: this.apiKey,
      useCIT: true,
      useHTTPS: true
    });

    const defaultLayers = platform.createDefaultLayers({lg});
    //Step 2: initialize a map
    const map = new H.Map(document.getElementById('map'),
      defaultLayers.vector.normal.map,{
      center,
      zoom,
      pixelRatio: window.devicePixelRatio || 1
    });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    return map;
  }

  /*getMatrix(data?: any): Observable<any>{

    // eslint-disable-next-line max-len
    const URL_SCHEMA = 'https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?mode=balanced;car;traffic:disabled&summaryAttributes=distance,traveltime';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    if(data){
      const destinations = data.destinations;
      params = params.append('start0', data.start0.toString());
      params = params.append('apiKey', this.apiKey);
      for (let index = 0; index < destinations.length; index++) {
          params = params.append('destination' + index, destinations[index].toString());
      }
    }
    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.httpClient.get<any>(URL_SCHEMA ,{params});
  }
*/
  addSvg(coord,  map){
    //Create the svg mark-up
    const svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="${STROKE}" >C</text></svg>';
    // var icon = new H.map.DomIcon(globals.divMap);

    const myIcon = new H.map.Icon(svgMarkup.replace('${FILL}', 'blue').replace('${STROKE}', 'red'), {
      anchor: {x: 0, y: 0}
    }),
    marker = new H.map.Marker(coord,  {
      icon: myIcon
    });
    const standardMarker = new H.map.Marker(new H.geo.Point( coord.lat, coord.lng ));
    // add custom data to the marker
    marker.setData("index" + 1);

    // set draggable attribute on the marker so it can recieve drag events
    marker.draggable = true;
    // this.map.addObject(marker);
    const obj = map.addObject(marker);
    return obj
    // this.mapObjects.push(obj)
  }

  addMarker(coord: PointMap, map){
    const marker = new H.map.Marker(coord);
    const obj = map.addObject(marker);
    // obj.addEventListener('tap', function (evt) {
    //   alert('fff')
    // }, false);
    return obj;
  }
  onMarkerClick(){
    alert('fds')
  }

  setCenter(point: PointMap,map){
    map.setCenter(point);
  }
  setZoom(zoom,map){
    map.setZoom(zoom);
  }

  //permet de centrer l'affichage
  setMapViewBounds(map,west,south,east, north){
    const bbox = new H.geo.Rect(west,south,east,north);
    map.getViewModel().setLookAtData({
      bounds: bbox
    });
  }

  setViewBoundsOnMarkers(map, objs) {
    // create map objects
    // var toronto = new H.map.Marker({lat:43.7,  lng:-79.4}),
    //     boston = new H.map.Marker({lat:42.35805, lng:-71.0636}),
    //     washington = new H.map.Marker({lat:38.8951, lng:-77.0366}),
    const group = new H.map.Group();
    // add markers to the group
    group.addObjects(objs);
    map.addObject(group);

    // get geo bounding box for the group and set it to the map
    map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
    });
  }

  //créer un Point
  setPoint(lat, lng, map){
    const point = new H.map.Circle(
      new H.geo.Point(lat,lng), //center
      75090, // Radius proportional to 2.503 million population
      {style: {fillColor: 'rgba(0, 255, 221, 0.66)'}}
    );
    map.addObject(point);
    return point

  }
  //creation container
  createContainer(objects){
    return new H.map.Group({
      objects
    });
  }

  onTapListener(){
    // container.addEventListener('tap', function (evt) {
    //   var target = evt.target;
    //   // retrieve maximum zoom level
    //   var maxZoom = target.getData().maxZoom;
    //   // get the shape's bounding box and adjust the camera position
    //   map.getViewModel().setLookAtData({
    //     zoom: maxZoom,
    //     bounds: target.getBoundingBox()
    //   });
    // });

  }

  //ajouter objet sur la map Group, Point..
  addObjectToMap(map, obj){
    map.addObject(obj);
  }

  showGeoJSONData(map) {
    // Create GeoJSON reader which will download the specified file.
    // Shape of the file was obtained by using HERE Geocoder API.
    // It is possible to customize look and feel of the objects.
    const reader = new H.data.geojson.Reader('data/berlin.json', {
      // This function is called each time parser detects a new map object
      style (mapObject) {
        // Parsed geo objects could be styled using setStyle method
        if (mapObject instanceof H.map.Polygon) {
          mapObject.setStyle({
            fillColor: 'rgba(255, 0, 0, 0.5)',
            strokeColor: 'rgba(0, 0, 255, 0.2)',
            lineWidth: 3
          });
        }
      }
    });

    // Start parsing the file
    reader.parse();

    // Add layer which shows GeoJSON data on the map
    map.addLayer(reader.getLayer());
  }


  addDomMarker(map, text, coord: PointMap ) {
    const outerElement = document.createElement('div'),
        innerElement = document.createElement('div');

    outerElement.style.userSelect = 'none';
    outerElement.style.webkitUserSelect = 'none';
    outerElement.style.cursor = 'default';

    innerElement.style.color = 'red';
    innerElement.style.backgroundColor = 'blue';
    innerElement.style.border = '2px solid black';
    innerElement.style.font = 'normal 12px arial';
    innerElement.style.lineHeight = '12px'

    innerElement.style.paddingTop = '2px';
    innerElement.style.paddingLeft = '4px';
    innerElement.style.width = 'auto';
    innerElement.style.height = 'auto';

    // add negative margin to inner element
    // to move the anchor to center of the div
    innerElement.style.marginTop = '-10px';
    innerElement.style.marginLeft = '-10px';

    outerElement.appendChild(innerElement);

    // Add text to the DOM element
    innerElement.innerHTML = text;

    function changeOpacity(evt) {
      evt.target.style.opacity = 0.6;
    };

    function changeOpacityToOne(evt) {
      evt.target.style.opacity = 1;
    };

    //create dom icon and add/remove opacity listeners
    const domIcon = new H.map.DomIcon(outerElement, {
      // the function is called every time marker enters the viewport
      onAttach(clonedElement, domIcon, domMarker) {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
      },
      // the function is called every time marker leaves the viewport
      onDetach(clonedElement, domIcon, domMarker) {
        clonedElement.removeEventListener('mouseover', changeOpacity);
        clonedElement.removeEventListener('mouseout', changeOpacityToOne);
      }
    });

    // Marker for Chicago Bears home
    const bearsMarker = new H.map.DomMarker(coord, {
      icon: domIcon
    });
    map.addObject(bearsMarker);
  }

  addCircleToMap(map, coord: PointMap, radius){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      coord,
      // The radius of the circle in meters
      radius,
      {
        style: {
          strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
        }
      }
    ));
  }

  startClustering(map, data) {
    // First we need to create an array of DataPoint objects,
    // for the ClusterProvider
    // let dataPoints = data.map(function (item) {
    //   return new H.clustering.DataPoint(item.latitude, item.longitude);
    // });
    const dataPoints = [];
    for (const point of data) {
        dataPoints.push(new H.clustering.DataPoint(point.lat, point.lng, null, point));
    }
    // Create a clustering provider with custom options for clusterizing the input
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        // Maximum radius of the neighbourhood
        eps: 32,
        // minimum weight of points required to form a cluster
        minWeight: 1
      }
    });
    const customTheme = {
      getClusterPresentation(cluster) {
        const dataPoints = [];

        // Iterate through all points which fall into the cluster and store references to them
        cluster.forEachDataPoint(dataPoints.push.bind(dataPoints));
        const svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
        '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
        'text-anchor="middle" fill="${STROKE}" >${text}</text></svg>';
        // var icon = new H.map.DomIcon(globals.divMap);

        const myIcon = new H.map.Icon(svgMarkup.replace('${text}', dataPoints.length.toString()).replace('${FILL}', 'blue').replace('${STROKE}', 'white'), {
          anchor: {x: 0, y: 0}
        });

        const randomDataPoint = dataPoints[0];
        // Get a reference to data object that DataPoint holds
        data = randomDataPoint;


      // Create a marker for the noisePoint
     const clusterMarker = new H.map.Marker(cluster.getPosition(), {
            // Use min zoom from a noise point
            // to show it correctly at certain zoom levels:
            min: cluster.getMinZoom(),
            max: cluster.getMaxZoom(),
            icon: myIcon
          });

      // Link data from the random point from the cluster to the marker,
      // to make it accessible inside onMarkerClick
      let datas = [];
      for (const d of dataPoints) {
        datas.push(d.getData());
      }
      clusterMarker.setData(datas);

      return clusterMarker;

      },
      getNoisePresentation(noisePoint) {
        const svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
        '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
        'text-anchor="middle" fill="${STROKE}" >C</text></svg>';
        // var icon = new H.map.DomIcon(globals.divMap);
        const data = noisePoint.getData();

        const myIcon = new H.map.Icon(svgMarkup.replace('${FILL}', 'blue').replace('${STROKE}', 'red'), {
          anchor: {x: 0, y: 0}
        })
        // Get a reference to data object our noise points

          const noiseMarker  = new H.map.Marker(noisePoint.getPosition(), {

            // Set min/max zoom with values from the cluster,
            // otherwise clusters will be shown at all zoom levels:
            min: noisePoint.getMinZoom(),
          });
        // Link a data from the point to the marker
        // to make it accessible inside onMarkerClick
        noiseMarker.setData(data);

        return noiseMarker;
      }
  };

  //set the custom theme
  clusteredDataProvider.setTheme(customTheme);
  clusteredDataProvider.addEventListener('tap', this.getClusturingData);
    // Create a layer tha will consume objects from our clustering provider
    const clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

    // To make objects from clustering provder visible,
    // we need to add our layer to the map
    const obj = map.addLayer(clusteringLayer);
    return clusteredDataProvider;
  }

  // Helper function for getting a random point from a cluster object
   getRandomDataPoint(cluster) {
    const dataPoints = [];

    // Iterate through all points which fall into the cluster and store references to them
    cluster.forEachDataPoint(dataPoints.push.bind(dataPoints));

    // Randomly pick an index from [0, dataPoints.length) range
    // Note how we use bitwise OR ("|") operator for that instead of Math.floor
    return dataPoints[Math.random() * dataPoints.length | 0];
  }

  createListener(obj){
    obj.addEventListener('tap', this.getClusturingData, false);
  }

  getClusturingData(evt){
    const data = evt.target.getData();
    console.log(evt.target.getData());
    return
    if(data.a && data.a.data){
      return data.a.data;
    }else{
      const d = [];
      for (const obj of data.c.a) {
        d.push(obj.data);
      }
      return d;
    }
  }

  search(data?: any): Observable<any>{

    let URL_SCHEMA = 'https://geocode.search.hereapi.com/v1/geocode';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if(data){
      params = params.append('lang', 'fr');
      params = params.append('q', data.q);
      params = params.append('in', 'countryCode:TUN');
      params = params.append('apiKey', this.apiKey);

    }

    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.mapboxService.searchAddress(data.q); //this.httpClient.get<any>(URL_SCHEMA ,{params});
  }

  getMatrix(data?: any): Observable<any>{

    let URL_SCHEMA = 'https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?mode=balanced;car;traffic:disabled&summaryAttributes=distance,traveltime';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if(data){
      const destinations = data.destinations
      params = params.append('start0', data.start0.toString());
      params = params.append('apiKey', this.apiKey);
      for (let index = 0; index < destinations.length; index++) {
          params = params.append('destination' + index, destinations[index].toString());
      }
      // Object.entries((data)).forEach(([key, value]) => {
      //   if(value) {
      //     params = params.append(key.toString(), value.toString());
      //   }
      // });
    }

    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.mapboxService.getMatrix(data.start0, data.destinations) //this.httpClient.get<any>(URL_SCHEMA ,{params});
  }

  public transformResponse(response: any): any {
    console.log('transformReponse ', response)
    return {
      items: response.features.map(feature => ({
        title: feature.text,
        id: feature.id,
        politicalView: "", // Add appropriate data if available
        resultType: feature.place_type[0], // Adjust if necessary
        houseNumberType: "MPA", // Placeholder value, adjust if necessary
        addressBlockType: "block", // Placeholder value, adjust if necessary
        localityType: "city", // Placeholder value, adjust if necessary
        administrativeAreaType: "country", // Placeholder value, adjust if necessary
        address: {
          label: feature.place_name,
          countryCode: feature.context && feature.context.find(c => c.id.startsWith('country'))?.short_code || "",
          countryName: feature.context && feature.context.find(c => c.id.startsWith('country'))?.text || "",
          stateCode: feature.context && feature.context.find(c => c.id.startsWith('region'))?.short_code || "",
          state: feature.context && feature.context.find(c => c.id.startsWith('region'))?.text || "",
          countyCode: "", // Placeholder value, adjust if necessary
          county: "", // Placeholder value, adjust if necessary
          city: feature.context && feature.context.find(c => c.id.startsWith('place'))?.text || "",
          district: feature.context && feature.context.find(c => c.id.startsWith('neighborhood'))?.text || "",
          subdistrict: "", // Placeholder value, adjust if necessary
          street: feature.properties.address || "",
          streets: [], // Placeholder value, adjust if necessary
          block: "", // Placeholder value, adjust if necessary
          subblock: "", // Placeholder value, adjust if necessary
          postalCode: feature.context && feature.context.find(c => c.id.startsWith('postcode'))?.text || "",
          houseNumber: "", // Placeholder value, adjust if necessary
          building: "", // Placeholder value, adjust if necessary
          unit: "" // Placeholder value, adjust if necessary
        },
        postalCodeDetails: [], // Placeholder value, adjust if necessary
        position: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]
        },
        access: [], // Placeholder value, adjust if necessary
        distance: 0, // Placeholder value, adjust if necessary
        mapView: {}, // Placeholder value, adjust if necessary
        categories: feature.properties.category ? [feature.properties.category] : [],
        foodTypes: [], // Placeholder value, adjust if necessary
        houseNumberFallback: true,
        estimatedPointAddress: true,
        timeZone: {}, // Placeholder value, adjust if necessary
        scoring: {}, // Placeholder value, adjust if necessary
        parsing: {}, // Placeholder value, adjust if necessary
        streetInfo: [], // Placeholder value, adjust if necessary
        countryInfo: {}, // Placeholder value, adjust if necessary
        translations: {}, // Placeholder value, adjust if necessary
        mapReferences: {}, // Placeholder value, adjust if necessary
        related: [] // Placeholder value, adjust if necessary
      }))
    };
  }
}
