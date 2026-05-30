import { BuscarProdutoCasoDeUso } from './buscar-produto.caso-de-uso';
import { BadRequestException, Injectable } from '@nestjs/common';
import ProdutoEntidade from 'src/dominios/entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class AtualizarProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  public async executar(
    id: string,
    dadosParaAtualizar: Partial<{ nome: string; preco: number }>,
  ): Promise<ProdutoEntidade> {
    await new BuscarProdutoCasoDeUso(this.produtoRepositorio).executar(id);

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new BadRequestException(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }

    const produtoAtualizado = await this.produtoRepositorio.atualizarProduto(
      id,
      dadosParaAtualizar,
    );

    return produtoAtualizado;
  }
}
