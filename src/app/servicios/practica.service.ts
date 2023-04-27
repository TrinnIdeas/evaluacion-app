import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PracticaService {


  private apiUrl = 'http://practicaapi.trinn.com.mx/form'; // cambiar por la url de tu backend

  constructor(private http: HttpClient) { }

  enviarFormulario(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
