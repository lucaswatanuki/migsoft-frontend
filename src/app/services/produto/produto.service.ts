import { Produto } from '../../model/produto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = 'https://migsoftbd.herokuapp.com/api/produto/';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.url, { responseType: 'text' });
  }

  getListaProdutos(): Observable<any> {
    return this.http.get<Produto[]>(this.url + 'all');
  }

  findProdutoByNome(nome: String): Observable<any> {
    return this.http.get<Produto>(this.url + nome);
  }
  adicionarProduto(produto: Produto): Observable<any> {
    return this.http.post<any>(this.url, produto);
  }

  update(produto: Produto): Observable<any> {
    return this.http.put<Produto>(this.url + produto.id, produto);
  }

  delete(produto: Produto) {
    return this.http.delete<Produto>(this.url + produto.id);
  }
}
