import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import { Passenger } from 'src/app/model/Model/Passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private httpClient: HttpClient) { }
  end_point = 'reservation'
  get(data?: any, id?: any): Observable<Passenger[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id+'/passenger' : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();

    if(data){
      Object.entries((data)).forEach(([key, value]) => {
        if(value) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Passenger[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  getPassenger(id?: any): Observable<Passenger>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Passenger>(URL_SCHEMA ,{headers: globals.headers});
  }


  post(data?: any, id?: any): Observable<Passenger>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<Passenger>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
