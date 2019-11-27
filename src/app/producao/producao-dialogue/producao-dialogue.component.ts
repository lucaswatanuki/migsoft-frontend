import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Produto } from './../../model/produto.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from './../../services/produto/produto.service';
import { ProducaoService } from './../../services/producao/producao.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from './../../produto/dialogue/dialogue.component';
import { Formula } from './../../model/formula.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-producao-dialogue',
  templateUrl: './producao-dialogue.component.html',
  styleUrls: ['./producao-dialogue.component.scss']
})
export class ProducaoDialogueComponent implements OnInit {

  formProducao: FormGroup;
  formula: Formula = new Formula();
  foundProduto: boolean = false;
  nomeProduto: String;

  constructor(private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogueComponent>, private producaoService: ProducaoService,
    private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data,
    private fbuilder: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.formProducao = this.fbuilder.group({
      descricao: new FormControl('', [Validators.required]),
      produto: new FormControl('', [Validators.required]),
      material: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required])
    });
    console.log(this.data);
    if (this.data.element) {
      this.formula = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showFail() {
    this.toastr.error("Verificar dados inseridos", "Erro ao inserir fórmula do produto");
  }

  adicionar() {
    this.producaoService.adicionarFormula(this.formula).subscribe(data => {
      this.showSuccess('Formula de produto adicionada!');
      this.dialogRef.close();
    },
    error => {
      this.showFail();
    }
    );
  }

  update(formula: Formula) {
    this.producaoService.update(formula).subscribe(
      data => {
        this.showSuccess('Formula de produto atualizada!');
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      }
    );
  }

  openDialogProduto(): void {
    const dialogRef = this.dialog.open(ProducaoProdutoSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.formProducao.get('produto').setValue(result.nome);
    });
  }

}


//SUBCOMPONENT SEARCHING TABLE
@Component({
  selector: 'producao-search-produto-dialogue',
  templateUrl: './producao-search-produto-dialogue.component.html',
  styleUrls: ['./producao-dialogue.component.scss']
})

export class ProducaoProdutoSearchDialogueComponent {

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
    public dialogRef: MatDialogRef<ProducaoProdutoSearchDialogueComponent>,
    private produtoService: ProdutoService) {
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

