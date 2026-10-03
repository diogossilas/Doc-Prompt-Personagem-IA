import React from 'react';
import { Filter, Search } from 'lucide-react';

interface SubsectionFilterBarProps {
  phaseFilter: number | 'all';
  searchTerm: string;
  onPhaseChange: (phase: number | 'all') => void;
  onSearchChange: (val: string) => void;
  onClearSearch: () => void;
  playBlip: () => void;
  totalFiltered: number;
}

export const SubsectionFilterBar: React.FC<SubsectionFilterBarProps> = ({
  phaseFilter,
  searchTerm,
  onPhaseChange,
  onSearchChange,
  onClearSearch,
  playBlip,
  totalFiltered,
}) => {
  return (
    <div className="bg-[#0B101C]/80 border border-slate-800 p-3 sm:p-4 mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Phase Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" />
            Módulo:
          </span>
          <button
            onClick={() => {
              playBlip();
              onPhaseChange('all');
            }}
            className={`px-2.5 py-1 text-xs font-mono tracking-wider transition-colors cursor-pointer min-h-[32px] ${
              phaseFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-semibold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todos (29)
          </button>
          {[1, 2, 3, 4, 5].map((phaseNum) => (
            <button
              key={phaseNum}
              onClick={() => {
                playBlip();
                onPhaseChange(phaseNum);
              }}
              className={`px-2.5 py-1 text-xs font-mono tracking-wider transition-colors cursor-pointer min-h-[32px] ${
                phaseFilter === phaseNum
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Fase {phaseNum}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filtrar por tag, vetor ou termo..."
            className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono pl-9 pr-3 py-1.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors min-h-[36px]"
          />
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-300 p-1"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2.5 pt-2 border-t border-slate-800/60">
        <span>EXIBINDO: <strong className="text-cyan-400">{totalFiltered}</strong> DE 29 NÓS MODULARES</span>
        <span>SEPARATION OF CONCERNS: VETORES ISOLADOS</span>
      </div>
    </div>
  );
};
