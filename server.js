import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({ orderBy: { year: 'desc' } });
    const categories = [...new Set(books.map((book) => book.category))];
    res.json({ books, categories });
  } catch (error) {
    console.error('Failed to fetch books:', error.message);
    res.status(500).json({ error: 'Unable to load books right now.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening');
});
