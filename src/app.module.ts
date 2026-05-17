import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './infraestrutura/modulos/produto.module';
import { CarrinhoModule } from './infraestrutura/modulos/carrinho.module';
@Module({
  imports: [ProdutoModule, CarrinhoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
