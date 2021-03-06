import { environment } from './../../../environments/environment';
import { Fornecedor } from './../../model/fornecedor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private url = environment.api + 'api/fornecedor/';

  constructor(private http: HttpClient) { }

  getFornecedores(): Observable<any> {
    return this.http.get<Fornecedor[]>(this.url + 'all');
  }

  getFornecedoresAtivos(): Observable<any> {
    return this.http.get<Fornecedor[]>(this.url + 'all/active');
  }

  save(fornecedor: Fornecedor): Observable<any> {
    return this.http.post<any>(this.url, fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<any> {
    return this.http.put<Fornecedor>(this.url + fornecedor.id, fornecedor);
  }

  delete(fornecedor: Fornecedor) {
    return this.http.delete<Fornecedor>(this.url + fornecedor.id);
  }

}
