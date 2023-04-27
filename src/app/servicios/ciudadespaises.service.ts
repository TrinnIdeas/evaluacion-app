import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CiudadesPaisesService {
  private readonly baseUrl = 'http://practicaapi.trinn.com.mx/ciudadpais';

  constructor(private readonly http: HttpClient) { }

  buscarCiudades(busqueda: string): Observable<any> {
    const url = `${this.baseUrl}/${busqueda}`;
    return this.http.get<any>(url);
  }

  buscarCiudadesArray(busqueda: string): Observable<any> {
    const url = `${this.baseUrl}/array/${busqueda}`;
    return this.http.get<any>(url);
  }

  
}
