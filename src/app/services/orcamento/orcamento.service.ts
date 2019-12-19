import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Orcamento } from '../../model/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private url = environment.api + 'api/orcamento/';
  constructor(private http: HttpClient) { }

  getListaOrcamentos(): Observable<any> {
    return this.http.get<Orcamento[]>(this.url + 'all');
  }

  updateOrcamentos(orcamento: Orcamento): Observable<any> {
    return this.http.put<any>(this.url + orcamento.id, orcamento);
  }

  adicionarOrcamentos(orcamento: Orcamento): Observable<any> {
    return this.http.post<any>(this.url, orcamento);
  }

  delete(orcamento: Orcamento): Observable<any> {
    return this.http.delete<Orcamento>(this.url + orcamento.id);
  }

}
