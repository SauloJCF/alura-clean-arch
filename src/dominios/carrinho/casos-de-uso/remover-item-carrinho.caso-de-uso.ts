import { obterOuCriarCarrinho } from '../servicos/carrinho.helper';
import { NotFoundException } from '@nestjs/common';
import { ICarrinhoRepositorio } from '../i-carrinho.repositorio';

export class RemoverItemCarrinhoCasoDeUso {
  constructor(private readonly carrinhoRepositorio: ICarrinhoRepositorio) {}

  public async executar(usuarioId: string, produtoId: string) {
    const carrinho = await obterOuCriarCarrinho(
      this.carrinhoRepositorio,
      usuarioId,
    );
    const itemNoCarrinho = carrinho.itens.find(
      (i) => i.produtoId === produtoId,
    );

    if (!itemNoCarrinho) {
      throw new NotFoundException(
        `Produto com ID ${produtoId} não está no carrinho.`,
      );
    }

    const carrinhoAtualizado =
      await this.carrinhoRepositorio.removerProdutoDoCarrinho(
        carrinho.id,
        produtoId,
        itemNoCarrinho,
      );

    return carrinhoAtualizado;
  }
}
