import { Module } from '@nestjs/common';
import { ProdutoController } from '../../apresentacao/produto/produto.controller';

@Module({
  controllers: [ProdutoController],
})
export class ProdutoModule {}
