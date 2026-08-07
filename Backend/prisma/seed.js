// seed.js — seeds the 3 L-Series products into the DB

const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const products = [
  {
    name: 'L250',
    tagline: 'Entry-level thin client with VGA output',
    price: 4999,
    videoPort: 'VGA',
    maxResolution: '1440x900',
    usbPorts: '1x USB 2.0',
  },
  {
    name: 'L300',
    tagline: 'Full HD thin client, dual USB ports',
    price: 6499,
    videoPort: 'VGA',
    maxResolution: '1920x1080',
    usbPorts: '2x USB 2.0',
  },
  {
    name: 'L350',
    tagline: 'High-resolution DVI-D output for demanding displays',
    price: 7999,
    videoPort: 'DVI-D',
    maxResolution: '1920x1200',
    usbPorts: '2x USB 2.0',
  },
];

async function main() {
  console.log('Seeding products...');
  for (const p of products) {
    await db.product.upsert({
      where: { name: p.name },
      update: p,
      create: p,
    });
  }
  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
