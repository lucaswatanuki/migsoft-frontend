import { ProducaoDialogueComponent } from './producao-dialogue/producao-dialogue.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Formula } from './../model/formula.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProducaoService } from '../services/producao/producao.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.scss']
})
export class ProducaoComponent implements OnInit {

  formula: Formula = new Formula();
  formulaList: MatTableDataSource<Formula>;
  errorMsg: String;

  displayedColumns: string[] = ['id', 'produto', 'material', 'descricao', 'quantidade', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private producaoService: ProducaoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getFormulas();
  }

  applyFilter(filterValue: string) {
    this.formulaList.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getFormulas() {
    console.log();
    this.producaoService.getListaFormulas().subscribe(
      data => {
        this.formulaList = new MatTableDataSource(data);
        this.formulaList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ProducaoDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getFormulas();
      }
    );
  }

  deletar(formula: Formula) {
    this.producaoService.delete(formula).subscribe(
      data => {
        this.getFormulas();
      });
  }

}
