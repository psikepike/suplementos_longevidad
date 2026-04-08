'use client';
import { useState, useMemo } from 'react';
import FilterChips from './FilterChips';
import SortSelect from './SortSelect';
import SupplementIndexCard from './SupplementIndexCard';

export default function SupplementIndexList({ initialData }: { initialData: any[] }) {
  const [filter, setFilter] = useState('todos');
  const [sort, setSort] = useState('relevancia');

  const categories = Array.from(new Set(initialData.map(s => s.categorySlug)));

  const filteredData = useMemo(() => {
    let result = filter === 'todos' 
      ? initialData 
      : initialData.filter(s => s.categorySlug === filter);

    const evidenceScore: Record<string, number> = { 'Alta': 3, 'Media': 2, 'Baja': 1 };

    if (sort === 'evidencia') {
      result = [...result].sort((a, b) => (evidenceScore[b.evidenceLevel] || 0) - (evidenceScore[a.evidenceLevel] || 0));
    } else if (sort === 'recomendados') {
      result = [...result].sort((a, b) => (b.recommendedAsins?.length || 0) - (a.recommendedAsins?.length || 0));
    }
    
    return result;
  }, [initialData, filter, sort]);

  return (
    <div>
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
        <FilterChips categories={categories} selectedCategory={filter} onSelect={setFilter} />
        <SortSelect 
          options={[
            { label: 'Relevancia editorial', value: 'relevancia' },
            { label: 'Mejor evidencia clínica', value: 'evidencia' },
            { label: 'Más recomendados', value: 'recomendados' },
          ]}
          selected={sort}
          onChange={setSort}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 mb-16">
        {filteredData.map((s) => <SupplementIndexCard key={s.slug} supplement={s} />)}
      </div>
      {filteredData.length === 0 && (
        <div className="text-center py-20 text-[#666666]">
          No hemos encontrado suplementos con este filtro.
        </div>
      )}
    </div>
  );
}
