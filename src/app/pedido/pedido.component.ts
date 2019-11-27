import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../services/pedido/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from '../model/pedido.model';
import { PedidoDialogueComponent } from './pedido-dialogue/pedido-dialogue.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedido: Pedido = new Pedido();
  pedidoList: MatTableDataSource<Pedido>;
  errorMsg: String;

  displayedColumns: string[] = ['id', 'cotacao', 'fornecedor', 'produto', 'quantidade', 'data', 'status', 'total', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private pedidoService: PedidoService, public dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit() {
    this.getPedidos();
  }

  applyFilter(filterValue: string) {
    this.pedidoList.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getPedidos() {
    console.log();
    this.pedidoService.getListaPedidos().subscribe(
      data => {
        this.pedidoList = new MatTableDataSource(data);
        this.pedidoList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      });
  }

  openDialog(element): void {
    if (element == null || element.status === 'Aguardando transportadora') {
      const dialogRef = this.dialog.open(PedidoDialogueComponent, {
        data: {
          width: 'auto',
          height: 'auto',
          element
        }
      });
      dialogRef.afterClosed().subscribe(
        data => {
          this.getPedidos();
        }
      );
    }
    else if (element.status === 'Cancelado') {
      this.toast.error('Não é possível editar o pedido', 'Pedido cancelado');
    }
    else if (element.status === 'Entregue') {
      this.toast.error('Não é possível editar o pedido', 'Pedido já foi entregue');
    }
  }

  updateStatus(pedido: Pedido) {
    if (pedido.status === 'Entregue' || pedido.status === 'Cancelado') {
      this.toast.error('Pedido já foi ' + pedido.status);
    } else {
      this.pedidoService.updateStatus(pedido).subscribe(
        data => {
          this.toast.success('Status do pedido atualizado');
          this.getPedidos();
        });
    }
  }

  cancelarPedido(pedido: Pedido) {
    if (pedido.status === 'Cancelado' || pedido.status === 'Entregue') {
      this.toast.error('Impossível excluir pedidos com status ' + pedido.status);
    }
    else {
      this.pedidoService.cancelarPedido(pedido).subscribe(
        data => {
          this.toast.success('Pedido cancelado');
          this.getPedidos();
        });
    }
  }

  deletar(pedido: Pedido) {
    if (pedido.status === 'Cancelado' || pedido.status === 'Entregue') {
      this.toast.error('Não é possível excluir pedido com status ' + pedido.status, 'Erro');
    } else {
      this.pedidoService.delete(pedido).subscribe(
        data => {
          this.toast.success('Pedido excluído');
          this.getPedidos();
        });
    }
  }
}
