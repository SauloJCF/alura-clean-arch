import { PrismaClient } from '@prisma/client';
import { BuscarProdutoCasoDeUso } from './buscar-produto.caso-de-uso';
import { BadRequestException } from '@nestjs/common';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';

export class AtualizarProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(
    id: string,
    dadosParaAtualizar: Partial<{ nome: string; preco: number }>,
  ): Promise<ProdutoEntidade> {
    await new BuscarProdutoCasoDeUso(this.prisma).executar(id);

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new BadRequestException(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }

    const produtoAtualizado = await this.prisma.produto.update({
      where: { id },
      data: dadosParaAtualizar,
    });

    return produtoAtualizado;
  }
}
