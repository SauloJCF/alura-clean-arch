import { Module } from '@nestjs/common';

import { CarrinhoModule } from './infraestrutura/modulos/carrinho.module';
import { ProdutoModule } from './infraestrutura/modulos/produto.module';

@Module({
  imports: [CarrinhoModule, ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
