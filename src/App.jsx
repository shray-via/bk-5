import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { BookMarked, LibraryBig, RefreshCcw } from 'lucide-react';
import BookCard from './components/BookCard';

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/books');
      setBooks(response.data.books);
      setCategories(['All', ...response.data.categories]);
    } catch (err) {
      setError('We could not load your shelf. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    if (activeCategory === 'All') return books;
    return books.filter((book) => book.category === activeCategory);
  }, [activeCategory, books]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-accent-100/40 text-ink-700">
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <LibraryBig className="h-4 w-4" />
              Curated shelf · 4 books · 3 categories
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Browse a compact library built for cozy discovery.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Explore four standout reads across fantasy, science fiction, and thriller. Filter by category and find your next page-turner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10">
        <div className="flex flex-col gap-4 rounded-3xl bg-white/90 p-4 shadow-lg shadow-brand-100/50 backdrop-blur sm:p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Categories</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink-700">Pick a shelf mood</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={clsx(
                  'min-h-[44px] rounded-full px-5 py-3 text-base font-medium transition-all active:scale-[0.98]',
                  activeCategory === category
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-200'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 py-8 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-[320px] animate-pulse rounded-3xl bg-white shadow-lg shadow-brand-100/50" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-lg shadow-brand-100/50">
            <BookMarked className="mx-auto h-10 w-10 text-accent-500" />
            <p className="mt-4 text-lg font-semibold text-ink-700">{error}</p>
            <button
              type="button"
              onClick={loadBooks}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <RefreshCcw className="h-4 w-4" />
              Retry
            </button>
          </div>
        ) : (
          <div className="py-8">
            {filteredBooks.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-lg shadow-brand-100/50">
                <BookMarked className="mx-auto h-10 w-10 text-brand-500" />
                <p className="mt-4 text-lg font-semibold text-ink-700">No books in this category yet.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
