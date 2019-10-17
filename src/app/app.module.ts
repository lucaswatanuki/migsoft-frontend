import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './auth/auth-interceptor';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { ProdutoComponent } from './produto/produto.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { VendaComponent } from './venda/venda.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    PmComponent,
    ProdutoComponent,
    EstoqueComponent,
    RelatorioComponent,
    FornecedorComponent,
    ClienteComponent,
    VendaComponent,
    CotacaoComponent,
    OrcamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
