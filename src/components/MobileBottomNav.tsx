import React from 'react';
import { APP_PAGES } from './PagePagination';
import { Compass, ListFilter, GitFork, Printer, ShieldCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentPageId: string;
  onPageChange: (pageId: string) => void;
  playBlip: () => void;
}

const PAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  diagram: Compass,
  subsections: ListFilter,
  'flow-matrix': GitFork,
  generator: Printer,
  operational: ShieldCheck,
};

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPageId,
  onPageChange,
  playBlip,
}) => {
  return (
    <nav
      aria-label="Navegação móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070A12]/95 backdrop-blur-md border-t border-slate-800 px-3 py-1 flex items-center justify-around shadow-2xl h-13"
    >
      {APP_PAGES.map((page) => {
        const Icon = PAGE_ICONS[page.id] || Compass;
        const isActive = currentPageId === page.id;

        return (
          <button
            key={page.id}
            onClick={() => {
              playBlip();
              onPageChange(page.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label={`${page.num}. ${page.title}`}
            title={`${page.num}. ${page.title}`}
            className={`relative flex items-center justify-center min-w-[48px] min-h-[44px] p-2 transition-all cursor-pointer rounded-sm ${
              isActive
                ? 'text-cyan-300 bg-cyan-950/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {/* ONLY ICON on Mobile View as requested */}
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
            
            {/* Active glowing indicator dot */}
            {isActive && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
