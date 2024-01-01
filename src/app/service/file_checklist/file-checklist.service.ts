import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../../global'
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';

@Injectable({
  providedIn: 'root'
})
export class FileChecklistService {

  constructor(private httpClient: HttpClient) { }
  get(data?: any, id?: any): Observable<File_Checklist[]>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'file';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let  params = new HttpParams();
    const headers1 = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    // URL_SCHEMA += "?"
    if(data){
      Object.entries((data)).forEach(([key, value]) => {
        if(value != undefined) {
          // URL_SCHEMA += "&" + key.toString() +'='+value.toString()
          params = params.append(key.toString(), value.toString());
        }
      });
    }

    console.log('requête : '+ URL_SCHEMA,' ', data );
    return this.httpClient.get<File_Checklist[]>(URL_SCHEMA , {headers: globals.headers, params});
  }
  getFile(id?: any): Observable<File_Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'file';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.get<File_Checklist>(URL_SCHEMA ,{headers: globals.headers});
  }
  deleteFile(id?: any): Observable<File_Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'file';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('requête : '+ URL_SCHEMA, );
    return this.httpClient.delete<File_Checklist>(URL_SCHEMA ,{headers: globals.headers});
  }
  post(data?: any, id?: any): Observable<File_Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'file';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+' ',JSON.stringify(data) );
    return  this.httpClient.post<File_Checklist>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
  update(data?: any, id?: any): Observable<File_Checklist>{

    let URL_SCHEMA = globals.SERVER_FOR_API+'file';
    URL_SCHEMA = id ? URL_SCHEMA + '/'+id : URL_SCHEMA;

    const headers = {
      'Content-Type': 'application/json'
    };

    console.log('requetes de post : '+ URL_SCHEMA+' ',JSON.stringify(data) );
    return  this.httpClient.put<File_Checklist>(URL_SCHEMA, JSON.stringify(data), { headers: globals.headers});

  }
}
