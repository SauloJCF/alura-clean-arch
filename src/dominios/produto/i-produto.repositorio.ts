import ProdutoEntidade from '../entidades/produto.entidade';

// export interface IProdutoRepository {
//   listarProdutos(): Promise<ProdutoEntidade[]>;
// }

export abstract class IProdutoRepositorio {
  abstract listarProdutos(): Promise<ProdutoEntidade[]>;
}
