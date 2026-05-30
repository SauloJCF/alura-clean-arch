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
import { PrismaClient } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import CriarProdutoDto from './dto/criar-produto.dto';
import AtualizarProdutoDto from './dto/atualizar-produto.dto';
import { CriarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/criar-produto.caso-de-uso';
import { ListarProdutosCasoDeUso } from 'src/dominios/produto/casos-de-uso/listar-produtos.caso-de-uso';
import { BuscarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/buscar-produto.caso-de-uso';
import { AtualizarProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/atualizar-produto.caso-de-uso';
import { RemoverProdutoCasoDeUso } from 'src/dominios/produto/casos-de-uso/remover-produto.caso-de-uso';

@ApiTags('produtos')
@Controller('produto')
export class ProdutoController {
  constructor(
    private readonly criarProdutoCasoDeUso: CriarProdutoCasoDeUso,
    private readonly listarProdutosCasoDeUso: ListarProdutosCasoDeUso,
    private readonly buscarProdutoCasoDeUso: BuscarProdutoCasoDeUso,
    private readonly atualizarProdutoCasoDeUso: AtualizarProdutoCasoDeUso,
    private readonly removerProdutoCasoDeUso: RemoverProdutoCasoDeUso,
  ) {}

  // Instanciação direta do PrismaClient.
  private readonly prisma = new PrismaClient();
  // ID do usuário fixo para simulação do carrinho.
  private readonly usuarioId = 'usuario-123';

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
    const produto = await this.criarProdutoCasoDeUso.executar(dadosDoProduto);

    return { mensagem: 'Produto criado com sucesso!', produto };
  }

  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
  })
  @Get('produtos')
  async listarTodos() {
    return await this.listarProdutosCasoDeUso.executar();
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
    const produto = await this.buscarProdutoCasoDeUso.executar(id);

    return produto;
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
    const produtoAtualizado = await this.atualizarProdutoCasoDeUso.executar(
      id,
      dadosParaAtualizar,
    );

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
    await this.removerProdutoCasoDeUso.executar(id);
  }
}
