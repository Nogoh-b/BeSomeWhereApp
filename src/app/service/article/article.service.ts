import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams , HttpHeaders} from '@angular/common/http';
import * as globals from '../../../global'
import {Point}from '../../model/Model/Point'
import { Article } from 'src/app/model/Model/Article';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private httpClient: HttpClient) { }

  end_point = 'posts'
  embed = '&_embed'
  get(data?: any, id?: any): Observable<Article[]>{
    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers2 = new Headers();
    headers2.append('Content-Type', 'application/json');
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer bm9nb2g6TGlvbmVsYnJpY2UxMjMh'
    });

  const requestOptions = { headers: headers,params };
    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Article[]>(URL_SCHEMA + this.embed ,{headers: globals.headers,params});
    return this.httpClient.get<Article[]>(URL_SCHEMA + this.embed ,requestOptions).pipe(catchError(this.handleError));
    // return this.httpClient.get<Article[]>(URL_SCHEMA + this.embed ,{headers: globals.headers,params});
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
}
  getArticle(id?: any): Observable<Article>{

    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<Article>(URL_SCHEMA + this.embed ,{headers: globals.headers});
  }

  delete(id?: any): Observable<Article>{

    let URL_SCHEMA = globals.BLOG_ADR + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Article>(URL_SCHEMA + this.embed ,{headers: globals.headers});
  }

  update(data?: any, id?: any): Observable<Article>{

    let URL_SCHEMA = globals.BLOG_ADR + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Article>(URL_SCHEMA + this.embed, JSON.stringify(data), { headers: globals.headers});

  }

  post(data?: any, id?: any): Observable<Article>{

    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<Article>(URL_SCHEMA + this.embed, JSON.stringify(data), { headers: globals.headers});

  }
}
