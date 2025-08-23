import { PrismaClient } from '@prisma/client';
import { BuscarProdutoPorIdCasoDeUso } from './buscar-produto-por-id.caso-de-uso';

export class RemoverProdutoCasoDeUso {
  constructor(private readonly prisma: PrismaClient) {}

  async executar(id: string): Promise<void> {
    const buscar = new BuscarProdutoPorIdCasoDeUso(this.prisma);
    await buscar.executar(id);
    await this.prisma.produto.delete({ where: { id } });
  }
}
