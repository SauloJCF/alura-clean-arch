import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CarrinhoFormatado,
  formatarCarrinho,
  obterOuCriarCarrinho,
} from '../servicos/carrinho.helper';

export class RemoverItemCarrinhoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(
    usuarioId: string,
    produtoId: string,
  ): Promise<{ mensagem: string; carrinho: CarrinhoFormatado }> {
    const carrinho = await obterOuCriarCarrinho(this.prisma, usuarioId);

    const itemNoCarrinho = carrinho.itens.find(
      (i) => i.produtoId === produtoId,
    );

    if (!itemNoCarrinho) {
      throw new NotFoundException(
        `Produto com ID ${produtoId} não está no carrinho.`,
      );
    }

    const [, carrinhoAtualizado] = await this.prisma.$transaction([
      this.prisma.produto.update({
        where: { id: produtoId },
        data: { estoque: { increment: itemNoCarrinho.quantidade } },
      }),
      this.prisma.carrinho.update({
        where: { id: carrinho.id },
        data: {
          itens: {
            delete: { id: itemNoCarrinho.id },
          },
        },
        include: { itens: { include: { produto: true } } },
      }),
    ]);

    return {
      mensagem: 'Item removido do carrinho!',
      carrinho: formatarCarrinho(carrinhoAtualizado),
    };
  }
}
