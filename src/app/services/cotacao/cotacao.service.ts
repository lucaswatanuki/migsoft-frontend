import { environment } from './../../../environments/environment';
import { Cotacao } from './../../model/cotacao.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {

  private url = environment.api + 'api/cotacao/';

  constructor(private http: HttpClient) { }

  getCotacao(): Observable<any> {
    return this.http.get<Cotacao[]>(this.url + 'all');
  }

  getApproved(): Observable<any> {
    return this.http.get<Cotacao[]>(this.url + 'all/approved');
  }

  save(cotacao: Cotacao): Observable<any> {
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
