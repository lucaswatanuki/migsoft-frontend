import { Produto } from './produto.model';
export class Estoque
{
  id: number;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
  cep: string;
  produto: Produto[];
}
