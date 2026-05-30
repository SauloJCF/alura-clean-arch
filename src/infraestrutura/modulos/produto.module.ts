import { Module } from '@nestjs/common';
import { ProdutoController } from 'src/apresentacao/produto/produto.controller';
import { ListarProdutosCasoDeUso } from 'src/dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { RepositorioModule } from './repositorio.module';
import { AtualizarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/atualizar-produto.caso-de-uso';
import { BuscarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/buscar-produto.caso-de-uso';
import { CriarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/criar-produto.caso-de-uso';
import { RemoverProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/remover-produto.caso-de-uso';

@Module({
  imports: [RepositorioModule],
  controllers: [ProdutoController],
  providers: [
    AtualizarProdutoCasoDeUso,
    BuscarProdutoCasoDeUso,
    CriarProdutoCasoDeUso,
    ListarProdutosCasoDeUso,
    RemoverProdutoCasoDeUso,
  ],
})
export class ProdutoModule {}
