import {
  CarrinhoComItens,
  ItemCarrinhoComProduto,
} from './servicos/carrinho.helper';

export abstract class ICarrinhoRepositorio {
  abstract adicionarProdutoAoCarrinho(
    carrinhoId: string,
    idDoProduto: string,
    quantidade: number,
  ): Promise<CarrinhoComItens>;

  abstract removerProdutoDoCarrinho(
    carrinhoId: string,
    idDoProduto: string,
    itemNoCarrinho: ItemCarrinhoComProduto,
  ): Promise<CarrinhoComItens>;

  abstract criarCarrinhoParaUsuario(
    usuarioId: string,
  ): Promise<CarrinhoComItens>;

  abstract buscarCarrinhoPorUsuarioId(
    usuarioId: string,
  ): Promise<CarrinhoComItens | null>;
}
