import {
  formatarCarrinho,
  obterOuCriarCarrinho,
} from '../servicos/carrinho.helper';
import { ICarrinhoRepositorio } from '../i-carrinho.repositorio';

export class VerCarrinhoCasoDeUso {
  constructor(private readonly carrinhoRepositorio: ICarrinhoRepositorio) {}

  public async executar(usuarioId: string) {
    const carrinho = await obterOuCriarCarrinho(
      this.carrinhoRepositorio,
      usuarioId,
    );
    return formatarCarrinho(carrinho);
  }
}
