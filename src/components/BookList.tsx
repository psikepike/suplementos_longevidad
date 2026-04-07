'use client';
import { useState, useMemo } from 'react';
import FilterChips from './FilterChips';
import SortSelect from './SortSelect';
import BookCard, { Book } from './BookCard';

export default function BookList({ initialBooks }: { initialBooks: Book[] }) {
  const [filter, setFilter] = useState('todos');
  const [sort, setSort] = useState('relevancia');

  const categories = Array.from(new Set(initialBooks.flatMap(b => b.tags)));

  const filteredBooks = useMemo(() => {
    let result = filter === 'todos' 
      ? initialBooks 
      : initialBooks.filter(b => b.tags.includes(filter));

    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'resenas') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [initialBooks, filter, sort]);

  return (
    <div>
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
        <FilterChips categories={categories} selectedCategory={filter} onSelect={setFilter} />
        <SortSelect 
          options={[
            { label: 'Criterio editorial', value: 'relevancia' },
            { label: 'Mejor valorados', value: 'rating' },
            { label: 'Más reseñas globales', value: 'resenas' },
          ]}
          selected={sort}
          onChange={setSort}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 mb-16">
        {filteredBooks.map((b) => <BookCard key={b.asin} book={b} />)}
      </div>
      {filteredBooks.length === 0 && (
        <div className="text-center py-20 text-[#666666]">
          No hemos encontrado libros con este filtro.
        </div>
      )}
    </div>
  );
}
