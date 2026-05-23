import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarProdutosCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  public async executar(): Promise<ProdutoEntidade[]> {
    return this.produtoRepositorio.listarProdutos();
  }
}
