import { Component, OnInit, Inject } from '@angular/core';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from './../../model/pedido.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';

@Component({
  selector: 'app-pedido-dialogue',
  templateUrl: './pedido-dialogue.component.html',
  styleUrls: ['./pedido-dialogue.component.scss']
})
export class PedidoDialogueComponent implements OnInit {

  pedido: Pedido = new Pedido();

  pedidoList: any[] = new Array();

  fonecedorList: String[] = new Array();

  constructor(private fornecedorService: FornecedorService, public dialogRef: MatDialogRef<PedidoDialogueComponent>, private pedidoService: PedidoService,
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
          this.pedidoList.push(element);
        });
      }
    );
  }

}
