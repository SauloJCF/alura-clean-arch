import { Injectable, NotFoundException } from '@nestjs/common';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class BuscarProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  public async executar(id: string): Promise<ProdutoEntidade> {
    const produto = await this.produtoRepositorio.buscarProdutoPorId(id);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }
}
