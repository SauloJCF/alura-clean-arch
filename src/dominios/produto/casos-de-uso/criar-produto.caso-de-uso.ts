import { ConflictException, Injectable } from '@nestjs/common';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class CriarProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  public async executar(
    dadosDoProduto: Omit<ProdutoEntidade, 'id'>,
  ): Promise<ProdutoEntidade> {
    const produtoExistente = await this.produtoRepositorio.buscarProdutoPorNome(
      dadosDoProduto.nome,
    );

    if (produtoExistente) {
      throw new ConflictException('Já existe um produto com este nome.');
    }

    return this.produtoRepositorio.criarProduto(dadosDoProduto);
  }
}
