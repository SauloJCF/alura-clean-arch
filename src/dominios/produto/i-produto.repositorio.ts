import ProdutoEntidade from '../entidades/produto.entidade';

// export interface IProdutoRepository {
//   listarProdutos(): Promise<ProdutoEntidade[]>;
// }

export abstract class IProdutoRepositorio {
  abstract listarProdutos(): Promise<ProdutoEntidade[]>;
  abstract atualizarProduto(
    id: string,
    dadosParaAtualizar: Partial<{ nome: string; preco: number }>,
  ): Promise<ProdutoEntidade>;
  abstract criarProduto(
    dadosDoProduto: Omit<ProdutoEntidade, 'id'>,
  ): Promise<ProdutoEntidade>;
  abstract removerProduto(id: string): Promise<void>;
  abstract buscarProdutoPorId(id: string): Promise<ProdutoEntidade>;
  abstract buscarProdutoPorNome(nome: string): Promise<ProdutoEntidade>;
}
