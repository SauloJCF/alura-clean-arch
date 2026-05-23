import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import AdicionarItemCarrinhoDto from '../item-carrinho/dto/adicionar-item-carrinho.dto';
import { AdicionarItemCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/adicionar-item-carrinho.caso-de-uso';
import { VerCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/ver-carrinho.caso-de-uso';
import { RemoverItemCarrinhoCasoDeUso } from 'src/dominios/carrinho/casos-de-uso/remover-item-carrinho.caso-de-uso';
import { formatarCarrinho } from 'src/dominios/carrinho/servicos/carrinho.helper';

@ApiTags('carrinho')
@Controller('carrinho')
export class CarrinhoController {
  // Instanciação direta do PrismaClient.
  private readonly prisma = new PrismaClient();
  // ID do usuário fixo para simulação do carrinho.
  private readonly usuarioId = 'usuario-123';

  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({
    status: 200,
    description: 'Item adicionado ao carrinho com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Estoque insuficiente',
  })
  @Post('carrinho/adicionar')
  async adicionarItem(@Body() itemDto: AdicionarItemCarrinhoDto) {
    const adicionarItemCarrinhoCasoDeUso = new AdicionarItemCarrinhoCasoDeUso(
      this.prisma,
    );
    const carrinhoAtualizado = await adicionarItemCarrinhoCasoDeUso.executar(
      this.usuarioId,
      itemDto,
    );

    return {
      mensagem: 'Item adicionado ao carrinho!',
      carrinho: formatarCarrinho(carrinhoAtualizado),
    };
  }

  @ApiOperation({ summary: 'Ver carrinho atual' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho retornado com sucesso',
  })
  @Get('carrinho')
  async verCarrinho() {
    const verCarrinhoCasoDeUso = new VerCarrinhoCasoDeUso(this.prisma);
    return await verCarrinhoCasoDeUso.executar(this.usuarioId);
  }

  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiParam({ name: 'produtoId', description: 'ID do produto a ser removido' })
  @ApiResponse({
    status: 200,
    description: 'Item removido do carrinho com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não está no carrinho',
  })
  @Delete('carrinho/remover/:produtoId')
  async removerItem(@Param('produtoId') produtoId: string) {
    const removerItemCarrinhoCasoDeUso = new RemoverItemCarrinhoCasoDeUso(
      this.prisma,
    );

    const carrinhoAtualizado = await removerItemCarrinhoCasoDeUso.executar(
      this.usuarioId,
      produtoId,
    );

    return {
      mensagem: 'Item removido do carrinho!',
      carrinho: formatarCarrinho(carrinhoAtualizado),
    };
  }
}
