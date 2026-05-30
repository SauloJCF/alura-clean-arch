import { ICarrinhoRepositorio } from '../i-carrinho.repositorio';

export type CarrinhoFormatado = {
  id: string;
  usuarioId: string;
  itens: Array<{
    produtoId: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    totalItem: number;
  }>;
  total: number;
};

export async function obterOuCriarCarrinho(
  carrinhoRepositorio: ICarrinhoRepositorio,
  usuarioId: string,
) {
  let carrinho =
    await carrinhoRepositorio.buscarCarrinhoPorUsuarioId(usuarioId);

  if (!carrinho) {
    carrinho = await carrinhoRepositorio.criarCarrinhoParaUsuario(usuarioId);
  }
  return carrinho;
}

type ProdutoMin = { nome: string; preco: number };
export type ItemCarrinhoComProduto = {
  id: string;
  produtoId: string;
  quantidade: number;
  produto: ProdutoMin;
};
export type CarrinhoComItens = {
  id: string;
  usuarioId: string;
  itens: ItemCarrinhoComProduto[];
};

export function formatarCarrinho(
  carrinho: CarrinhoComItens,
): CarrinhoFormatado {
  const total = carrinho.itens.reduce(
    (acc: number, item: ItemCarrinhoComProduto) => {
      return acc + item.quantidade * item.produto.preco;
    },
    0,
  );

  return {
    id: carrinho.id,
    usuarioId: carrinho.usuarioId,
    itens: carrinho.itens.map((i: ItemCarrinhoComProduto) => ({
      produtoId: i.produtoId,
      nome: i.produto.nome,
      quantidade: i.quantidade,
      precoUnitario: i.produto.preco,
      totalItem: i.quantidade * i.produto.preco,
    })),
    total,
  };
}
