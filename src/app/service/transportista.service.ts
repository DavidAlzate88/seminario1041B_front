import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportista } from '../interface/transportista';
import {environment} from '../../environments/environment'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private readonly apiUrl = `${environment.apiUrlTransportista}/transportista`; // base URL

  constructor(private readonly http: HttpClient) {}

  consultarTransportistas(): Observable<Transportista[]> {
    return this.http.get<Transportista[]>(`${this.apiUrl}/consultar`);
  }

  buscarPorEstado(estado: string): Observable<Transportista[]> {
    const params = new HttpParams().set('estado', estado);
    return this.http.get<Transportista[]>(`${this.apiUrl}/estado?`, { params });
  }

  buscarPorRazonSocial(razonSocial: string): Observable<Transportista[]> {
    const params = new HttpParams().set('razonSocial', razonSocial);
    console.log(`${this.apiUrl}/transportista/razonsocial`, { params });
    console.log(params);
    return this.http.get<Transportista[]>(`${this.apiUrl}/razonsocial?`, { params });
  }

  crearTransportista(transportista: Transportista): Observable<Transportista> {
    return this.http.post<Transportista>(
      `${this.apiUrl}/registrar`,
      transportista
    );
  }

  eliminarTransportista(id: number): Observable<string> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<string>(`${this.apiUrl}/eliminar`, {
      params,
      responseType: 'text' as unknown as 'json'
    });
  }

  actualizarTransportista(transportista: Transportista): Observable<Transportista> {
    return this.http.put<Transportista>(
      `${this.apiUrl}/modificar/${transportista.documento}`,
      transportista
    );
  }
}
