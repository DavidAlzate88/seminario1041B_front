import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportista } from '../interface/transportista'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private apiUrl = 'http://ec2-44-223-34-117.compute-1.amazonaws.com:8080'; // base URL

  constructor(private http: HttpClient) {}

  /*consultarTransportistas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/transportistas`); // Ajustar al endpoint real
  }*/
  consultarTransportistas(): Observable<Transportista[]> {
    return this.http.get<Transportista[]>(`${this.apiUrl}/transportista/consultar`);
  }

  buscarPorEstado(estado: string): Observable<Transportista[]> {
    const params = new HttpParams().set('estado', estado);
    return this.http.get<Transportista[]>(`${this.apiUrl}/transportista/estado?`, { params });
  }

  buscarPorRazonSocial(razonSocial: string): Observable<Transportista[]> {
    const params = new HttpParams().set('razonSocial', razonSocial);
    console.log(`${this.apiUrl}/transportista/razonsocial`, { params });
    console.log(params);
    return this.http.get<Transportista[]>(`${this.apiUrl}/transportista/razonsocial?`, { params });
  }

  crearTransportista(transportista: Transportista): Observable<Transportista> {
    return this.http.post<Transportista>(
      `${this.apiUrl}/transportista/registrar`,
      transportista
    );
  }

  eliminarTransportista(id: number): Observable<string> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<string>(`${this.apiUrl}/transportista/eliminar`, {
      params,
      responseType: 'text' as unknown as 'json' // 🔥 truco seguro
    });
  }
  actualizarTransportista(transportista: Transportista): Observable<Transportista> {
    return this.http.put<Transportista>(
      `${this.apiUrl}/transportista/modificar/${transportista.documento}`,
      transportista
    );
  }
}
