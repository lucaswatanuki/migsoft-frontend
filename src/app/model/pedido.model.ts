import { Cotacao } from './cotacao.model';
import { Fornecedor } from '../model/fornecedor.model';
import { Produto } from '../model/produto.model';

export class Pedido {
    id: number;
    data: string;
    cotacao: Cotacao;
    total: number;
    quantidade: number;
    status: string;
}
