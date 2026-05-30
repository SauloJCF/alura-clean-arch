import { Module } from '@nestjs/common';
import { CarrinhoController } from 'src/apresentacao/carrinho/carrinho.controller';
import { RepositorioModule } from './repositorio.module';
import { AdicionarItemCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/adicionar-item-carrinho.caso-de-uso';
import { RemoverItemCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/remover-item-carrinho.caso-de-uso';
import { VerCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/ver-carrinho.caso-de-uso';

@Module({
  imports: [RepositorioModule],
  controllers: [CarrinhoController],
  providers: [
    AdicionarItemCarrinhoCasoDeUso,
    RemoverItemCarrinhoCasoDeUso,
    VerCarrinhoCasoDeUso,
  ],
})
export class CarrinhoModule {}
