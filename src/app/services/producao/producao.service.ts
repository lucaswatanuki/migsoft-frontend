import { environment } from './../../../environments/environment';
import { Formula } from './../../model/formula.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {

  private url = environment.api + 'api/formula/';

  constructor(private http: HttpClient) { }

  getListaFormulas(): Observable<any> {
    return this.http.get<Formula[]>(this.url + 'all');
  }

  adicionarFormula(formula: Formula): Observable<any> {
    return this.http.post<any>(this.url, formula);
  }

  update(formula: Formula): Observable<any> {
    return this.http.put<Formula>(this.url, formula);
  }


  delete(formula: Formula) {
    return this.http.delete<Formula>(this.url + formula.id);
  }


}
