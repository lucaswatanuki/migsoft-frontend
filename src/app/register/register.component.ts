import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpInfo } from './../auth/signup-info';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  formularioCadastro: FormGroup;

  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  constructor(private authService: AuthService, private fbuilder: FormBuilder, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.formularioCadastro = this.fbuilder.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  showSuccess() {
    this.toast.success('Conta criada com sucesso');
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  showFail() {
    this.toast.error('Erro ao cadastrar conta');
  }
  onSubmit() {
    console.log(this.formularioCadastro);
    this.signupInfo = new SignUpInfo(
      this.formularioCadastro.get('name').value,
      this.formularioCadastro.get('username').value,
      this.formularioCadastro.get('email').value,
      this.formularioCadastro.get('password').value
    );


    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.showSuccess();
        this.form.resetForm();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.showFail();
      }
    );
  }
}
