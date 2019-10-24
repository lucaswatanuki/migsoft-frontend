import { element } from 'protractor';
import { ProdutoService } from './../../services/produto.service';
import { Produto } from './../../model/produto.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  produto: Produto = new Produto();

  constructor(public dialogRef: MatDialogRef<DialogueComponent>, private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.element) {
      this.produto = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionar() {
    this.produtoService.adicionarProduto(this.produto).subscribe(data => {
      this.dialogRef.close();
    });
  }

  update() {
    this.produtoService.update(this.produto).subscribe(
      data => {
        this.dialogRef.close();
      }
    );
  }
}
