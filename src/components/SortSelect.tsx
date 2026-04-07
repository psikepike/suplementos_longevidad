'use client';

interface SortSelectProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (val: string) => void;
}

export default function SortSelect({ options, selected, onChange }: SortSelectProps) {
  return (
    <div className="mb-8 flex items-center justify-end">
      <label htmlFor="sort-select" className="text-sm font-medium text-[#666666] mr-3">Ordenar por:</label>
      <select
        id="sort-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-[#E5E2DA] text-[#1F3A5F] text-sm rounded-lg focus:ring-[#6B8F71] focus:border-[#6B8F71] block p-2.5 outline-none cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
