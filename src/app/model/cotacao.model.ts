import { Pedido } from './pedido.model';
import { Produto } from './produto.model';
import { Fornecedor } from './fornecedor.model';
export class Cotacao
{
  id: number;
  preco: number;
  produto: Produto;
  fornecedor: Fornecedor;
  pedido: Pedido;
  data: string;
  data_resposta: string;
  quantidade: number;
  total: number;
  status: string;
}
