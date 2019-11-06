import { Cliente } from './../../model/cliente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'https://migsoftbd.herokuapp.com/api/cliente/';

  constructor(private http: HttpClient) { }

  getListaCliente(): Observable<any> {
    return this.http.get<Cliente[]>(this.url + 'all');
  }

  adicionarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.url, cliente);
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(this.url, cliente);
  }

  delete(cliente: Cliente){
    return this.http.delete<Cliente>(this.url + cliente.id);
  }
}
