import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private httpClient: HttpClient) { }
    getConf(){
      this.httpClient.get<any>('./assets/conf/config-v1.json').subscribe(res=>{
      console.log(res)
      localStorage.setItem("conf", JSON.stringify(res))
    });
  }
}
