import { Pedido } from './../../model/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PedidoService {

  private url = 'http://localhost:8080/api/pedido/';

  constructor(private http: HttpClient) { }

  getListaPedidos(): Observable<any> {
    return this.http.get<Pedido[]>(this.url + 'all');
  }

  adicionarPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(this.url, pedido);
  }

  update(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(this.url + pedido.id, pedido);
  }


  delete(pedido: Pedido) {
    return this.http.delete<Pedido>(this.url + pedido.id);
  }

}
