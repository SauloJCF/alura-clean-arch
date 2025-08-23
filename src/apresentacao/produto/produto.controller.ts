import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CriarProdutoDto from './dto/criar-produto.dto';
import AtualizarProdutoDto from './dto/atualizar-produto.dto';
import { PrismaClient } from '@prisma/client';
import { CriarProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/criar-produto.caso-de-uso';
import { ListarProdutosCasoDeUso } from '../../dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { BuscarProdutoPorIdCasoDeUso } from '../../dominios/produto/casos-de-uso/buscar-produto-por-id.caso-de-uso';
import { AtualizarProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/atualizar-produto.caso-de-uso';
import { RemoverProdutoCasoDeUso } from '../../dominios/produto/casos-de-uso/remover-produto.caso-de-uso';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  // Instanciação direta do PrismaClient.
  private readonly prisma = new PrismaClient();

  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe um produto com este nome',
  })
  @Post('produtos')
  async criarProduto(@Body() dadosDoProduto: CriarProdutoDto) {
    const criarProdutoCasoDeUso = new CriarProdutoCasoDeUso(this.prisma);

    const produto = await criarProdutoCasoDeUso.executar(dadosDoProduto);

    return { mensagem: 'Produto criado com sucesso!', produto };
  }

  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
  })
  @Get('produtos')
  async listarTodos() {
    const casoDeUso = new ListarProdutosCasoDeUso(this.prisma);
    return casoDeUso.executar();
  }

  @ApiOperation({ summary: 'Obter um produto específico' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  @Get('produtos/:id')
  async buscarProdutoPorId(@Param('id') id: string) {
    const casoDeUso = new BuscarProdutoPorIdCasoDeUso(this.prisma);
    return casoDeUso.executar(id);
  }

  @ApiOperation({ summary: 'Atualizar um produto existente' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualização',
  })
  @Put('produtos/:id')
  async atualizarProduto(
    @Param('id') id: string,
    @Body() dadosParaAtualizar: AtualizarProdutoDto,
  ) {
    const casoDeUso = new AtualizarProdutoCasoDeUso(this.prisma);
    const produtoAtualizado = await casoDeUso.executar(id, dadosParaAtualizar);
    return { mensagem: 'Produto atualizado!', produto: produtoAtualizado };
  }

  @ApiOperation({ summary: 'Remover um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 204,
    description: 'Produto removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  @Delete('produtos/:id')
  @HttpCode(204)
  async removerProduto(@Param('id') id: string) {
    const casoDeUso = new RemoverProdutoCasoDeUso(this.prisma);
    await casoDeUso.executar(id);
  }
}
