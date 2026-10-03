import React, { useState } from 'react';
import { PageItem, APP_PAGES } from '../../types/navigation';
import { LifecyclePipelineBanner } from '../lifecycle/LifecyclePipelineBanner';
import { Shield, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';

interface PageBreadcrumbProps {
  activePage: PageItem;
  currentPageId: string;
  onPageChange: (id: string) => void;
  playBlip: () => void;
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  activePage,
  currentPageId,
  onPageChange,
  playBlip,
}) => {
  const [showLifecycle, setShowLifecycle] = useState<boolean>(true);

  return (
    <section className="border-b border-slate-800/80 bg-gradient-to-b from-[#0B111D] to-[#080C14] px-4 lg:px-8 py-5 sm:py-7 tactical-grid">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5 flex-wrap">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">
                Doc. Eng-Prompt LLMs e Agentes IA
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Análise Estruturada 29-COT</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-300 font-bold">Página {activePage.num} de {APP_PAGES.length}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
              {activePage.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              {activePage.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {/* Toggle Lifecycle methodology button */}
            <button
              onClick={() => {
                playBlip();
                setShowLifecycle((prev) => !prev);
              }}
              className="px-3 py-1.5 text-xs font-mono tracking-wider border border-slate-800 bg-slate-900/60 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 min-h-[36px]"
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              <span>METODOLOGIA ANALÍTICA (──&gt;)</span>
              {showLifecycle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Segmented Page Selector (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 overflow-x-auto max-w-full">
              {APP_PAGES.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    playBlip();
                    onPageChange(page.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 min-h-[32px] ${
                    currentPageId === page.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-75">{page.num}.</span>
                  <span>{page.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collapsible Methodology Lifecycle Banner */}
        {showLifecycle && (
          <LifecyclePipelineBanner playBlip={playBlip} />
        )}
      </div>
    </section>
  );
};
