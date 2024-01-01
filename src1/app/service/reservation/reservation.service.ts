import { Reservation } from './../../model/Model/Reservation';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import {Point}from '../../model/Model/Point'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  end_point = 'reservation'
  get(data?: any, id?: any): Observable<Reservation[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
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
        if(value != null) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA, ' ', params, ' ', data);
    return this.httpClient.get<Reservation[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  delete(id?: any): Observable<Reservation>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Reservation>(URL_SCHEMA ,{headers: globals.headers});
  }
  getReservation(id?: any): Observable<Reservation>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Reservation>(URL_SCHEMA ,{headers: globals.headers});
  }


  post(data?: any, id?: any): Observable<Reservation>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<Reservation>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }

  deleteReservation(id?: any): Observable<Reservation>{

    let URL_SCHEMA = globals.SERVER_FOR_API+ this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Reservation>(URL_SCHEMA ,{headers: globals.headers});
  }
  update(data?: any, id?: any): Observable<Reservation>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de put : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Reservation>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});
  }
}
