import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import { Contact } from 'src/app/model/Model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
  end_point = 'contact'
  get(data?: any, id?: any): Observable<Contact[]>{

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
        if(value) {
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Contact[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  getContact(id?: any): Observable<Contact>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Contact>(URL_SCHEMA ,{headers: globals.headers});
  }

  delete(id?: any): Observable<Contact>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Contact>(URL_SCHEMA ,{headers: globals.headers});
  }

  update(data?: any, id?: any): Observable<Contact>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Contact>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }

  post(data?: any, id?: any): Observable<Contact>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<Contact>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
