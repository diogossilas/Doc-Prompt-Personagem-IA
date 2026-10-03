import React, { useState, useMemo, useEffect } from 'react';
import { SUBSECTIONS_DATA, SubsectionItem } from '../../data/reportData';
import { SubsectionCard } from './SubsectionCard';
import { SubsectionFilterBar } from './SubsectionFilterBar';
import { Cpu } from 'lucide-react';

interface SubsectionsSectionProps {
  playBlip: () => void;
  playConfirmed: () => void;
  isCompactMode: boolean;
  selectedTagExternal?: string | null;
}

export const SubsectionsSection: React.FC<SubsectionsSectionProps> = ({
  playBlip,
  playConfirmed,
  isCompactMode,
  selectedTagExternal,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [phaseFilter, setPhaseFilter] = useState<number | 'all'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedTagExternal) {
      setSearchTerm(selectedTagExternal);
      setPhaseFilter('all');
      const item = SUBSECTIONS_DATA.find((i) => i.tag.toLowerCase() === selectedTagExternal.toLowerCase());
      if (item) {
        setExpandedIds((prev) => ({ ...prev, [item.id]: true }));
        const el = document.getElementById(`sub-${item.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [selectedTagExternal]);

  const toggleExpand = (id: number) => {
    playBlip();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    playConfirmed();
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredItems = useMemo(() => {
    return SUBSECTIONS_DATA.filter((item: SubsectionItem) => {
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.inputVector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.outputVector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paragraphs.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPhase = phaseFilter === 'all' || item.phaseId === phaseFilter;

      return matchesSearch && matchesPhase;
    });
  }, [searchTerm, phaseFilter]);

  return (
    <section id="subsections" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>MÓDULO II</span>
            <span aria-hidden="true">·</span>
            <span>DECOMPOSIÇÃO TEMÁTICA ESTRUTURADA</span>
            <span aria-hidden="true">·</span>
            <span>29 COMPONENTES ANALÍTICOS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-2">
            II. ANÁLISE DETALHADA DAS 29 SUBSEÇÕES DO SISTEMA
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            Cada subseção examina uma faceta essencial da caracterização: desde a identidade e as origens biográficas até os princípios éticos, habilidades de ofício e regras de formatação. A independência entre os blocos garante que o texto final seja coeso, objetivo e fundamentado.
          </p>
        </div>

        {/* Global Injection Ribbon / Order Bar */}
        <div className="border border-slate-800 bg-[#0A0F1A] p-3 sm:p-4 mb-6 text-xs font-mono text-slate-300 overflow-x-auto">
          <div className="flex items-center justify-between text-slate-500 mb-2 pb-1 border-b border-slate-800/80">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              SEQUÊNCIA DE ESTRUTURAÇÃO ANALÍTICA (01 ──&gt; 29)
            </span>
            <span className="tabular-nums">29 COMPONENTES ARTICULADOS</span>
          </div>
          <div className="text-slate-400 whitespace-nowrap text-[11px] leading-relaxed">
            <span className="text-cyan-400 font-bold">1.identity</span> ──&gt; 2.role ──&gt; 3.backstory ──&gt; 4.theater ──&gt; 5.objective ──&gt; 6.motivation ──&gt; 7.flaw ──&gt; 8.skills ──&gt; 9.appearance ──&gt; 10.mannerisms ──&gt; 11.voice ──&gt; 12.beliefs ──&gt; 13.fears ──&gt; 14.secrets ──&gt; 15.relationships ──&gt; 16.internal_conflict ──&gt; 17.external_conflict ──&gt; 18.arc ──&gt; 19.triggers ──&gt; 20.timeline ──&gt; 21.props ──&gt; 22.limitations ──&gt; 23.abilities ──&gt; 24.rules ──&gt; 25.sensory_keys ──&gt; 26.poV ──&gt; 27.scene_sample ──&gt; 28.important_system_limitations ──&gt; <span className="text-cyan-400 font-bold">29.format_hint</span>
          </div>
        </div>

        {/* Modular Filter Component */}
        <SubsectionFilterBar
          phaseFilter={phaseFilter}
          searchTerm={searchTerm}
          onPhaseChange={(p) => setPhaseFilter(p)}
          onSearchChange={(v) => setSearchTerm(v)}
          onClearSearch={() => setSearchTerm('')}
          playBlip={playBlip}
          totalFiltered={filteredItems.length}
        />

        {/* Subsections Cards List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <SubsectionCard
              key={item.id}
              item={item}
              isExpanded={expandedIds[item.id] ?? !isCompactMode}
              copiedId={copiedId}
              onToggleExpand={toggleExpand}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
