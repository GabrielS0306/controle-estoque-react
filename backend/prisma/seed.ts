import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Camiseta Essential', category: 'Vestuário', sku: 'CAM-001', stock: 42, minimum: 12, price: 79.9 },
  { name: 'Tênis Urban', category: 'Calçados', sku: 'TEN-024', stock: 8, minimum: 10, price: 249.9 },
  { name: 'Mochila Daily', category: 'Acessórios', sku: 'MOC-015', stock: 18, minimum: 8, price: 159.9 },
  { name: 'Jaqueta Puffer', category: 'Vestuário', sku: 'JAQ-008', stock: 3, minimum: 6, price: 329.9 },
  { name: 'Boné Classic', category: 'Acessórios', sku: 'BON-017', stock: 27, minimum: 10, price: 69.9 },
]

async function main() {
  for (const product of products) {
    await prisma.product.upsert({ where: { sku: product.sku }, update: {}, create: product })
  }
}

main().then(() => prisma.$disconnect()).catch(async error => { console.error(error); await prisma.$disconnect(); process.exit(1) })
