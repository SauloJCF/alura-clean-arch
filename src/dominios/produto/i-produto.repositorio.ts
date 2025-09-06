import ProdutoEntidade from '../entidades/produto.entidade';

export abstract class IProdutoRepositorio {
  abstract listarProduto(): Promise<ProdutoEntidade[]>;
  abstract buscarPorId(id: string): Promise<ProdutoEntidade | null>;
  abstract buscarPorNome(nome: string): Promise<ProdutoEntidade | null>;
  abstract criarProduto(dados: Omit<ProdutoEntidade, 'id'>): Promise<ProdutoEntidade>;
  abstract atualizarProduto(
    id: string,
    dados: Partial<Omit<ProdutoEntidade, 'id'>>,
  ): Promise<ProdutoEntidade>;
  abstract removerProduto(id: string): Promise<void>;
}
