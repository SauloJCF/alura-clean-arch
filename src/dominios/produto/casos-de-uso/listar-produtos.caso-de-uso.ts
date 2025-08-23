import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from '../../entidades/produto.entidade';

export class ListarProdutosCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(): Promise<ProdutoEntidade[]> {
    return this.prisma.produto.findMany();
  }
}
