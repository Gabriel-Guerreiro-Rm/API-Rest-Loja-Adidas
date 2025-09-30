const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o seeding ...`);

  const categoriaCalcados = await prisma.categoria.create({
    data: {
      nome: 'Calçados',
    },
  });

  const categoriaRoupas = await prisma.categoria.create({
    data: {
      nome: 'Roupas',
    },
  });

  console.log('Categorias criadas.');

  await prisma.produto.create({
    data: {
      nome: 'Tênis Ultraboost 22',
      descricao: 'Tênis de corrida com retorno de energia.',
      preco: 799.99,
      estoque: 100,
      categoriaId: categoriaCalcados.id,
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Chinelo Adilette',
      descricao: 'Chinelo clássico para conforto diário.',
      preco: 199.99,
      estoque: 250,
      categoriaId: categoriaCalcados.id,
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Camiseta Essentials Logo',
      descricao: 'Camiseta de algodão com o logo da Adidas.',
      preco: 149.90,
      estoque: 300,
      categoriaId: categoriaRoupas.id,
    },
  });
  
  await prisma.produto.create({
    data: {
      nome: 'Jaqueta Corta-Vento',
      descricao: 'Jaqueta leve para proteção contra o vento.',
      preco: 349.99,
      estoque: 120,
      categoriaId: categoriaRoupas.id,
    },
  });

  console.log('Produtos criados.');
  console.log(`Seeding finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });