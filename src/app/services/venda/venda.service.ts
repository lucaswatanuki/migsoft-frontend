import { Venda } from './../../model/venda.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private url = 'http://localhost:8080/api/venda/';

  constructor(private http: HttpClient) { }

   getListaVendas(): Observable<any> {
    return this.http.get<Venda[]>(this.url + 'all');
  }


  adicionarVenda(venda: Venda): Observable<any> {
    return this.http.post<any>(this.url, venda);
  }

  update(venda: Venda): Observable<any> {
    return this.http.put<Venda>(this.url + venda.id, venda);
  }

}
