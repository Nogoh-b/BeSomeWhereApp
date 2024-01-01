import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }
  getCountry(data?: any, id?: any): Observable<any[]>{
    return this.httpClient.get<any>('./assets/data/countries.json');
  }
  getCities(data?: any, id?: any): Observable<any[]>{
    return this.httpClient.get<any>('./assets/data/cities.json');
  }
}
