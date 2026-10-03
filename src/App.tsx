/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TacticalHeader } from './components/TacticalHeader';
import { PageBreadcrumb } from './modules/navigation/PageBreadcrumb';
import { FlowDiagramSection } from './modules/diagram/FlowDiagramSection';
import { SubsectionsSection } from './modules/subsections/SubsectionsSection';
import { FlowMatrixSection } from './modules/flow-matrix/FlowMatrixSection';
import { ReportGeneratorSection } from './modules/report-generator/ReportGeneratorSection';
import { OperationalFlowSection } from './modules/operational-flow/OperationalFlowSection';
import { TacticalFooter } from './components/TacticalFooter';
import { PagePagination } from './components/PagePagination';
import { MobileBottomNav } from './components/MobileBottomNav';
import { APP_PAGES, PageId } from './types/navigation';
import { useTacticalAudio } from './utils/useTacticalAudio';

export default function App() {
  const [currentPageId, setCurrentPageId] = useState<PageId>('diagram');
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const [selectedTagExternal, setSelectedTagExternal] = useState<string | null>(null);

  const {
    audioEnabled,
    toggleAudio,
    playBlip,
    playChirp,
    playConfirmed,
  } = useTacticalAudio();

  // URL Hash synchronization for deep linking and history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPage = APP_PAGES.find((p) => p.id === hash);
      if (validPage) {
        setCurrentPageId(validPage.id);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (pageId: string) => {
    const valid = APP_PAGES.find((p) => p.id === pageId);
    if (valid) {
      setCurrentPageId(valid.id);
      window.location.hash = valid.id;
    }
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTagExternal(tag);
    handlePageChange('subsections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGenerator = () => {
    handlePageChange('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePageIndex = APP_PAGES.findIndex((p) => p.id === currentPageId);
  const activePage = APP_PAGES[activePageIndex] || APP_PAGES[0];

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Module: Top Bar Contract */}
      <TacticalHeader
        activeTab={currentPageId}
        setActiveTab={handlePageChange}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
        playBlip={playBlip}
        isCompactMode={isCompactMode}
        setIsCompactMode={setIsCompactMode}
        onOpenReportModal={handleOpenGenerator}
      />

      {/* Module: Breadcrumb & Brief → Sketch → Studio → Modularization Lifecycle Banner */}
      <PageBreadcrumb
        activePage={activePage}
        currentPageId={currentPageId}
        onPageChange={handlePageChange}
        playBlip={playBlip}
      />

      {/* Main Cohesive Page Modules (Separation of Concerns) */}
      <main className="flex-1 pb-20 md:pb-6">
        {currentPageId === 'diagram' && (
          <FlowDiagramSection
            playBlip={playBlip}
            onSelectTag={handleSelectTag}
          />
        )}

        {currentPageId === 'subsections' && (
          <SubsectionsSection
            playBlip={playBlip}
            playConfirmed={playConfirmed}
            isCompactMode={isCompactMode}
            selectedTagExternal={selectedTagExternal}
          />
        )}

        {currentPageId === 'flow-matrix' && (
          <FlowMatrixSection
            playBlip={playBlip}
            playChirp={playChirp}
            onSelectTag={handleSelectTag}
          />
        )}

        {currentPageId === 'generator' && (
          <ReportGeneratorSection
            playBlip={playBlip}
            playConfirmed={playConfirmed}
            playChirp={playChirp}
          />
        )}

        {currentPageId === 'operational' && (
          <OperationalFlowSection
            playBlip={playBlip}
            playConfirmed={playConfirmed}
          />
        )}

        {/* Module: Bottom Pagination Controls */}
        <PagePagination
          currentPageId={currentPageId}
          onPageChange={handlePageChange}
          playBlip={playBlip}
        />
      </main>

      {/* Module: Footer */}
      <TacticalFooter />

      {/* Module: Mobile-First Thumb Navigation */}
      <MobileBottomNav
        currentPageId={currentPageId}
        onPageChange={handlePageChange}
        playBlip={playBlip}
      />
    </div>
  );
}
