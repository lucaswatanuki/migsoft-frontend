import { FornecedorDialogueComponent } from './fornecedor-dialogue/fornecedor-dialogue.component';
import { DialogueComponent } from './../produto/dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorService } from './../services/fornecedor/fornecedor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from './../model/fornecedor.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  fornecedorList: MatTableDataSource<any>;
  errorMsg: String;
  displayedColumns: string[] = ['id', 'nomeFantasia', 'cnpj', 'atividade', 'button'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private fornecedorService: FornecedorService, public dialog: MatDialog) {
   }

  ngOnInit() {
    this.getFornecedor();
  }

  applyFilter(filterValue: string) {
    this.fornecedorList.filter = filterValue.trim().toLocaleLowerCase();
  }


  deletar(fornecedor: Fornecedor) {
    this.fornecedorService.delete(fornecedor).subscribe(
      data => {
        this.getFornecedor();
      }
    );
  }

  public getFornecedor(): void {
    this.fornecedorService.getListaFornecedor().subscribe(
      data => {
        this.fornecedorList = new MatTableDataSource(data);
        this.fornecedorList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(FornecedorDialogueComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getFornecedor();
      }
    );
  }

}
