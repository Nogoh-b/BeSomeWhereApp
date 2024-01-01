import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import { Item_Checklist_Categorie } from 'src/app/model/Model/Item_Checklist_Categorie';
@Injectable({
  providedIn: 'root'
})
export class ItemChecklistCategoryService {

  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<Item_Checklist_Categorie[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_checklist_category';
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
    return this.httpClient.get<Item_Checklist_Categorie[]>(URL_SCHEMA ,{headers: globals.headers,params});
  }

  post(data?: any, id?: any): Observable<Item_Checklist_Categorie>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_checklist_category';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.post<Item_Checklist_Categorie>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  delete(id?: any): Observable<Item_Checklist_Categorie>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_checklist_category';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<Item_Checklist_Categorie>(URL_SCHEMA ,{headers: globals.headers});
  }
  update(data?: any, id?: any): Observable<Item_Checklist_Categorie>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'item_checklist_category';
    URL_SCHEMA = id ? URL_SCHEMA+'/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+globals.AUTORIZATION );
    return  this.httpClient.put<Item_Checklist_Categorie>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
