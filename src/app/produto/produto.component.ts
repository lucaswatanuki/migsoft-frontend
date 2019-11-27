import { ToastrService } from 'ngx-toastr';
import { Produto } from './../model/produto.model';
import { DialogueComponent } from './dialogue/dialogue.component';
import { ProdutoService } from '../services/produto/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  produtos: MatTableDataSource<any>;
  errorMsg: String;
  displayedColumns: string[] = ['id', 'nome', 'preco', 'qtdEstoque', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private produtoService: ProdutoService, public dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit() {
    this.getProdutos();
  }

  applyFilter(value: string) {
    this.produtos.filter = value.trim().toLowerCase();
  }

  deletar(produto: Produto) {
    this.produtoService.delete(produto).subscribe(
      data => {
        this.toast.success('Produto excluído');
        this.getProdutos();
      },
      error => {
        this.toast.error('Produto vinculado a cotação/venda', 'Erro');
      }
    );
  }


  update(produto: Produto) {
    this.produtoService.update(produto).subscribe(
      data => this.produto = data
    );
  }

  public getProdutos(): void {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        this.produtos = new MatTableDataSource(data);
        this.produtos.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '250px',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getProdutos();
      }
    );
  }
}
