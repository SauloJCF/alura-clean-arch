import { PrismaClient } from '@prisma/client';
import {
  formatarCarrinho,
  obterOuCriarCarrinho,
} from '../servicos/carrinho.helper';

export class VerCarrinhoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(usuarioId: string) {
    const carrinho = await obterOuCriarCarrinho(this.prisma, usuarioId);
    return formatarCarrinho(carrinho);
  }
}
