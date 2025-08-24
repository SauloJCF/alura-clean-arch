import ProdutoEntidade from '../entidades/produto.entidade';

export interface IProdutoRepositorio {
  listarProduto(): Promise<ProdutoEntidade>;
}
