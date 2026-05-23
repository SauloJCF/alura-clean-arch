import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';

export class ListarProdutosCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(): Promise<ProdutoEntidade[]> {
    return this.prisma.produto.findMany();
  }
}
