import { Fornecedor } from '../model/fornecedor.model';
import { Produto } from '../model/produto.model';

export class Pedido {
    id: number;
    data: String;
    total: number;
    fornecedor_id: Fornecedor;
    produto_id: Produto;
}
