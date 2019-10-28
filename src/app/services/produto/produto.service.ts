import { Produto } from '../../model/produto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private userUrl = 'http://localhost:8080/api/produto';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getListaProdutos(): Observable<any> {
    return this.http.get<Produto[]>(this.userUrl + '/all');
  }

  adicionarProduto(produto: Produto): Observable<any> {
    return this.http.post<any>(this.userUrl, produto);
  }

  update(produto: Produto): Observable<any> {
    return this.http.put<Produto>(this.userUrl, produto);
  }

  delete(produto: Produto){
    return this.http.delete<Produto>(this.userUrl + "/" + produto.id);
  }
}
