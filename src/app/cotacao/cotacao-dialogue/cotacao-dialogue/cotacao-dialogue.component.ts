import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Produto } from './../../../model/produto.model';
import { FornecedorService } from './../../../services/fornecedor/fornecedor.service';
import { ProdutoService } from './../../../services/produto/produto.service';
import { CotacaoService } from './../../../services/cotacao/cotacao.service';
import { DialogueComponent } from './../../../produto/dialogue/dialogue.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cotacao } from './../../../model/cotacao.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cotacao-dialogue',
  templateUrl: './cotacao-dialogue.component.html',
  styleUrls: ['./cotacao-dialogue.component.scss']
})
export class CotacaoDialogueComponent implements OnInit {
  cotacao: Cotacao = new Cotacao();
  produto: Produto = new Produto();
  foundProduto: boolean = false;
  fornecedorList: any[] = new Array();
  nomeProduto: String;

  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private fornecedorService: FornecedorService,
    public dialogRef: MatDialogRef<CotacaoDialogueComponent>,
    private cotacaoService: CotacaoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
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

  findProdutoByName(name: String) {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        data.forEach(element => {
          if (name === element['nome']) {
            this.foundProduto = true;
            this.cotacao.produto = element;
            return;
          } else {
            this.foundProduto = false;
          }
        });
      }
    );
  }

}
