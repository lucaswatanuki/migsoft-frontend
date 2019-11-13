import { element } from 'protractor';
import { CotacaoDialogueComponent } from './cotacao-dialogue/cotacao-dialogue/cotacao-dialogue.component';
import { MatTableDataSource } from '@angular/material/table';
import { CotacaoService } from './../services/cotacao/cotacao.service';
import { MatPaginator } from '@angular/material/paginator';
import { Cotacao } from './../model/cotacao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.scss']
})
export class CotacaoComponent implements OnInit {

  cotacao: Cotacao = new Cotacao();
  cotacaoList: MatTableDataSource<Cotacao>;
  errorMsg: String;

  displayedColumns: string[] = ['id', 'fornecedor', 'produto', 'quantidade', 'data', 'total', 'status', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private cotacaoService: CotacaoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCotacao();
  }

  applyFilter(filterValue: string) {
    this.cotacaoList.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getCotacao() {
    console.log();
    this.cotacaoService.getListaCotacao().subscribe(
      data => {
        this.cotacaoList = new MatTableDataSource(data);
        this.cotacaoList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(CotacaoDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getCotacao();
      }
    );
  }

  update(cotacao: Cotacao) {
    this.cotacaoService.update(cotacao).subscribe(
      data => this.cotacao = data
    );
  }

  aprovar(cotacao: Cotacao) {
    console.log(this.cotacao);
    this.cotacaoService.updateStatus(cotacao).subscribe();
  }

  deletar(cotacao: Cotacao) {
    this.cotacaoService.delete(cotacao).subscribe(
      data => {
        this.getCotacao();
      });
  }

}
