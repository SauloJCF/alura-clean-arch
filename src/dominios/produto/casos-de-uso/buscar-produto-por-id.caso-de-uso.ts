import { Injectable, NotFoundException } from '@nestjs/common';
import ProdutoEntidade from '../../entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class BuscarProdutoPorIdCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  async executar(id: string): Promise<ProdutoEntidade> {
    const produto = await this.produtoRepositorio.buscarPorId(id);
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }
}
