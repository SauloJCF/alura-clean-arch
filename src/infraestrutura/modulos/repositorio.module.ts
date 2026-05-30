import { Module } from '@nestjs/common';
import { ProdutoRepositorio } from '../repositorios/produto.repositorio';
import { IProdutoRepositorio } from 'src/dominios/produto/i-produto.repositorio';
import { PRISMA_CLIENTE } from '../constantes/injection-tokens.constante';
import { PrismaClient } from '@prisma/client';
import { ICarrinhoRepositorio } from 'src/dominios/carrinho/i-carrinho.repositorio';
import { CarrinhoRepositorio } from '../repositorios/carrinho.repositorio';

@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_CLIENTE,
      useFactory: () => {
        return new PrismaClient();
      },
    },
    { provide: IProdutoRepositorio, useClass: ProdutoRepositorio },
    { provide: ICarrinhoRepositorio, useClass: CarrinhoRepositorio },
  ],
  exports: [IProdutoRepositorio],
})
export class RepositorioModule {}
