import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrinhoModule } from './infraestrutura/modulos/carrinho.module';
import { ProdutoModule } from './infraestrutura/modulos/produto.module';

@Module({
  imports: [CarrinhoModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
