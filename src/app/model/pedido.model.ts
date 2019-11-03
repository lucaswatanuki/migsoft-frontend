import { Fornecedor } from '../model/fornecedor.model';
import { Produto } from '../model/produto.model';

export class Pedido {
    id: number;
    data: string;
    fornecedor: Fornecedor;
    produto: Produto;
    total: number;
    quantidade: number;
}
