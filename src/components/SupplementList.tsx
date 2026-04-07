'use client';
import { useState, useMemo } from 'react';
import FilterChips from './FilterChips';
import SortSelect from './SortSelect';
import SupplementAffiliateCard, { AmazonSupplement } from './SupplementAffiliateCard';

export default function SupplementList({ initialSupplements }: { initialSupplements: AmazonSupplement[] }) {
  const [filter, setFilter] = useState('todos');
  const [sort, setSort] = useState('relevancia');

  const categories = Array.from(new Set(initialSupplements.flatMap(s => s.goalTags)));

  const filteredItems = useMemo(() => {
    let result = filter === 'todos' 
      ? initialSupplements 
      : initialSupplements.filter(s => s.goalTags.includes(filter));

    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'resenas') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [initialSupplements, filter, sort]);

  return (
    <div>
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
        <FilterChips categories={categories} selectedCategory={filter} onSelect={setFilter} />
        <SortSelect 
          options={[
            { label: 'Relevancia', value: 'relevancia' },
            { label: 'Mejores reviews', value: 'rating' },
            { label: 'Más compras', value: 'resenas' },
          ]}
          selected={sort}
          onChange={setSort}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredItems.map((s) => <SupplementAffiliateCard key={s.asin} supplement={s} />)}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-[#666666]">
          No hay suplementos recomendados para este problema actualmente.
        </div>
      )}
    </div>
  );
}
