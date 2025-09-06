import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../../dominios/produto/i-produto.repositorio';
import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '../constantes/injection-tokens.const';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProdutoRepositorio implements IProdutoRepositorio {
  public constructor(
    @Inject(PRISMA_CLIENT) private readonly prismaClient: PrismaClient,
  ) {}

  listarProduto(): Promise<ProdutoEntidade[]> {
    return this.prismaClient.produto.findMany();
  }

  buscarPorId(id: string): Promise<ProdutoEntidade | null> {
    return this.prismaClient.produto.findUnique({ where: { id } });
  }

  buscarPorNome(nome: string): Promise<ProdutoEntidade | null> {
    return this.prismaClient.produto.findUnique({ where: { nome } });
  }

  criarProduto(dados: Omit<ProdutoEntidade, 'id'>): Promise<ProdutoEntidade> {
    return this.prismaClient.produto.create({ data: dados });
  }

  atualizarProduto(
    id: string,
    dados: Partial<Omit<ProdutoEntidade, 'id'>>,
  ): Promise<ProdutoEntidade> {
    return this.prismaClient.produto.update({
      where: { id },
      data: dados,
    });
  }

  async removerProduto(id: string): Promise<void> {
    await this.prismaClient.produto.delete({ where: { id } });
  }
}
