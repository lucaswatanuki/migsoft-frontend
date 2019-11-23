import { VendaDialogueComponent } from './venda-dialogue/venda-dialogue.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Venda } from './../model/venda.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VendaService } from '../services/venda/venda.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

  venda: Venda = new Venda();
  vendaList: MatTableDataSource<Venda>;
  errorMsg: string;

  displayedColumns: string[] = ['id', 'cliente', 'produto', 'quantidade', 'data', 'total', 'status', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private vendaService: VendaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getVendas();
  }

  applyFilter(filterValue: string) {
    this.vendaList.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getVendas() {
    console.log();
    this.vendaService.getListaVendas().subscribe(
      data => {
        this.vendaList = new MatTableDataSource(data);
        this.vendaList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      });
  }

  cancelar(venda: Venda) {
    console.log(this.venda);
    this.vendaService.cancelarVenda(venda).subscribe(
      data => {
        this.getVendas();
      });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(VendaDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getVendas();
      }
    );
  }



}
