import { PrismaClient } from '@prisma/client';
import { obterOuCriarCarrinho } from '../servicos/carrinho.helper';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export type AdicionarItemPayload = {
  produtoId: string;
  quantidade: number;
};

export class AdicionarItemCarrinhoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(usuarioId: string, payload: AdicionarItemPayload) {
    const carrinho = await obterOuCriarCarrinho(this.prisma, usuarioId);

    const produto = await this.prisma.produto.findUnique({
      where: { id: payload.produtoId },
    });
    if (!produto) {
      throw new NotFoundException(
        `Produto com ID ${payload.produtoId} não encontrado.`,
      );
    }

    if (produto.estoque < payload.quantidade) {
      throw new BadRequestException(
        `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}.`,
      );
    }

    const [, carrinhoAtualizado] = await this.prisma.$transaction([
      this.prisma.produto.update({
        where: { id: payload.produtoId },
        data: { estoque: { decrement: payload.quantidade } },
      }),
      this.prisma.carrinho.update({
        where: { id: carrinho.id },
        data: {
          itens: {
            upsert: {
              where: {
                produtoId_carrinhoId: {
                  produtoId: payload.produtoId,
                  carrinhoId: carrinho.id,
                },
              },
              create: {
                produtoId: payload.produtoId,
                quantidade: payload.quantidade,
              },
              update: { quantidade: { increment: payload.quantidade } },
            },
          },
        },
        include: { itens: { include: { produto: true } } },
      }),
    ]);

    return carrinhoAtualizado;
  }
}
