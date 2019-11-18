import { element } from 'protractor';
import { PedidoDialogueComponent } from './../../pedido/pedido-dialogue/pedido-dialogue.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from './../../services/produto/produto.service';
import { ClienteService } from './../../services/cliente/cliente.service';
import { Venda } from './../../model/venda.model';
import { Component, OnInit, Inject } from '@angular/core';
import { VendaService } from 'src/app/services/venda/venda.service';

@Component({
  selector: 'app-venda-dialogue',
  templateUrl: './venda-dialogue.component.html',
  styleUrls: ['./venda-dialogue.component.scss']
})
export class VendaDialogueComponent implements OnInit {

  venda: Venda = new Venda();
  clienteList: any[] = new Array();

  foundProduto: boolean = false;

  nomeProduto: String;

  constructor(private clienteService: ClienteService,
    private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<VendaDialogueComponent>,
    private vendaService: VendaService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadClientes();
    if (this.data.element) {
      this.venda = this.data.element;
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionar() {
    this.findProdutoByName(this.nomeProduto);
    this.vendaService.adicionarVenda(this.venda).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  update(venda: Venda) {
    console.log(venda.id);
    this.vendaService.updateVenda(venda).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  loadClientes() {
    this.clienteService.getListaCliente().subscribe(
      data => {
        data.forEach(element => {
          this.clienteList.push(element);
        });
      }
    );
  }

  findProdutoByName(name: String) {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        data.forEach(element => {
          if (name === element['nome']) {
            this.foundProduto = true;
            this.venda.produto = element;
            return;
          } else {
            this.foundProduto = false;
          }
        });
      }
    );
  }

}
