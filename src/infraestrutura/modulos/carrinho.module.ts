import { Module } from '@nestjs/common';
import { CarrinhoController } from 'src/apresentacao/carrinho/carrinho.controller';

@Module({
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
