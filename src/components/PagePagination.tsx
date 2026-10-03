import React from 'react';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export interface PageItem {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
  desc: string;
}

export const APP_PAGES: PageItem[] = [
  { id: 'diagram', num: 1, title: 'I. Diagrama Geral de Encadeamento da Informação', shortTitle: 'Diagrama Geral', desc: 'Progressão em cinco fases contínuas e alinhamento de premissas (──>)' },
  { id: 'subsections', num: 2, title: 'II. Análise Detalhada das 29 Subseções', shortTitle: '29 Subseções', desc: 'Guia analítico de 1.identity a 29.format_hint (──>)' },
  { id: 'flow-matrix', num: 3, title: 'III. Matriz de Encadeamento e Relações (──>)', shortTitle: 'Matriz de Encadeamento', desc: 'Relações de causa e efeito (──>) e simulação analítica' },
  { id: 'generator', num: 4, title: 'IV. Gerador de Dossiê & Relatório Analítico', shortTitle: 'Gerador de Dossiê', desc: 'Síntese informativa estruturada e emissão editorial' },
  { id: 'operational', num: 5, title: 'V. Metodologia de Produção & Verificação de Coerência', shortTitle: 'Verificação de Coerência', desc: 'Etapas de validação e critérios de estabilidade' },
];

interface PagePaginationProps {
  currentPageId: string;
  onPageChange: (pageId: string) => void;
  playBlip: () => void;
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPageId,
  onPageChange,
  playBlip,
}) => {
  const currentIndex = APP_PAGES.findIndex((p) => p.id === currentPageId);
  const prevPage = currentIndex > 0 ? APP_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < APP_PAGES.length - 1 ? APP_PAGES[currentIndex + 1] : null;
  const currentPage = APP_PAGES[currentIndex] || APP_PAGES[0];

  const handleNav = (targetId: string) => {
    playBlip();
    onPageChange(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="border-t border-slate-800/80 bg-[#070A11] px-4 lg:px-8 py-6 corner-crosshairs">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Previous page button */}
        <div className="w-full md:w-auto">
          {prevPage ? (
            <button
              onClick={() => handleNav(prevPage.id)}
              className="w-full md:w-auto px-4 py-2 text-xs font-mono tracking-wider border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors flex items-center justify-center md:justify-start gap-2 cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase">PÁGINA ANTERIOR</div>
                <div className="font-semibold text-slate-200">{prevPage.shortTitle}</div>
              </div>
            </button>
          ) : (
            <div className="hidden md:block w-36" />
          )}
        </div>

        {/* Center Page Selector & Indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {APP_PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleNav(p.id)}
                title={`${p.num}. ${p.shortTitle}`}
                className={`h-2 transition-all cursor-pointer ${
                  p.id === currentPageId
                    ? 'w-8 bg-cyan-400'
                    : 'w-3 bg-slate-800 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PÁGINA {currentPage.num} DE {APP_PAGES.length}:</span>
            <strong className="text-slate-200">{currentPage.shortTitle}</strong>
          </div>
        </div>

        {/* Next page button */}
        <div className="w-full md:w-auto flex justify-end">
          {nextPage ? (
            <button
              onClick={() => handleNav(nextPage.id)}
              className="w-full md:w-auto px-4 py-2 text-xs font-mono tracking-wider border border-cyan-800 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 transition-colors flex items-center justify-center md:justify-end gap-2 cursor-pointer min-h-[44px]"
            >
              <div className="text-right">
                <div className="text-[10px] text-cyan-400 uppercase">PRÓXIMA PÁGINA</div>
                <div className="font-semibold text-white">{nextPage.shortTitle}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => handleNav(APP_PAGES[0].id)}
              className="w-full md:w-auto px-4 py-2 text-xs font-mono tracking-wider border border-slate-800 bg-slate-900/60 hover:border-cyan-500 text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>RETORNAR AO INÍCIO</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
