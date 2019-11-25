import { AuthGuardService } from './auth/auth-guard.service';
import { ProducaoComponent } from './producao/producao.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClienteComponent } from './cliente/cliente.component';
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
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pedido',
    component: PedidoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'produto',
    component: ProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'fornecedor',
    component: FornecedorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio',
    component: RelatorioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'venda',
    component: VendaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'orcamento',
    component: OrcamentoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cotacao',
    component: CotacaoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'producao',
    component: ProducaoComponent,
    canActivate: [AuthGuardService]
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
