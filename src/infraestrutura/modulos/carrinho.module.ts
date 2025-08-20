import { Module } from '@nestjs/common';
import { CarrinhoController } from '../../apresentacao/carrinho/carrinho.controller';

@Module({
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
