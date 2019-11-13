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

  aprovar(cotacao: Cotacao) {
    console.log(this.cotacao);
    this.cotacao.status = 'Aprovado';
    this.cotacaoService.update(cotacao).subscribe();
  }

  adicionar() {
    console.log(this.cotacao);
    this.cotacaoService.adicionarCotacao(this.cotacao).subscribe(data => {
      this.dialogRef.close();
    });
  }


  update(cotacao: Cotacao) {
    this.cotacaoService.update(cotacao).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  loadFornecedores() {
    this.fornecedorService.getListaFornecedor().subscribe(
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
