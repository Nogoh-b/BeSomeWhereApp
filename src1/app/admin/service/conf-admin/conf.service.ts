import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfServiceAdmin {

  constructor(private httpClient: HttpClient) { }
    getConf(){
      return this.httpClient.get<any>('./assets/conf/config.json')
  }
}
