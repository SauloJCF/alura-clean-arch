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
}
