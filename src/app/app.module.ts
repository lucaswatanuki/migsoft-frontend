import { PedidoService } from './services/pedido/pedido.service';
import { CotacaoService } from './services/cotacao/cotacao.service';
import { RelatorioService } from './services/relatorio/relatorio.service';
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
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PedidoDialogueComponent } from './pedido/pedido-dialogue/pedido-dialogue.component';
import { MatDatepickerModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { ClienteDialogueComponent } from './cliente/cliente-dialogue/cliente-dialogue/cliente-dialogue.component';
import { VendaDialogueComponent, ProdutoSearchDialogueComponent, ClienteSearchDialogueComponent } from './venda/venda-dialogue/venda-dialogue.component';
import { ProducaoComponent } from './producao/producao.component';
import { ProducaoDialogueComponent } from './producao/producao-dialogue/producao-dialogue.component';
import { CotacaoDialogueComponent } from './cotacao/cotacao-dialogue/cotacao-dialogue/cotacao-dialogue.component';
import { VendaService } from './services/venda/venda.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    PedidoDialogueComponent,
    ClienteDialogueComponent,
    VendaDialogueComponent,
    ProducaoComponent,
    ProducaoDialogueComponent,
    CotacaoDialogueComponent,
    ProdutoSearchDialogueComponent,
    ClienteSearchDialogueComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
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
    MatMenuModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  entryComponents: [DialogueComponent,
     FornecedorDialogueComponent,
     PedidoDialogueComponent,
     ClienteDialogueComponent,
     VendaDialogueComponent,
     ProducaoDialogueComponent,
     CotacaoDialogueComponent,
     ProdutoSearchDialogueComponent,
     ClienteSearchDialogueComponent
      ],
  providers: [httpInterceptorProviders, ProdutoService, FornecedorService, RelatorioService, CotacaoService, PedidoService, VendaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
