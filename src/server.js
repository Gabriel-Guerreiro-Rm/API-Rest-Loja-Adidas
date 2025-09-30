const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem vindo! A API Loja da Adidas está no ar!');
});

app.get('/categorias', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { produtos: true },
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar as categorias' });
  }
});

app.get('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar a categoria' });
  }
});

app.post('/categorias', async (req, res) => {
  const { nome } = req.body;
  try {
    const novaCategoria = await prisma.categoria.create({
      data: { nome },
    });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a categoria' });
  }
});

app.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nome },
    });
    res.json(categoriaAtualizada);
  } catch (error) {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

app.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { categoria: true },
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os produtos' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
      include: { categoria: true },
    });
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar o produto' });
  }
});

app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, estoque, categoriaId } = req.body;
  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        estoque,
        categoriaId,
      },
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Não foi possível criar o produto' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque, categoriaId } = req.body;
  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        descricao,
        preco,
        estoque,
        categoriaId,
      },
    });
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});