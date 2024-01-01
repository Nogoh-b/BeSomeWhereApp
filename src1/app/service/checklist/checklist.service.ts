import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import { Checklist } from 'src/app/model/Model/Checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<Checklist[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'checklist';
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
    return this.httpClient.get<Checklist[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
  getCheckList(id?: any): Observable<Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'checklist';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Checklist>(URL_SCHEMA ,{headers: globals.headers});
  }

  post(data?: any, id?: any): Observable<Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'checklist';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Checklist>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  update(data?: any, id?: any): Observable<Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'checklist';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de put : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Checklist>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});
  }
  deleteChecklist(id?: any): Observable<Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'checklist';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Checklist>(URL_SCHEMA ,{headers: globals.headers});
  }
}
