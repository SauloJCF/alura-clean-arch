import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ProdutoEntidade from '../../entidades/produto.entidade';
import { IProdutoRepositorio } from '../i-produto.repositorio';

@Injectable()
export class AtualizarProdutoCasoDeUso {
  constructor(private readonly produtoRepositorio: IProdutoRepositorio) {}

  async executar(
    id: string,
    dadosParaAtualizar: Partial<Omit<ProdutoEntidade, 'id'>>,
  ): Promise<ProdutoEntidade> {
    if (!dadosParaAtualizar || Object.keys(dadosParaAtualizar).length === 0) {
      throw new BadRequestException(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }

    const existente = await this.produtoRepositorio.buscarPorId(id);
    if (!existente) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return this.produtoRepositorio.atualizarProduto(id, dadosParaAtualizar);
  }
}
