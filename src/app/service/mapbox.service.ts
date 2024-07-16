import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private accessToken = 'pk.eyJ1Ijoibmlsb2JvYnkiLCJhIjoiY2t0bTY4ZWFzMG5pMDJubWp1dTQzaGo5NyJ9.AMsPtdLuutboBJivusJ9yA';
  private baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  private baseUrlDirections = 'https://api.mapbox.com/directions-matrix/v1/mapbox/walking';
  map: mapboxgl.Map;

  markers: mapboxgl.Marker[] = [];


  initializeMap(container: string, center: [number, number], zoom: number) {
    this.map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }
  centerOnCoordinatesWithMarker(lngLat: [number, number], popupText: string, zoom: number = 10) {
    this.map.flyTo({ center: lngLat, zoom });
    this.addMarker(lngLat, popupText);
  }
  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = this.accessToken;
  }
 
  searchAddress(query: string, country: string = 'TN'): Observable<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(query)}.json?access_token=${this.accessToken}&language=fr`;
    // const url = `${this.baseUrl}/${encodeURIComponent(query)}.json?access_token=${this.accessToken}&country=${country}&language=fr`;
    console.log(url)
    return this.http.get(url);
  }

  getMatrix(from: [number, number], to: [number, number][]): Observable<any> {
    const coordinates = [from, ...to].map(coord => coord.join(',')).join(';');
    const url = `${this.baseUrlDirections}/${coordinates}?access_token=${this.accessToken}&sources=0&destinations=all`;
    console.log('matrix_url ', url)
    return this.http.get(url);
  }

  center: [number, number] = [4.35121, 50.8551];
  circleRadius: number = 10;

  getCircleData(center: any): any {
    return {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [center.longitude, center.lattitude]
        }
      }]
    };
  }

  getCirclePaint(): any {
    return {
      'circle-radius': this.circleRadius,
      'circle-color': '#007cbf',
      'circle-opacity': 0.5
    };
  }

  getCenter(): [number, number] {
    return this.center;
  }


  addMarker(lngLat: [number, number], popupText: string) {
    const marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push(marker);
  }

  centerOnCoordinates(lngLat: [number, number], zoom: number = 10) {
    this.map.flyTo({ center: lngLat, zoom });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

}
