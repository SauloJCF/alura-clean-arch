import { Module } from '@nestjs/common';
import { ProdutoController } from '../../apresentacao/produto/produto.controller';
import { ListarProdutosCasoDeUso } from '../../dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { RepositorioModule } from './repositorio.module';

@Module({
  imports: [RepositorioModule],
  controllers: [ProdutoController],
  providers: [ListarProdutosCasoDeUso],
})
export class ProdutoModule {}
