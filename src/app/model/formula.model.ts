import { Produto } from './produto.model';

export class Formula {
  id: number;
  produto: Produto;
  material: string;
  descricao: string;
  quantidade: number;
}
