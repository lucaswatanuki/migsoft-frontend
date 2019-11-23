import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Pessoa } from './../../model/pessoa.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorService } from './../../services/fornecedor/fornecedor.service';
import { DialogueComponent } from './../../produto/dialogue/dialogue.component';
import { Component, OnInit, Inject } from '@angular/core';
import { Fornecedor } from 'src/app/model/fornecedor.model';

@Component({
  selector: 'app-fornecedor-dialogue',
  templateUrl: './fornecedor-dialogue.component.html',
  styleUrls: ['./fornecedor-dialogue.component.scss']
})
export class FornecedorDialogueComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  pessoa: Pessoa = new Pessoa();

  constructor(private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogueComponent>, private fornecedorService: FornecedorService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.element) {
      this.fornecedor = this.data.element;
      this.pessoa = this.data.element;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showFail() {
    this.toastr.error("Verificar dados inseridos", "Erro ao cadastrar fornecedor");
  }

  adicionar() {
    this.fornecedorService.adicionarFornecedor(this.fornecedor).subscribe(data => {
      this.showSuccess('Fornecedor cadastrado com sucesso!');
      this.dialogRef.close();
    },
      error => {
        this.showFail();
      }
    );
  }

  update(fornecedor: Fornecedor) {
    this.fornecedorService.update(this.fornecedor).subscribe(
      data => {
        this.showSuccess('Fornecedor atualizado!');
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      }
    );
  }

}
