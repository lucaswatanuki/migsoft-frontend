import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Pessoa } from './../../model/pessoa.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorService } from './../../services/fornecedor/fornecedor.service';
import { DialogueComponent } from './../../produto/dialogue/dialogue.component';
import { Component, OnInit, Inject } from '@angular/core';
import { Fornecedor } from 'src/app/model/fornecedor.model';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-fornecedor-dialogue',
  templateUrl: './fornecedor-dialogue.component.html',
  styleUrls: ['./fornecedor-dialogue.component.scss']
})
export class FornecedorDialogueComponent implements OnInit {

  formFornecedor: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();
  pessoa: Pessoa = new Pessoa();

  constructor(private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogueComponent>, private fornecedorService: FornecedorService,
    @Inject(MAT_DIALOG_DATA) public data,
    private fbuilder: FormBuilder,
    private validaBR: ValidateBrService) { this.fornecedor.atividade='Ativo'; }

  ngOnInit() {
    this.formFornecedor = this.fbuilder.group({
      nomeFantasia: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required, this.validaBR.cnpj]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, this.validaBR.cpf, Validators.maxLength(14)]),
      contatoTelefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      endereco: new FormControl('', [Validators.required]),
      atividade: new FormControl('', [Validators.required])
    });

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
    this.fornecedorService.save(this.fornecedor).subscribe(data => {
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
