import { ArticleCategory } from './../../model/Model/Article_Categorie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  end_point = 'categories'
  get(data?: any, id?: any): Observable<ArticleCategory[]>{
    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
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
    return this.httpClient.get<ArticleCategory[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  getArticleCategory(id?: any): Observable<ArticleCategory>{

    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<ArticleCategory>(URL_SCHEMA ,{headers: globals.headers});
  }

  delete(id?: any): Observable<ArticleCategory>{

    let URL_SCHEMA = globals.BLOG_ADR + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<ArticleCategory>(URL_SCHEMA ,{headers: globals.headers});
  }

  update(data?: any, id?: any): Observable<ArticleCategory>{

    let URL_SCHEMA = globals.BLOG_ADR + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<ArticleCategory>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }

  post(data?: any, id?: any): Observable<ArticleCategory>{

    let URL_SCHEMA = globals.BLOG_ADR   + this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<ArticleCategory>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
