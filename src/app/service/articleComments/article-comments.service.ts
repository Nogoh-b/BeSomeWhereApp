import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as globals from '../../../global'
import { ArticleComment } from 'src/app/model/Model/ArticleComment';

@Injectable({
  providedIn: 'root'
})
export class ArticleCommentCommentsService {
  constructor(private httpClient: HttpClient) { }

  end_point = 'comments'
  embed = ''
  get(data?: any, id?: any): Observable<ArticleComment[]>{
    // let URL_SCHEMA = globals.BLOG_ADR+' article_comments';
    let URL_SCHEMA = globals.BLOG_ADR+ this.end_point;
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
    return this.httpClient.get<ArticleComment[]>(URL_SCHEMA + this.embed ,{headers: globals.headers,params});
  }

  getArticleComment(id?: any): Observable<ArticleComment>{

    let URL_SCHEMA = globals.BLOG_ADR+ this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<ArticleComment>(URL_SCHEMA + this.embed ,{headers: globals.headers});
  }

  delete(id?: any): Observable<ArticleComment>{

    let URL_SCHEMA = globals.BLOG_ADR+ this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<ArticleComment>(URL_SCHEMA + this.embed ,{headers: globals.headers});
  }

  update(data?: any, id?: any): Observable<ArticleComment>{

    let URL_SCHEMA = globals.BLOG_ADR+ this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<ArticleComment>(URL_SCHEMA + this.embed, JSON.stringify(data), { headers: globals.headers});

  }

  post(data?: any, id?: any): Observable<ArticleComment>{

    let URL_SCHEMA = globals.BLOG_ADR+ this.end_point;
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA );
    return  this.httpClient.post<ArticleComment>(URL_SCHEMA + this.embed, JSON.stringify(data), { headers: globals.headers});

  }
}
