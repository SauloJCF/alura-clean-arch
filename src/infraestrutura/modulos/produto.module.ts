import { Module } from '@nestjs/common';
import { ProdutoController } from '../../apresentacao/produto/produto.controller';
import { ListarProdutosCasoDeUso } from '../../dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { RepositorioModule } from './repositorio.module';
import { CriarProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/criar-produto.caso-de-uso';
import { BuscarProdutoPorIdCasoDeUso } from '../../dominios/produto/casos-de-uso/buscar-produto-por-id.caso-de-uso';
import { AtualizarProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/atualizar-produto.caso-de-uso';
import { RemoverProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/remover-produto.caso-de-uso';

@Module({
  imports: [RepositorioModule],
  controllers: [ProdutoController],
  providers: [
    ListarProdutosCasoDeUso,
    CriarProdutoCasoDeUso,
    BuscarProdutoPorIdCasoDeUso,
    AtualizarProdutoCasoDeUso,
    RemoverProdutoCasoDeUso,
  ],
})
export class ProdutoModule {}
