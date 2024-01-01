import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import { Passenger } from 'src/app/model/Model/Passenger';
import { Item_Drive } from 'src/app/model/Model/Item_Drive';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }
  end_point = 'reservation'

  get(data?: any, id?: any): Observable<Item_Drive[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id+'/item' : URL_SCHEMA;

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
    return this.httpClient.get<Item_Drive[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }
}
