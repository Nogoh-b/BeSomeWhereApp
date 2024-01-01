import { Item_Drive } from './../../model/Model/Item_Drive';
import { Ads } from 'src/app/model/Model/Ads';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'


@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private httpClient: HttpClient) { }
  end_point = 'items_meats'
  get(data?: any, id?: any): Observable<Item_Drive[]>{

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
    return this.httpClient.get<Item_Drive[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  getMeals(id?: any): Observable<Item_Drive>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Item_Drive>(URL_SCHEMA ,{headers: globals.headers});
  }

  delete(id?: any): Observable<Item_Drive>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Item_Drive>(URL_SCHEMA ,{headers: globals.headers});
  }

  update(data?: any, id?: any): Observable<Item_Drive>{

    let URL_SCHEMA = globals.SERVER_FOR_API+this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Item_Drive>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }

  post(data?: any, id?: any): Observable<Item_Drive>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<Item_Drive>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
