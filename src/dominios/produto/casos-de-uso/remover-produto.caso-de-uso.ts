import { BuscarProdutoCasoDeUso } from './buscar-produto.caso-de-uso';
import { Injectable } from '@nestjs/common';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class RemoverProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  public async executar(id: string) {
    await new BuscarProdutoCasoDeUso(this.produtoRepositorio).executar(id);

    await this.produtoRepositorio.removerProduto(id);
  }
}
