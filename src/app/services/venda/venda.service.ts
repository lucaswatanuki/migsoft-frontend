import { environment } from './../../../environments/environment';
import { Venda } from './../../model/venda.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private url = environment.api + 'api/venda/';

  constructor(private http: HttpClient) { }

   getListaVendas(): Observable<any> {
    return this.http.get<Venda[]>(this.url + 'all');
  }

  updateVenda(venda: Venda): Observable<any> {
    return this.http.put<any>(this.url + venda.id, venda);
  }

  adicionarVenda(venda: Venda): Observable<any> {
    return this.http.post<any>(this.url, venda);
  }

  update(venda: Venda): Observable<any> {
    return this.http.put<Venda>(this.url + venda.id, venda);
  }

  cancelarVenda(venda: Venda): Observable<any> {
    return this.http.put<Venda>(this.url + 'status/' + venda.id, venda);
  }


}
