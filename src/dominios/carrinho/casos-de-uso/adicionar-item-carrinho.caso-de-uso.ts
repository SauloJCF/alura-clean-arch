import { IProdutoRepositorio } from 'src/dominios/produto/i-produto.repositorio';
import { ICarrinhoRepositorio } from '../i-carrinho.repositorio';
import { obterOuCriarCarrinho } from '../servicos/carrinho.helper';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export type AdicionarItemPayload = {
  produtoId: string;
  quantidade: number;
};

export class AdicionarItemCarrinhoCasoDeUso {
  constructor(
    private readonly carrinhoRepositorio: ICarrinhoRepositorio,
    private readonly produtoRepositorio: IProdutoRepositorio,
  ) {}

  public async executar(usuarioId: string, payload: AdicionarItemPayload) {
    const carrinho = await obterOuCriarCarrinho(
      this.carrinhoRepositorio,
      usuarioId,
    );

    const produto = await this.produtoRepositorio.buscarProdutoPorId(
      payload.produtoId,
    );

    if (!produto) {
      throw new NotFoundException(
        `Produto com ID ${payload.produtoId} não encontrado.`,
      );
    }

    if (produto.estoque < payload.quantidade) {
      throw new BadRequestException(
        `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}.`,
      );
    }

    const carrinhoAtualizado =
      await this.carrinhoRepositorio.adicionarProdutoAoCarrinho(
        carrinho.id,
        payload.produtoId,
        payload.quantidade,
      );

    return carrinhoAtualizado;
  }
}
