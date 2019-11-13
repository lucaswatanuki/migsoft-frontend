import { Pessoa } from './pessoa.model';

export class Fornecedor extends Pessoa
{
  id: number;
  nomeFantasia: string;
  cnpj: string;
  pedido: number;
  atividade: string;
}
