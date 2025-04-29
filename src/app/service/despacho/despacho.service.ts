import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Despacho} from '../../interface/despacho';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {
  private readonly apiUrl: string = `${environment.apiUrl}/despacho_productos`;

  constructor(private readonly http: HttpClient) {}

  getDespacho(): Observable<Despacho[]> {
    return this.http.get<Despacho[]>(`${this.apiUrl}/consultar`);
  }

  createDespacho(data: Despacho): Observable<Despacho> {
    return this.http.post<Despacho>(`${this.apiUrl}/crear`, data);
  }

  updateDespacho(id: number, data: Despacho): Observable<any> {
    const url = `${this.apiUrl}/modificar/${id}`;
    return this.http.put(url, data);
  }

  deleteDespacho(id: number): Observable<any> {
    const url = `${this.apiUrl}/eliminar?id=${id}`;
    return this.http.delete(url);
  }
}
