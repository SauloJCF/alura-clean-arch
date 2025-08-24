import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../../dominios/produto/i-produto.repositorio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepositorio implements IProdutoRepositorio {
  public constructor() {}

  listarProduto(): Promise<ProdutoEntidade> {
    throw new Error('Method not implemented.');
  }
}
