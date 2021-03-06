import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { TokenStorageService } from '../core/auth/token-storage.service';
import { AuthLoginInfo } from '../core/auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    public router: Router,
    private toast: ToastrService) { }


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }


  showFail() {
    this.toast.show('Verificar usuário e senha', 'Erro ao realizar login');
  }


  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        this.reloadPage();
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
        this.showFail();
      }
    );
  }

  loadSignUp() {
    this.router.navigate(['/signup']);
    //window.location.replace('http://localhost:4200/signup');
  }

  reloadPage() {
    window.location.replace(environment.localhost + 'home');
  }
}
