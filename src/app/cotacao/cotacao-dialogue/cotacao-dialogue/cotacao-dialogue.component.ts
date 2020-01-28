import { Fornecedor } from './../../../model/fornecedor.model';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Produto } from './../../../model/produto.model';
import { FornecedorService } from './../../../services/fornecedor/fornecedor.service';
import { ProdutoService } from './../../../services/produto/produto.service';
import { CotacaoService } from './../../../services/cotacao/cotacao.service';
import { DialogueComponent } from './../../../produto/dialogue/dialogue.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Cotacao } from './../../../model/cotacao.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cotacao-dialogue',
  templateUrl: './cotacao-dialogue.component.html',
  styleUrls: ['./cotacao-dialogue.component.scss']
})
export class CotacaoDialogueComponent implements OnInit {

  formCotacao: FormGroup;
  cotacao: Cotacao = new Cotacao();
  produto: Produto = new Produto();
  fornecedorList: any[] = new Array();


  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private fornecedorService: FornecedorService,
    public dialogRef: MatDialogRef<CotacaoDialogueComponent>,
    private cotacaoService: CotacaoService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private fbuilder: FormBuilder) { }

  ngOnInit() {
    this.formCotacao = this.fbuilder.group({
      data: new FormControl('', [Validators.required]),
      produto: new FormControl('', [Validators.required]),
      fornecedor: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required])
    });

    this.loadFornecedores();
    if (this.data.element) {
      this.cotacao = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showFail() {
    this.toastr.error("Verificar dados e produto e fornecedor", "Erro ao cadastrar cotação");
  }

  aprovar(cotacao: Cotacao) {
    console.log(this.cotacao);
    this.cotacao.status = 'Aprovado';
    this.cotacaoService.update(cotacao).subscribe();
  }

  adicionar() {
    console.log(this.cotacao);
    this.cotacaoService.adicionarCotacao(this.cotacao).subscribe(data => {
      this.showSuccess('Cotação adicionada com sucesso');
      this.dialogRef.close();
    },
      error => {
        this.showFail();
      }
    );
  }


  update(cotacao: Cotacao) {
    this.cotacaoService.update(cotacao).subscribe(
      data => {
        this.showSuccess('Cotação atualizada com sucesso');
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      }
    );
  }

  loadFornecedores() {
    this.fornecedorService.getListaFornecedoresAtivos().subscribe(
      data => {
        data.forEach(element => {
          this.fornecedorList.push(element);
        });
      }
    );
  }

  openDialogProduto(): void {
    const dialogRef = this.dialog.open(CotacaoProdutoSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formCotacao.get('produto').setValue(result.nome);
    });
  }

  openDialogFornecedor(): void {
    const dialogRef = this.dialog.open(CotacaoFornecedorSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formCotacao.get('fornecedor').setValue(result.nomeFantasia);
    });
  }
}


//SUBCOMPONENT SEARCHING TABLE
@Component({
  selector: 'cotacao-search-produto-dialogue',
  templateUrl: './cotacao-search-produto-dialogue.component.html',
  styleUrls: ['./cotacao-dialogue.component.scss']
})

export class CotacaoProdutoSearchDialogueComponent {

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
    public dialogRef: MatDialogRef<CotacaoProdutoSearchDialogueComponent>,
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
  selector: 'cotacao-search-fornecedor-dialogue',
  templateUrl: './cotacao-search-fornecedor-dialogue.component.html',
  styleUrls: ['./cotacao-dialogue.component.scss']
})

export class CotacaoFornecedorSearchDialogueComponent {

  fornecedor: Fornecedor = new Fornecedor();
  fornecedorList: Fornecedor[] = [];

  nextpage = true;

  displayedColumns: string[] = ['id', 'nomeFantasia', 'cnpj', 'select'];
  dataSource: MatTableDataSource<Request>;
  selection = new SelectionModel<Request>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataGrid: Request[];
  selection3 = new SelectionModel<Request>(false, []);
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<CotacaoFornecedorSearchDialogueComponent>,
    private fornecedorService: FornecedorService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.dataGrid);
  }

  ngOnInit() {
    this.getFornecedor();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getFornecedor(): void {
    this.fornecedorService.getListaFornecedor().subscribe(
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
