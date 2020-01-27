import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Orcamento } from 'src/app/model/orcamento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrcamentoService } from '../../services/orcamento/orcamento.service';
import { Cliente } from './../../model/cliente.model';
import { Produto } from './../../model/produto.model';
import { ProdutoService } from './../../services/produto/produto.service';
import { ClienteService } from './../../services/cliente/cliente.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orcamento-dialogue',
  templateUrl: './orcamento-dialogue.component.html',
  styleUrls: ['./orcamento-dialogue.component.scss']
})
export class OrcamentoDialogueComponent implements OnInit {

  formularioOrcamento: FormGroup;
  orcamento: Orcamento = new Orcamento();
  clienteList: any[] = new Array();
  foundProduto: boolean = false;
  errorMsg: string;
  nomeProduto: String;
  resultIdModal: number;
  @ViewChild('form', { static: true }) form;

  constructor(private fbuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<OrcamentoDialogueComponent>,
    private orcamentoService: OrcamentoService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.formularioOrcamento = this.fbuilder.group({
      data: ['', Validators.required],
      produto: ['', Validators.required],
      cliente: ['', Validators.required],
      quantidade: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  showSuccess() {
    this.toastr.success('Orçamento adicionado');
  }

  showFail() {
    this.toastr.error("Verificar dados de produto e cliente", "Erro ao cadastrar orçamento");
  }

  adicionar() {
    this.orcamento = new Orcamento();
    this.orcamento.data = this.formularioOrcamento.get('data').value;
    this.orcamento.produto = this.formularioOrcamento.get('produto').value;
    this.orcamento.cliente = this.formularioOrcamento.get('cliente').value;
    this.orcamento.quantidade = this.formularioOrcamento.get('quantidade').value;
    this.orcamentoService.adicionar(this.orcamento).subscribe(
      data => {
        this.showSuccess();
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      });
  }

  update(orcamento: Orcamento) {
    this.orcamentoService.update(orcamento).subscribe(
      data => {
        this.toastr.success('Orçamento atualizado');
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Erro ao atualizar orçamento', 'Erro');
      }
    )
  }

  openDialogProduto(): void {
    const dialogRef = this.dialog.open(OrcamentoProdutoSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formularioOrcamento.get('produto').setValue(result.nome);
    });
  }

  openDialogCliente(): void {
    const dialogRef = this.dialog.open(OrcamentoClienteSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formularioOrcamento.get('cliente').setValue(result.nome);
    });
  }

}
@Component({
  selector: 'orcamento-search-produto-dialogue',
  templateUrl: './orcamento-search-produto-dialogue.component.html',
  styleUrls: ['./orcamento-dialogue.component.scss']
})

export class OrcamentoProdutoSearchDialogueComponent {

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
    public dialogRef: MatDialogRef<OrcamentoProdutoSearchDialogueComponent>,
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

@Component({
  selector: 'orcamento-search-cliente-dialogue',
  templateUrl: './orcamento-search-cliente-dialogue.component.html',
  styleUrls: ['./orcamento-dialogue.component.scss']
})
export class OrcamentoClienteSearchDialogueComponent {

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
    public dialogRef: MatDialogRef<OrcamentoClienteSearchDialogueComponent>,
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
