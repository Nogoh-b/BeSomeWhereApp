import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_FOR_API } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = SERVER_FOR_API// 'https://premiersurinternet.fr/seo_back/public/api'; // URL de votre API

  constructor(private http: HttpClient) { }
  sendMail(data: any): Observable<any> {
    // Logique pour effectuer l'inscription sur votre backend
    // alert(`${this.apiUrl}/envoyer-mail`)
    return this.http.post<any>(`${this.apiUrl}envoyer-mail`, data);
  }
}
