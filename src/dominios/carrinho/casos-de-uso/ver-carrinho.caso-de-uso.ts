import { PrismaClient } from '@prisma/client';
import {
  CarrinhoFormatado,
  formatarCarrinho,
  obterOuCriarCarrinho,
} from '../servicos/carrinho.helper';

export class VerCarrinhoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(usuarioId: string): Promise<CarrinhoFormatado> {
    const carrinho = await obterOuCriarCarrinho(this.prisma, usuarioId);
    return formatarCarrinho(carrinho as any);
  }
}
