import { BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from '../../entidades/produto.entidade';
import { BuscarProdutoPorIdCasoDeUso } from './buscar-produto-por-id.caso-de-uso';

export class AtualizarProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(
    id: string,
    dadosParaAtualizar: Partial<Omit<ProdutoEntidade, 'id'>>,
  ): Promise<ProdutoEntidade> {
    // Verifica existência
    const buscar = new BuscarProdutoPorIdCasoDeUso(this.prisma);
    await buscar.executar(id);

    if (!dadosParaAtualizar || Object.keys(dadosParaAtualizar).length === 0) {
      throw new BadRequestException(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }

    const produtoAtualizado = await this.prisma.produto.update({
      where: { id },
      data: dadosParaAtualizar,
    });

    return produtoAtualizado as ProdutoEntidade;
  }
}
