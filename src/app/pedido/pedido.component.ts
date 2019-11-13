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

  displayedColumns: string[] = ['id', 'cotacao', 'fornecedor', 'produto', 'quantidade', 'data', 'total', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private pedidoService: PedidoService, public dialog: MatDialog) { }

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
    console.log(element);
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

  deletar(pedido: Pedido) {
    this.pedidoService.delete(pedido).subscribe(
      data => {
        this.getPedidos();
      });
  }
}
