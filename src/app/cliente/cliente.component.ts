import { Pessoa } from './../model/pessoa.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogueComponent } from './cliente-dialogue/cliente-dialogue/cliente-dialogue.component';
import { ClienteService } from './../services/cliente/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from './../model/cliente.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  clienteList: MatTableDataSource<any>;
  pessoa: Pessoa = new Pessoa();
  errorMsg: string;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'endereco', 'email', 'button'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private clienteService: ClienteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCliente();
  }

  adicionar() {
    console.log(this.cliente);
    this.clienteService.adicionarCliente(this.cliente).subscribe( data => {
      this.getCliente();
    });
  }


  applyFilter(filterValue: string) {
    this.clienteList.filter = filterValue.trim().toLocaleLowerCase();
  }


  deletar(cliente: Cliente) {
    this.clienteService.delete(cliente).subscribe(
      data => {
        this.getCliente();
      }
    );
  }

  public getCliente(): void {
    this.clienteService.getListaCliente().subscribe(
      data => {
        this.clienteList = new MatTableDataSource(data);
        this.clienteList.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ClienteDialogueComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getCliente();
      }
    );
  }

}
