'use client';

interface FilterChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}

export default function FilterChips({ categories, selectedCategory, onSelect }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect('todos')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'todos'
            ? 'bg-[#1F3A5F] text-white'
            : 'bg-[#F7F6F2] text-[#424842] hover:bg-[#E5E2DA] border border-transparent hover:border-[#E5E2DA]'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
            selectedCategory === cat
              ? 'bg-[#1F3A5F] text-white'
              : 'bg-[#F7F6F2] text-[#424842] hover:bg-[#E5E2DA] border border-transparent hover:border-[#E5E2DA]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
