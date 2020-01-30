import { environment } from './../../../environments/environment';
import { Cliente } from './../../model/cliente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = environment.api + 'api/cliente/';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get<Cliente[]>(this.url + 'all');
  }

  save(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.url, cliente);
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(this.url + cliente.id, cliente);
  }

  delete(cliente: Cliente){
    return this.http.delete<Cliente>(this.url + cliente.id);
  }
}
