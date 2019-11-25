import { environment } from './../../../environments/environment';
import { ReportRequest } from './../../model/reportRequest.model';
import { RelatorioVendaProduto } from './../../model/relatorioVenda.model';
import { Relatorio } from './../../model/relatorio.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private url = environment.api + 'api/relatorio/';

  constructor(private http: HttpClient) { }

  getRelatorioFinanceiro(): Observable<any> {
    return this.http.get<Relatorio>(this.url + 'financeiro');
  }

  postRelatorioVendaProduto(request: ReportRequest): Observable<any> {
    return this.http.post<RelatorioVendaProduto>(this.url + 'vendaprodutos', request);
  }

}
