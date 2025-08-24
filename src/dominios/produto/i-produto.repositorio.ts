import ProdutoEntidade from '../entidades/produto.entidade';

export abstract class IProdutoRepositorio {
  abstract listarProduto(): Promise<ProdutoEntidade[]>;
}
