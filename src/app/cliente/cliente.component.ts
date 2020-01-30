import { ToastrService } from 'ngx-toastr';
import { Pessoa } from './../model/pessoa.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogueComponent } from './cliente-dialogue/cliente-dialogue/cliente-dialogue.component';
import { ClienteService } from './../services/cliente/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from './../model/cliente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  formCliente: FormGroup;
  cliente: Cliente = new Cliente();
  clienteList: MatTableDataSource<any>;
  pessoa: Pessoa = new Pessoa();
  errorMsg: string;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'endereco', 'email', 'button'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(FormGroupDirective, {static: true}) form: FormGroupDirective;


  constructor(private validaBR: ValidateBrService, private fbuilder: FormBuilder, private clienteService: ClienteService, public dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit() {
    this.formCliente = this.fbuilder.group({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, this.validaBR.cpf, Validators.maxLength(14)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      endereco: new FormControl('', [Validators.required])
    });
    this.getCliente();
  }

  adicionar(form: FormGroupDirective) {
    console.log(this.cliente);
    this.clienteService.save(this.cliente).subscribe( data => {
      this.toast.success('Cliente Adicionado com sucesso!');
      this.form.resetForm();
      this.getCliente();
    },
      error => {
        this.toast.error('Verificar dados inseridos', 'Erro');
      }
    );
  }


  applyFilter(filterValue: string) {
    this.clienteList.filter = filterValue.trim().toLocaleLowerCase();
  }


  deletar(cliente: Cliente) {
    this.clienteService.delete(cliente).subscribe(
      data => {
        this.getCliente();
      },
      error => {
        this.toast.error('Impossível excluir cliente vinculado a pelo menos uma venda', 'Erro');
      }
    );
  }

  public getCliente(): void {
    this.clienteService.getClientes().subscribe(
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
