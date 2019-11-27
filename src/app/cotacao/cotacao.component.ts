import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { CotacaoDialogueComponent } from './cotacao-dialogue/cotacao-dialogue/cotacao-dialogue.component';
import { MatTableDataSource } from '@angular/material/table';
import { CotacaoService } from './../services/cotacao/cotacao.service';
import { MatPaginator } from '@angular/material/paginator';
import { Cotacao } from './../model/cotacao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';


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

  constructor(private cotacaoService: CotacaoService, public dialog: MatDialog, private toast: ToastrService) { }

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

  openDialog(element: Cotacao): void {
    if (element == null || element.status === 'Pendente') {
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
    else {
      this.toast.show('Cotação já aprovada');
    }
  }

  aprovar(cotacao: Cotacao) {
    console.log(this.cotacao);
    if (cotacao.status === 'Aprovado') {
      this.toast.show('Cotação já aprovada');
    } else {
      this.cotacaoService.updateStatus(cotacao).subscribe(
        data => {
          this.toast.success('Cotação aprovada com sucesso');
          this.getCotacao();
        });
    }
  }

  deletar(cotacao: Cotacao) {
    if (cotacao.status === 'Aprovado') {
      this.toast.error('Não é possível excluir cotações aprovadas', 'Erro');
    } else {
      this.cotacaoService.delete(cotacao).subscribe(
        data => {
          this.getCotacao();
          this.toast.success('Cotação excluída');
        });
    }
  }
}
