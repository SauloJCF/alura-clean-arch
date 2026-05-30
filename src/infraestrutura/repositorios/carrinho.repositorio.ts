import { Inject, Injectable } from '@nestjs/common';
import { ICarrinhoRepositorio } from 'src/dominios/carrinho/i-carrinho.repositorio';
import { PRISMA_CLIENTE } from '../constantes/injection-tokens.constante';
import { PrismaClient } from '@prisma/client';
import {
  CarrinhoComItens,
  ItemCarrinhoComProduto,
} from 'src/dominios/carrinho/servicos/carrinho.helper';

@Injectable()
export class CarrinhoRepositorio implements ICarrinhoRepositorio {
  constructor(@Inject(PRISMA_CLIENTE) private readonly prisma: PrismaClient) {}

  public async adicionarProdutoAoCarrinho(
    carrinhoId: string,
    idDoProduto: string,
    quantidade: number,
  ): Promise<CarrinhoComItens> {
    const [, carrinhoAtualizado] = await this.prisma.$transaction([
      this.prisma.produto.update({
        where: { id: idDoProduto },
        data: { estoque: { decrement: quantidade } },
      }),
      this.prisma.carrinho.update({
        where: { id: carrinhoId },
        data: {
          itens: {
            upsert: {
              where: {
                produtoId_carrinhoId: {
                  produtoId: idDoProduto,
                  carrinhoId: carrinhoId,
                },
              },
              create: {
                produtoId: idDoProduto,
                quantidade: quantidade,
              },
              update: { quantidade: { increment: quantidade } },
            },
          },
        },
        include: { itens: { include: { produto: true } } },
      }),
    ]);

    return carrinhoAtualizado as CarrinhoComItens;
  }

  public async removerProdutoDoCarrinho(
    carrinhoId: string,
    idDoProduto: string,
    itemNoCarrinho: ItemCarrinhoComProduto,
  ): Promise<CarrinhoComItens> {
    const [, carrinhoAtualizado] = await this.prisma.$transaction([
      this.prisma.produto.update({
        where: { id: idDoProduto },
        data: { estoque: { increment: itemNoCarrinho.quantidade } },
      }),
      this.prisma.carrinho.update({
        where: { id: carrinhoId },
        data: {
          itens: {
            delete: { id: itemNoCarrinho.id },
          },
        },
        include: { itens: { include: { produto: true } } },
      }),
    ]);

    return carrinhoAtualizado as CarrinhoComItens;
  }

  public async criarCarrinhoParaUsuario(
    usuarioId: string,
  ): Promise<CarrinhoComItens> {
    return await this.prisma.carrinho.create({
      data: { usuarioId },
      include: { itens: { include: { produto: true } } },
    });
  }

  public async buscarCarrinhoPorUsuarioId(
    usuarioId: string,
  ): Promise<CarrinhoComItens | null> {
    return await this.prisma.carrinho.findUnique({
      where: { usuarioId },
      include: { itens: { include: { produto: true } } },
    });
  }
}
