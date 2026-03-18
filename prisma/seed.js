import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = [
  {
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    category: 'Fantasy',
    description: 'A dreamlike duel between two magicians unfolds inside a wandering black-and-white circus.',
    year: 2011,
    pages: 387,
    coverColor: 'from-slate-900 to-slate-700'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Science Fiction',
    description: 'A lone astronaut wakes up far from Earth and must solve an extinction-level mystery.',
    year: 2021,
    pages: 496,
    coverColor: 'from-brand-600 to-cyan-500'
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    category: 'Thriller',
    description: 'A psychotherapist becomes obsessed with uncovering why a famous painter stopped speaking.',
    year: 2019,
    pages: 336,
    coverColor: 'from-emerald-700 to-teal-500'
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Science Fiction',
    description: 'Politics, prophecy, and survival collide on the desert planet Arrakis.',
    year: 1965,
    pages: 688,
    coverColor: 'from-amber-500 to-orange-600'
  }
];

async function main() {
  await prisma.book.deleteMany();
  await prisma.book.createMany({ data: books });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
