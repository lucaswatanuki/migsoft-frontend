import { Fornecedor } from './../../model/fornecedor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private url = 'http://localhost:8080/api/fornecedor';

  constructor(private http: HttpClient) { }

    getListaFornecedor(): Observable<any> {
    return this.http.get<Fornecedor[]>(this.url + '/all');
  }

  adicionarFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post<any>(this.url, fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<any> {
    return this.http.put<Fornecedor>(this.url, fornecedor);
  }

  delete(fornecedor: Fornecedor){
    return this.http.delete<Fornecedor>(this.url + "/" + fornecedor.id);
  }

}
