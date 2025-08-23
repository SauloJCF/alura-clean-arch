import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from '../../entidades/produto.entidade';

export class BuscarProdutoPorIdCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(id: string): Promise<ProdutoEntidade> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto as ProdutoEntidade;
  }
}
