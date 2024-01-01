import { Drive_Base } from './../model/Model/Drive_Base';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../global'


@Injectable({
  providedIn: 'root'
})
export class DriveBaseService {

  constructor(private httpClient: HttpClient) { }

  get(data?: any, id?: any): Observable<Drive_Base[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'drive_base';
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
        if(value) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA,' ', data );
    return this.httpClient.get<Drive_Base[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  getDrive_Base(id?: any, data?: any): Observable<Drive_Base>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'drive_base';
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
        if(value) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA,' ', data );
    return this.httpClient.get<Drive_Base>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  delete(id?: any): Observable<Drive_Base>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'drive_base';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Drive_Base>(URL_SCHEMA ,{headers: globals.headers});
  }
  update(data?: any, id?: any): Observable<Drive_Base>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'drive_base';
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Drive_Base>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  post(data?: any, id?: any): Observable<Drive_Base>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'drive_base';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Drive_Base>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
