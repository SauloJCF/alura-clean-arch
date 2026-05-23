import { ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';

export class CriarProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(
    dadosDoProduto: Omit<ProdutoEntidade, 'id'>,
  ): Promise<ProdutoEntidade> {
    const produtoExistente = await this.prisma.produto.findUnique({
      where: { nome: dadosDoProduto.nome },
    });

    if (produtoExistente) {
      throw new ConflictException('Já existe um produto com este nome.');
    }

    return this.prisma.produto.create({
      data: dadosDoProduto,
    });
  }
}
