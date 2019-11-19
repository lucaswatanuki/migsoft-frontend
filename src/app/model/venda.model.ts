import { Cliente } from './cliente.model';
import { Produto } from './produto.model';
export class Venda
{
  id: number;
  data: Date;
  cliente: Cliente;
  produto: Produto;
  quantidade: number;
  total: number;
}
