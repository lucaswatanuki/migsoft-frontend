import { Observable } from 'rxjs';
import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  produtos: Produto = new Produto();
  errorMsg: String;
  displayedColumns: string[] = ['id', 'nome', 'preco', 'action'];
  dataSource = new MatTableDataSource;
  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  adicionar() {
    this.produtoService.adicionarProduto(this.produto).subscribe(
      data => {
        this.getProdutos();
      }
    );
  }

  deletar(produto: Produto) {
    this.produtoService.delete(produto).subscribe(
        data => {
          this.getProdutos();
        }
    );
  }


  public listarProdutos(): void {
    this.produtoService.getListaProdutos().subscribe(
      produto => {
        this.listaProdutos = produto;
        this.dataSource = new MatTableDataSource<Produto>(this.listaProdutos);
      });
  }

  public getProdutos(): void {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        this.produtos = data;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
