import { Component, OnInit, ViewChild } from '@angular/core';
import { Orcamento } from '../model/orcamento.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrcamentoService } from '../services/orcamento/orcamento.service';
import { OrcamentoDialogueComponent } from './orcamento-dialogue/orcamento-dialogue.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {

  orcamento: Orcamento = new Orcamento();
  orcamentoList: MatTableDataSource<Orcamento>;
  errorMsg: string;

  displayedColumns: string[] = ['id', 'cliente', 'produto', 'quantidade', 'data', 'total', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private orcamentoService: OrcamentoService, public dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit() {
    this.getOrcamentos();
  }

  applyFilter(filterValue: string) {
    this.orcamentoList.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getOrcamentos() {
    this.orcamentoService.getListaOrcamentos().subscribe(
      data => {
        this.orcamentoList = new MatTableDataSource(data);
        this.orcamentoList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      });
  }


  delete(orcamento: Orcamento) {
    this.orcamentoService.delete(orcamento).subscribe(
      data => {
        this.getOrcamentos();
      },
      error => {
        this.toast.error('Erro ao excluir orçamento', 'Erro');
      }
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(OrcamentoDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getOrcamentos();
      }
    );
  }

}
