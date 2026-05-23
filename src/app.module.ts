import { Module } from '@nestjs/common';
import { ProdutoModule } from './infraestrutura/modulos/produto.module';
import { CarrinhoModule } from './infraestrutura/modulos/carrinho.module';
@Module({
  imports: [ProdutoModule, CarrinhoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
