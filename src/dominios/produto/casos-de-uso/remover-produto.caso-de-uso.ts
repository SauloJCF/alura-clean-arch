import { PrismaClient } from '@prisma/client';
import { BuscarProdutoCasoDeUso } from './buscar-produto.caso-de-uso';

export class RemoverProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  public async executar(id: string) {
    await new BuscarProdutoCasoDeUso(this.prisma).executar(id);

    await this.prisma.produto.delete({ where: { id } });
  }
}
