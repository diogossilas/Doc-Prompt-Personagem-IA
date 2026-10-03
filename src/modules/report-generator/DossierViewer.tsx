import React from 'react';
import { FileText, Copy, Check, Download, Printer } from 'lucide-react';

interface DossierViewerProps {
  reportText: string;
  checksum: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

export const DossierViewer: React.FC<DossierViewerProps> = ({
  reportText,
  checksum,
  copied,
  onCopy,
  onDownload,
  onPrint,
}) => {
  return (
    <div className="border border-slate-800 bg-[#070B13] p-4 flex-1 flex flex-col relative corner-crosshairs">
      {/* Dossier Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            VISUALIZAÇÃO DO DOSSIÊ ANALÍTICO (──&gt;)
          </span>
        </div>

        {/* Tactical Actions (Micro-buttons) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onCopy}
            className="px-2.5 py-1.5 min-h-[36px] text-[11px] font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">COPIADO</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>COPIAR</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            className="px-2.5 py-1.5 min-h-[36px] text-[11px] font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>BAIXAR .MD</span>
          </button>

          <button
            onClick={onPrint}
            className="px-2.5 py-1.5 min-h-[36px] text-[11px] font-mono border border-cyan-700 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>IMPRIMIR</span>
          </button>
        </div>
      </div>

      {/* Monospace Tactical Dossier Paper */}
      <div className="bg-[#05080E] border border-slate-900 p-4 sm:p-5 flex-1 font-mono text-[11px] text-slate-300 overflow-y-auto max-h-[640px] leading-relaxed selection:bg-cyan-500/40">
        <div className="text-cyan-400/80 mb-2 border-b border-slate-800/80 pb-2 flex items-center justify-between">
          <span>DOC. ENG-PROMPT LLMS E AGENTES IA</span>
          <span className="text-slate-500">HASH: 0x{checksum}</span>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-slate-300">
          {reportText}
        </pre>
      </div>

      {/* Status bar */}
      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>CONSISTÊNCIA ANALÍTICA VERIFICADA</span>
        <span>DIAGRAMAÇÃO: 29.FORMAT_HINT VALIDADO</span>
      </div>
    </div>
  );
};
