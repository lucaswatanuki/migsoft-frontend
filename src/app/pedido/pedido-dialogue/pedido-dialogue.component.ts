import { CotacaoService } from './../../services/cotacao/cotacao.service';
import { Cotacao } from './../../model/cotacao.model';
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
  cotacao: Cotacao = new Cotacao();
  fornecedorList: any[] = new Array();
  cotacaoList: any[] = new Array();

  foundCotacao: boolean = false;

  nomeProduto: String;

  constructor(private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private cotacaoService: CotacaoService,
    public dialogRef: MatDialogRef<PedidoDialogueComponent>,
    private pedidoService: PedidoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.getCotacao();
    if (this.data.element) {
      this.pedido = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionar() {
    console.log(this.pedido);
    this.pedidoService.adicionarPedido(this.pedido).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  update(pedido: Pedido) {
    console.log(this.pedido);
    this.pedidoService.update(pedido).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }



  getCotacao() {
    this.cotacaoService.getListaCotacaoApproved().subscribe(
      data => {
        data.forEach(element => {
          this.cotacaoList.push(element);
        });
      }
    );
  }


}
