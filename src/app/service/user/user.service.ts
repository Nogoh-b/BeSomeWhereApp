import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import {User} from '../../model/Model/Utilisateur'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<User[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'user';
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
        if(value != undefined) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.httpClient.get<User[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  getUser(id?: any, data?: any ): Observable<User>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'user';
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

    console.log('requête : '+ URL_SCHEMA,' ', params );
    return this.httpClient.get<User>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<User>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'user';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post222222 : '+ URL_SCHEMA );
    return  this.httpClient.post<User>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  update(data?: any, id?: any): Observable<User>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'user/'+id;
    // URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<User>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
