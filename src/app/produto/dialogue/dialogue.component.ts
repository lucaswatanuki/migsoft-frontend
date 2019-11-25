import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { ProdutoService } from '../../services/produto/produto.service';
import { Produto } from './../../model/produto.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  produto: Produto = new Produto();
  formularioProduto: FormGroup;

  constructor(private fbuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogueComponent>,
    private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.element) {
      this.produto = this.data.element;
    }
    this.formularioProduto = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showFail() {
    this.toastr.error("Verificar dados inseridos", "Erro ao cadastrar produto");
  }

  adicionar() {
    this.produtoService.adicionarProduto(this.produto).subscribe(data => {
      this.showSuccess('Produto cadastrado com sucesso!');
      this.dialogRef.close();
    },
    error => {
      this.showFail();
    }
    );
  }

  update(produto: Produto) {
    this.produtoService.update(produto).subscribe(
      data => {
        this.showSuccess('Produto atualizado com sucesso!');
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      }
    );
  }
}
