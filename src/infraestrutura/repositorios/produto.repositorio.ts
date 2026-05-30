import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from 'src/dominios/produto/i-produto.repositorio';
import { PRISMA_CLIENTE } from '../constantes/injection-tokens.constante';

@Injectable()
export class ProdutoRepositorio implements IProdutoRepositorio {
  constructor(@Inject(PRISMA_CLIENTE) private readonly prisma: PrismaClient) {}

  public async atualizarProduto(
    id: string,
    dadosParaAtualizar: Partial<{ nome: string; preco: number }>,
  ): Promise<ProdutoEntidade> {
    return await this.prisma.produto.update({
      where: { id },
      data: dadosParaAtualizar,
    });
  }

  public async buscarProdutoPorId(id: string): Promise<ProdutoEntidade> {
    return (await this.prisma.produto.findUnique({
      where: { id },
    })) as ProdutoEntidade;
  }

  public async buscarProdutoPorNome(nome: string): Promise<ProdutoEntidade> {
    return (await this.prisma.produto.findUnique({
      where: { nome },
    })) as ProdutoEntidade;
  }

  public async criarProduto(
    dadosDoProduto: Omit<ProdutoEntidade, 'id'>,
  ): Promise<ProdutoEntidade> {
    return await this.prisma.produto.create({
      data: dadosDoProduto,
    });
  }

  public async removerProduto(id: string): Promise<void> {
    await this.prisma.produto.delete({
      where: { id },
    });
  }

  public listarProdutos(): Promise<ProdutoEntidade[]> {
    return this.prisma.produto.findMany();
  }
}
