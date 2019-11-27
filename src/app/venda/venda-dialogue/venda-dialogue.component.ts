import { HttpErrorResponse } from '@angular/common/http';
import { Cliente } from './../../model/cliente.model';
import { Produto } from './../../model/produto.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProdutoService } from './../../services/produto/produto.service';
import { ClienteService } from './../../services/cliente/cliente.service';
import { Venda } from './../../model/venda.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { VendaService } from 'src/app/services/venda/venda.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-venda-dialogue',
  templateUrl: './venda-dialogue.component.html',
  styleUrls: ['./venda-dialogue.component.scss']
})
export class VendaDialogueComponent implements OnInit {
  erro: HttpErrorResponse;
  formularioVenda: FormGroup;
  venda: Venda = new Venda();
  produto: Produto = new Produto();
  clienteList: any[] = new Array();
  foundProduto: boolean = false;
  errorMsg: string;
  nomeProduto: String;
  resultIdModal: number;
  @ViewChild('form', { static: true }) form;

  constructor(private fbuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<VendaDialogueComponent>,
    private vendaService: VendaService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.formularioVenda = this.fbuilder.group({
      data: ['', Validators.required],
      produto: ['', Validators.required],
      cliente: ['', Validators.required],
      quantidade: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  showSuccess() {
    this.toastr.success('Venda adicionada');
  }

  showFail() {
    this.toastr.error("Verificar dados e produto e cliente", "Erro ao cadastrar venda");
  }

  adicionar() {
    console.log(this.produto);
    this.vendaService.adicionarVenda(this.venda).subscribe(
      data => {
        this.showSuccess();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Estoque insuficiente', 'Erro');
      }
    );
  }

  update() {
    this.venda.data = this.formularioVenda.get('data').value;
    this.venda.produto = this.formularioVenda.get('produto').value;
    this.venda.cliente = this.formularioVenda.get('cliente').value;
    this.venda.quantidade = this.formularioVenda.get('quantidade').value;
    this.vendaService.updateVenda(this.venda).subscribe(
      data => {
        this.showSuccess();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Estoque insuficiente', 'Erro');
      }
    );
  }

  openDialogProduto(): void {
    const dialogRef = this.dialog.open(ProdutoSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formularioVenda.get('produto').setValue(result.nome);
    });
  }

  openDialogCliente(): void {
    const dialogRef = this.dialog.open(ClienteSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formularioVenda.get('cliente').setValue(result.nome);
    });
  }

}

//SUBCOMPONENT SEARCHING TABLE
@Component({
  selector: 'search-produto-dialogue',
  templateUrl: './search-produto-dialogue.component.html',
  styleUrls: ['./venda-dialogue.component.scss']
})

export class ProdutoSearchDialogueComponent {

  produto: Produto = new Produto();
  listaProduto: Produto[] = [];

  nextpage = true;

  displayedColumns: string[] = ['id', 'nome', 'preco', 'qtdEstoque', 'select'];
  dataSource: MatTableDataSource<Request>;
  selection = new SelectionModel<Request>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataGrid: Request[];
  selection3 = new SelectionModel<Request>(false, []);
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<ProdutoSearchDialogueComponent>,
    private produtoService: ProdutoService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.dataGrid);
  }

  ngOnInit() {
    this.getProdutos();
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public getProdutos(): void {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  selectRow(row) {
    console.log(row);
    this.dialogRef.close(row);
  }
}

//SUBCOMPONENT SEARCHING TABLE
@Component({
  selector: 'search-cliente-dialogue',
  templateUrl: './search-cliente-dialogue.component.html',
  styleUrls: ['./venda-dialogue.component.scss']
})

export class ClienteSearchDialogueComponent {

  cliente: Cliente = new Cliente();
  listaCliente: Cliente[] = [];

  nextpage = true;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'select'];
  dataSource: MatTableDataSource<Request>;
  selection = new SelectionModel<Request>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataGrid: Request[];
  selection3 = new SelectionModel<Request>(false, []);
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<ClienteSearchDialogueComponent>,
    private clienteService: ClienteService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.dataGrid);
  }

  ngOnInit() {
    this.getCliente();
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public getCliente(): void {
    this.clienteService.getListaCliente().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  selectRow(row) {
    console.log(row);
    this.dialogRef.close(row);
  }
}

