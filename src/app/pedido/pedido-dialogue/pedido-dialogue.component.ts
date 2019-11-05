import { ProdutoService } from './../../services/produto/produto.service';
import { Component, OnInit, Inject } from '@angular/core';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from './../../model/pedido.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';

//import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-pedido-dialogue',
  templateUrl: './pedido-dialogue.component.html',
  styleUrls: ['./pedido-dialogue.component.scss']
})
export class PedidoDialogueComponent implements OnInit {

  pedido: Pedido = new Pedido();
  fornecedorList: any[] = new Array();

  foundProduto: boolean = false;

  nomeProduto: String;

  constructor(private fornecedorService: FornecedorService,
              private produtoService: ProdutoService,
              public dialogRef: MatDialogRef<PedidoDialogueComponent>, 
              private pedidoService: PedidoService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadFornecedores();

    if (this.data.element) {
      this.pedido = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionar() {

    this.findProdutoByName(this.nomeProduto);

    this.pedidoService.adicionarPedido(this.pedido).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  loadFornecedores() {
    this.fornecedorService.getListaFornecedor().subscribe(
      data => {
        data.forEach(element => {
          this.fornecedorList.push(element);
        });
      }
    );
  }

  findProdutoByName(name: String) {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        data.forEach(element => {
            if (name == element["nome"]) {
              this.foundProduto = true;
              this.pedido.produto = element;
              return;
            } else {
              this.foundProduto = false;
            }
        });
      }
    );
  }

}
