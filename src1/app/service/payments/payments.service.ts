import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import { Payment } from 'src/app/model/Model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<Payment[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'payments';
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

    console.log('requête---- : '+ URL_SCHEMA,' ', data );
    return this.httpClient.get<Payment[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<Payment>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'payments';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Payment>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  update(data?: any, id?: any): Observable<Payment>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'payments';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Payment>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
