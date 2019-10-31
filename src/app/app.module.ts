import { FornecedorService } from './services/fornecedor/fornecedor.service';
import { ProdutoService } from './services/produto/produto.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './auth/auth-interceptor';

import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProdutoComponent } from './produto/produto.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { VendaComponent } from './venda/venda.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DialogueComponent } from './produto/dialogue/dialogue.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FornecedorDialogueComponent } from './fornecedor/fornecedor-dialogue/fornecedor-dialogue.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PedidoComponent } from './pedido/pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    ProdutoComponent,
    RelatorioComponent,
    FornecedorComponent,
    ClienteComponent,
    VendaComponent,
    CotacaoComponent,
    OrcamentoComponent,
    DialogueComponent,
    FornecedorDialogueComponent,
    PedidoComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  entryComponents: [DialogueComponent, FornecedorDialogueComponent],
  providers: [httpInterceptorProviders, ProdutoService, FornecedorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
