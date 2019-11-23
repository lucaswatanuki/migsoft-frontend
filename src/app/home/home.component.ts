import { Relatorio } from './../model/relatorio.model';
import { RelatorioService } from './../services/relatorio/relatorio.service';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Injectable } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  errorMsg: String;
  relatorio: Relatorio = new Relatorio();
 /** Based on the screen size, switch from standard to one column per row */
 cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  map(({ matches }) => {
    if (matches) {
      return [
        { title: 'Lucro', cols: 1, rows: 1 },
        { title: 'Prejuízo', cols: 1, rows: 1 },
        { title: 'Vendas', cols: 1, rows: 1 },
        { title: 'Pedidos', cols: 1, rows: 1 },
      ];
    }

    return [
      { title: 'Lucro', cols: 1, rows: 1 },
      { title: 'Prejuízo', cols: 1, rows: 1 },
      { title: 'Vendas', cols: 1, rows: 1 },
      { title: 'Pedidos', cols: 1, rows: 1 },
    ];
  })
);
  info: any;

  constructor(private relatorioService: RelatorioService, private token: TokenStorageService, private breakpointObserver: BreakpointObserver, public router: Router) {
    this.router = router;
   }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
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

  reloadPage() {
    window.location.reload();
  }

}
