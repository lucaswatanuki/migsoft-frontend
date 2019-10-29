import { Produto } from './../model/produto.model';
import { element } from 'protractor';
import { DialogueComponent } from './dialogue/dialogue.component';
import { Observable } from 'rxjs';
import { ProdutoService } from '../services/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  produtos: MatTableDataSource<any>;
  errorMsg: String;
  displayedColumns: string[] = ['id', 'nome', 'preco', 'action'];


  constructor(private produtoService: ProdutoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProdutos();
  }


  applyFilter(value: string) {
    this.produtos.filter = value.trim().toLowerCase();
  }

  deletar(produto: Produto) {
    this.produtoService.delete(produto).subscribe(
      data => {
        this.getProdutos();
      }
    );
  }

  update(produto: Produto){
    this.produtoService.update(produto).subscribe(
      data => this.produto = data
    );
  }

  public getProdutos(): void {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        this.produtos = new MatTableDataSource(data);
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
