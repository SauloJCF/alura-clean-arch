import { PrismaClient } from '@prisma/client';
import { obterOuCriarCarrinho } from '../servicos/carrinho.helper';
import { NotFoundException } from '@nestjs/common';

export class RemoverItemCarrinhoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(usuarioId: string, produtoId: string) {
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

    return carrinhoAtualizado;
  }
}
