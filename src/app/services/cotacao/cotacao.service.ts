import { Cotacao } from './../../model/cotacao.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {

  private url = 'http://localhost:8080/api/cotacao/';

  constructor(private http: HttpClient) { }

  getListaCotacao(): Observable<any> {
    return this.http.get<Cotacao[]>(this.url + 'all');
  }

  getListaCotacaoApproved(): Observable<any> {
    return this.http.get<Cotacao[]>(this.url + 'all/approved');
  }

  adicionarCotacao(cotacao: Cotacao): Observable<any> {
    return this.http.post<any>(this.url, cotacao);
  }

  update(cotacao: Cotacao): Observable<any> {
    return this.http.put<Cotacao>(this.url + cotacao.id, cotacao);
  }

  updateStatus(cotacao: Cotacao): Observable<any> {
    return this.http.put<Cotacao>(this.url + 'status/' + cotacao.id, cotacao);
  }

  delete(cotacao: Cotacao) {
    return this.http.delete<Cotacao>(this.url + cotacao.id);
  }
}
