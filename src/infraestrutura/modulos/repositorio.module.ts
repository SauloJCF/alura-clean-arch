import { Module } from '@nestjs/common';
import { ProdutoRepositorio } from '../repositorios/produto.repositorio';
import { IProdutoRepositorio } from 'src/dominios/produto/i-produto.repositorio';
import { PRISMA_CLIENTE } from '../constantes/injection-tokens.constante';
import { PrismaClient } from '@prisma/client';

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
  ],
  exports: [IProdutoRepositorio],
})
export class RepositorioModule {}
