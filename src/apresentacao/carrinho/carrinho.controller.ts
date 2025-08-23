import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import AdicionarItemCarrinhoDto from '../item-carrinho/dto/adicionar-item-carrinho.dto';
import { AdicionarItemCarrinhoCasoDeUso } from '../../dominios/carrinho/casos-de-uso/adicionar-item-carrinho.caso-de-uso';
import { VerCarrinhoCasoDeUso } from '../../dominios/carrinho/casos-de-uso/ver-carrinho.caso-de-uso';
import { RemoverItemCarrinhoCasoDeUso } from '../../dominios/carrinho/casos-de-uso/remover-item-carrinho.caso-de-uso';

@ApiTags('carrinho')
@Controller('carrinho')
export class CarrinhoController {
  // Instanciação direta do PrismaClient.
  private readonly prisma = new PrismaClient();
  // ID do usuário fixo para simulação do carrinho.
  private readonly usuarioId = 'usuario-123';

  // --- MÉTODOS DO CONTROLLER DE PRODUTOS ---

  // --- MÉTODOS DO CONTROLLER DE CARRINHO ---

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
    const casoDeUso = new AdicionarItemCarrinhoCasoDeUso(this.prisma);
    return casoDeUso.executar(this.usuarioId, itemDto);
  }

  @ApiOperation({ summary: 'Ver carrinho atual' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho retornado com sucesso',
  })
  @Get('carrinho')
  async verCarrinho() {
    const casoDeUso = new VerCarrinhoCasoDeUso(this.prisma);
    return casoDeUso.executar(this.usuarioId);
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
    const casoDeUso = new RemoverItemCarrinhoCasoDeUso(this.prisma);
    return casoDeUso.executar(this.usuarioId, produtoId);
  }
}
