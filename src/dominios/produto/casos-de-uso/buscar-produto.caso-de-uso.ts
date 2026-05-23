import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';

export class BuscarProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}
  public async executar(id: string): Promise<ProdutoEntidade> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }
}
