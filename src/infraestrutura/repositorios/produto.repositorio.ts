import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from 'src/dominios/produto/i-produto.repositorio';
import { PRISMA_CLIENTE } from '../constantes/injection-tokens.constante';

@Injectable()
export class ProdutoRepositorio implements IProdutoRepositorio {
  constructor(@Inject(PRISMA_CLIENTE) private readonly prisma: PrismaClient) {}

  public listarProdutos(): Promise<ProdutoEntidade[]> {
    return this.prisma.produto.findMany();
  }
}
