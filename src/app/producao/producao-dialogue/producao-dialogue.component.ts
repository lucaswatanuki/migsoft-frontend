import { ProdutoService } from './../../services/produto/produto.service';
import { ProducaoService } from './../../services/producao/producao.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogueComponent } from './../../produto/dialogue/dialogue.component';
import { Formula } from './../../model/formula.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-producao-dialogue',
  templateUrl: './producao-dialogue.component.html',
  styleUrls: ['./producao-dialogue.component.scss']
})
export class ProducaoDialogueComponent implements OnInit {

  formula: Formula = new Formula();
  foundProduto: boolean = false;
  nomeProduto: String;

  constructor(public dialogRef: MatDialogRef<DialogueComponent>, private producaoService: ProducaoService,
    private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.element) {
      this.formula = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionar() {
    this.findProdutoByName(this.nomeProduto);
    this.producaoService.adicionarFormula(this.formula).subscribe(data => {
      this.dialogRef.close();
    });
  }

  update(formula: Formula) {
    this.producaoService.update(formula).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }

  findProdutoByName(name: String) {
    this.produtoService.getListaProdutos().subscribe(
      data => {
        data.forEach(element => {
            if (name === element['nome']) {
              this.foundProduto = true;
              this.formula.produto = element;
              return;
            } else {
              this.foundProduto = false;
            }
        });
      }
    );
  }

}
