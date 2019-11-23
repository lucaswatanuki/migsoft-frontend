import { ToastrService } from 'ngx-toastr';
import { RelatorioVendaProduto } from './../model/relatorioVenda.model';
import { ReportRequest } from './../model/reportRequest.model';
import { MatTableDataSource } from '@angular/material/table';
import { Relatorio } from './../model/relatorio.model';
import { RelatorioService } from './../services/relatorio/relatorio.service';
import { Venda } from './../model/venda.model';
import { Component, OnInit } from '@angular/core';
import { VendaService } from '../services/venda/venda.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  request: ReportRequest = new ReportRequest();
  relatorio: Relatorio = new Relatorio();
  relatorios: MatTableDataSource<RelatorioVendaProduto>;
  displayedColumns: string[] = ['produto', 'quantidadeTotal', 'vendasTotal'];
  errorMsg: String;


  constructor(private relatorioService: RelatorioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getRelatorioFinanceiro();
  }

  public getRelatorioFinanceiro(): void {
    this.relatorioService.getRelatorioFinanceiro().subscribe(
      data => {
        this.relatorio = data;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }


  public extrair(request: ReportRequest): void {
    this.relatorioService.postRelatorioVendaProduto(request).subscribe(
      data => {
        this.relatorios = new MatTableDataSource(data);
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
