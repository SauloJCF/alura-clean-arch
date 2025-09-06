import { Injectable, NotFoundException } from '@nestjs/common';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class RemoverProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  async executar(id: string): Promise<void> {
    const existente = await this.produtoRepositorio.buscarPorId(id);
    if (!existente) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    await this.produtoRepositorio.removerProduto(id);
  }
}
