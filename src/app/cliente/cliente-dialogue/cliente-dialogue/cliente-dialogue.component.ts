import { ToastrService } from 'ngx-toastr';
import { Pessoa } from './../../../model/pessoa.model';
import { Cliente } from './../../../model/cliente.model';
import { DialogueComponent } from './../../../produto/dialogue/dialogue.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from './../../../services/cliente/cliente.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-cliente-dialogue',
  templateUrl: './cliente-dialogue.component.html',
  styleUrls: ['./cliente-dialogue.component.scss']
})
export class ClienteDialogueComponent implements OnInit {
  formCliente: FormGroup;
  cliente: Cliente = new Cliente();
  pessoa: Pessoa = new Pessoa();

  constructor(public dialogRef: MatDialogRef<DialogueComponent>, private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private fbuilder: FormBuilder,
    private validateBrService: ValidateBrService) { }

  ngOnInit() {

    this.formCliente = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, this.validateBrService.cpf, Validators.maxLength(14)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      endereco: new FormControl('', [Validators.required]),
    });

    console.log(this.data);
    if (this.data.element) {
      this.cliente = this.data.element;
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
    this.toastr.error("Verificar dados inseridos", "Erro ao cadastrar cliente");
  }

  update(cliente: Cliente) {
    this.clienteService.update(cliente).subscribe(
      data => {
        this.showSuccess('Cliente atualizado com sucesso!');
        this.dialogRef.close();
      },
      error => {
        this.showFail();
      }
    );
  }

}
