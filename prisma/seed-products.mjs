import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL es obligatorio para cargar el catálogo')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

const catalog = [
  {
    category: 'Capilar',
    products: [
      ['Aceite de coco', 16500],
      ['Acond Aguacalma Cacao', 14700, true],
      ['Acond Aguacalma Cítrico', 14700, true],
      ['Acond Aguacalma Lavanda', 14700],
      ['Acond Aguacalma Romero', 14700, true],
      ['Acond Terra', 12900],
      ['Crema para peinar', 15900],
      ['Crema para peinar Repuesto', 13200],
      ['Peine grande', 8300],
      ['Peine pequeño', 7500],
      ['Shampoo Aguacalma Cítrico', 14700],
      ['Shampoo Aguacalma Lavanda', 14700],
      ['Shampoo Aguacalma Romero', 14700],
      ['Shampoo Aguacalma Tea tree', 14700],
    ],
  },
  {
    category: 'Cuidado facial',
    products: [
      ['Agua de rosas', 7500],
      ['Bálsamo Vainilla', 8900],
      ['Barra limpieza Caléndula', 11700],
      ['Barra limpieza Caolín', 11700],
      ['Barra limpieza Carbón', 11700],
      ['Emulsión limpieza', 16600],
      ['Emulsión limpieza Repuesto', 14600, true],
      ['Mascarilla Arcilla Blanca', 7200, true],
      ['Mascarilla Arcilla Roja', 7200],
      ['Mascarilla Arcilla Verde', 7200],
      ['Mascarilla Carbón activado', 7200],
    ],
  },
  {
    category: 'Complementos',
    products: [
      ['Almohadilla térmica', 8000],
      ['Billeteras', 7600],
      ['Disco desmaquillante polar', 1300],
      ['Disco desmaquillante toalla', 1300],
      ['Hoja Gillette', 4500],
      ['Jabonera', 5000],
      ['Maggacup T1', 17500],
      ['Maggacup T2', 17500],
      ['Par discos lactancia', 3500],
      ['Rasuradora', 12000],
    ],
  },
  {
    category: 'Cocina',
    products: [
      ['Bolsa filtro', 6000],
      ['Bolsa granel', 3200],
      ['Sorbete Acero', 2500],
      ['Sorbete Aluminio', 1000],
    ],
  },
  {
    category: 'Corporal',
    products: [
      ['Bronceador', 9900, true],
      ['Desodorante Aguacalma Cítrico', 15200],
      ['Desodorante Aguacalma Lavanda', 15200],
      ['Desodorante Aguacalma Tea tree', 15200],
      ['Desodorante Terra Lavanda', 8600],
      ['Jabón Artesanal', 6000],
      ['Jabón Terra', 5500],
      ['Pasta dental Aguacalma', 12000],
      ['Pasta dental Repuesto', 10900, true],
      ['Polvo dental Terra', 10800],
      ['Sunstick físico', 25500],
    ],
  },
  {
    category: 'Cepillos',
    products: [
      ['Cepillo dientes Duro', 3200, true],
      ['Cepillo dientes Kids', 3200],
      ['Cepillo dientes Medio', 3200],
      ['Cepillo dientes Suave', 3200, true],
      ['Cepillo Espalda', 19500],
      ['Cepillo multi circular', 10400],
      ['Cepillo multi rectangular', 8900],
      ['Cepillo Sorbetes', 3000],
    ],
  },
  {
    category: 'Cremas',
    products: [
      ['Crema corporal Calmante', 18400],
      ['Crema corporal Reparadora', 18400],
      ['Crema corporal Revitalizante', 18400, true],
      ['Crema facial Hamamelis', 17000],
      ['Crema facial Jojoba', 17000],
      ['Crema facial Rosa mosqueta', 17000],
      ['Repuesto corporal Calmante', 15200, true],
      ['Repuesto corporal Reparadora', 15200],
      ['Repuesto corporal Revitalizante', 15200],
      ['Repuesto facial Hamamelis', 13800],
      ['Repuesto facial Jojoba', 13800, true],
      ['Repuesto facial Rosa mosqueta', 13800],
    ],
  },
  {
    category: 'Protectores diarios',
    products: [
      ['EcoLuna Con PUL Classic', 5300],
      ['EcoLuna Con PUL Less', 5300],
      ['EcoLuna Sin PUL Classic', 4800],
      ['EcoLuna Sin PUL Less', 4800],
      ['Paloma Protector Adapt', 4600],
      ['Paloma Protector Normal', 4600],
    ],
  },
  {
    category: 'Toallitas',
    products: [
      ['EcoLuna Intensa Classic', 7500],
      ['EcoLuna Intensa Less', 7500],
      ['EcoLuna Nocturna', 7800],
      ['EcoLuna Regular Classic', 6700],
      ['EcoLuna Regular Less', 6700],
      ['Kit Lunita', 22500],
      ['Paloma Día Adapt', 6000],
      ['Paloma Día Normal', 6000],
      ['Paloma Nocturna', 6700],
      ['Paloma XL', 7400],
    ],
  },
  {
    category: 'Sin categoría',
    products: [['Esponja', 3000]],
  },
  {
    category: 'Bee wraps',
    products: [
      ['Pack Cardo', 20900],
      ['Pack Diente de león', 11000],
      ['Pack Flor de trébol', 12400],
      ['Pack Lavanda', 17300],
      ['Pack Mix Abeja', 20300],
      ['Pack Mix Abejorro', 22200],
      ['Pack Salvia', 14400],
    ],
  },
  {
    category: 'Sérum',
    products: [
      ['Sérum Aguacalma Hidratante', 18800],
      ['Sérum Aguacalma Repuesto', 16800],
      ['Sérum Terra Vitalizante', 15800],
    ],
  },
]

async function main() {
  const ecoTag = await prisma.tag.upsert({
    where: { name: 'ecofriendly' },
    update: {},
    create: { name: 'ecofriendly' },
  })
  const outOfStockTag = await prisma.tag.upsert({
    where: { name: 'sin stock' },
    update: {},
    create: { name: 'sin stock' },
  })

  let productCount = 0

  for (const section of catalog) {
    const category = await prisma.category.upsert({
      where: { name: section.category },
      update: {
        description: `Productos ecofriendly de ${section.category.toLowerCase()}.`,
      },
      create: {
        name: section.category,
        description: `Productos ecofriendly de ${section.category.toLowerCase()}.`,
      },
    })

    for (const [name, price, isOutOfStock = false] of section.products) {
      const tags = isOutOfStock ? [ecoTag, outOfStockTag] : [ecoTag]
      const costPrice = Number((price / 1.75).toFixed(2))

      await prisma.product.upsert({
        where: { name },
        update: {
          price,
          costPrice,
          stock: 0,
          categoryId: category.id,
          tags: { set: tags.map(({ id }) => ({ id })) },
        },
        create: {
          name,
          description: `Producto ecofriendly de la categoría ${section.category}.`,
          price,
          costPrice,
          stock: 0,
          minStock: 5,
          categoryId: category.id,
          tags: { connect: tags.map(({ id }) => ({ id })) },
        },
      })

      productCount += 1
    }
  }

  console.log(
    `Catálogo ecofriendly cargado: ${productCount} productos, ${catalog.length} categorías.`,
  )
}

try {
  await main()
} finally {
  await prisma.$disconnect()
}
