import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import {Point}from '../../model/Model/Point'

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}
@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient) { }
  end_point = 'point'

  delete(id?: any): Observable<Point>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Point>(URL_SCHEMA ,{headers: globals.headers});
  }

  get(data?: any, id?: any): Observable<Point[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'point';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if(data){
      Object.entries((data)).forEach(([key, value]) => {
        console.log(data)
          params = params.append(key.toString(), value.toString());
      });
    }

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Point[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  getPoint(id?: any, data ?:any): Observable<Point>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'point';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if(data){
      Object.entries((data)).forEach(([key, value]) => {
          params = params.append(key.toString(), value.toString());
      });
    }

    console.log('requête : '+ URL_SCHEMA, data );
    return this.httpClient.get<Point>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<Point>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'point';
    URL_SCHEMA += id ? '/'+id : '';

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Point>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  update(data?: any, id?: any): Observable<Point>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'point';
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Point>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});
  }
}
