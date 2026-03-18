import { BookOpen, Calendar, Layers3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookCard({ book, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-brand-100/60"
    >
      <div className={`bg-gradient-to-br ${book.coverColor} p-6 text-white`}>
        <div className="mb-10 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {book.category}
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{book.title}</h3>
        <p className="mt-2 text-base text-white/85">by {book.author}</p>
      </div>
      <div className="space-y-4 p-6 text-base text-ink-500">
        <p className="leading-relaxed text-ink-500/80">{book.description}</p>
        <div className="grid gap-3 text-sm text-ink-500/80 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-2xl bg-brand-50 px-3 py-3">
            <Calendar className="h-4 w-4 text-brand-600" />
            <span>{book.year}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-accent-100 px-3 py-3">
            <BookOpen className="h-4 w-4 text-accent-600" />
            <span>{book.pages} pages</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
          <Layers3 className="h-4 w-4" />
          <span>{book.category}</span>
        </div>
      </div>
    </motion.article>
  );
}
