import { Module } from '@nestjs/common';
import { ProdutoController } from 'src/apresentacao/produto/produto.controller';

@Module({
  controllers: [ProdutoController],
})
export class ProdutoModule {}
