import ProdutoEntidade from '../../entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

export class ListarProdutosCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  async executar(): Promise<ProdutoEntidade[]> {
    return this.produtoRepositorio.listarProduto();
  }
}
