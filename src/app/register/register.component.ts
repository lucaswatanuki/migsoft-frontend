import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpInfo } from './../auth/signup-info';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  formularioCadastro: FormGroup;

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
    this.toast.show("Conta criada com sucesso");
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  showFail() {
    this.toast.show("Erro ao cadastrar conta");
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
        this.formularioCadastro.reset();
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
