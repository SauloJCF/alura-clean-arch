import { Module } from '@nestjs/common';
import { ProdutoRepositorio } from '../repositorios/produto.repositorio';
import { IProdutoRepositorio } from '../../dominios/produto/i-produto.repositorio';
import { PRISMA_CLIENT } from '../constantes/injection-tokens.const';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_CLIENT,
      useFactory: () => {
        return new PrismaClient();
      },
    },
    { provide: IProdutoRepositorio, useClass: ProdutoRepositorio },
  ],
  exports: [IProdutoRepositorio],
})
export class RepositorioModule {}
