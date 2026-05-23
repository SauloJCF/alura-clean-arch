import { Module } from '@nestjs/common';
import { ProdutoController } from 'src/apresentacao/produto/produto.controller';
import { ListarProdutosCasoDeUso } from 'src/dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { RepositorioModule } from './repositorio.module';

@Module({
  imports: [RepositorioModule],
  controllers: [ProdutoController],
  providers: [ListarProdutosCasoDeUso],
})
export class ProdutoModule {}
