import { EstoqueComponent } from './estoque/estoque.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { VendaComponent } from './venda/venda.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ProdutoComponent } from './produto/produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'produto',
    component: ProdutoComponent
  },
  {
    path: 'fornecedor',
    component: FornecedorComponent
  },
  {
    path: 'relatorio',
    component: RelatorioComponent
  },
  {
    path: 'venda',
    component: VendaComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'estoque',
    component: EstoqueComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
