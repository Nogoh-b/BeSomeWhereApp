import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import { Item_Proposed } from 'src/app/model/Model/Item_Proposed';

@Injectable({
  providedIn: 'root'
})
export class ItemProposedService {
  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<Item_Proposed[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_proposed';
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
    return this.httpClient.get<Item_Proposed[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<Item_Proposed>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_proposed';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Item_Proposed>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  delete(id?: any): Observable<Item_Proposed>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_proposed';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Item_Proposed>(URL_SCHEMA ,{headers: globals.headers});
  }
  update(data?: any, id?: any): Observable<Item_Proposed>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_proposed';
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Item_Proposed>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
