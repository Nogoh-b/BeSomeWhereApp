import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import {Route} from '../../model/Model/Route'

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  end_point = 'route'
  update(data?: any, id?: any): Observable<Route>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Route>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});
  }
  constructor(private httpClient: HttpClient) { }
  delete(id?: any): Observable<Route>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Route>(URL_SCHEMA ,{headers: globals.headers});
  }
  get(data?: any, id?: any): Observable<Route[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'route';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if(data ){
      Object.entries((data)).forEach(([key, value]) => {
        if(value!= null) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.httpClient.get<Route[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  getRoute(id?: any, data?: any ): Observable<Route>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'route';
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
    return this.httpClient.get<Route>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<Route>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'route';
    URL_SCHEMA += id ? '/'+id : '';

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Route>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
