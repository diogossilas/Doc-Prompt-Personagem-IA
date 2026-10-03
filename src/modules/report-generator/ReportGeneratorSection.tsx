import React, { useState, useMemo } from 'react';
import { PERSONA_PRESETS, PersonaPreset } from '../../data/reportData';
import { HyperparametersPanel } from './HyperparametersPanel';
import { VectorFormEditor } from './VectorFormEditor';
import { DossierViewer } from './DossierViewer';
import { computeVectorChecksum, compileReportDocument, downloadMarkdownReport, ReportPayload } from '../../services/reportExportService';
import { Shield } from 'lucide-react';

interface ReportGeneratorSectionProps {
  playBlip: () => void;
  playConfirmed: () => void;
  playChirp: () => void;
}

export const ReportGeneratorSection: React.FC<ReportGeneratorSectionProps> = ({
  playBlip,
  playConfirmed,
  playChirp,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('crypto_analyst');
  const [classification, setClassification] = useState<string>('SECRETO // PROTOCOLO 29-COT MILITAR');
  const [thinkingLevel, setThinkingLevel] = useState<number>(3);
  const [temperature, setTemperature] = useState<number>(0.2);
  const [topP] = useState<number>(0.85);

  const activePreset = PERSONA_PRESETS.find((p) => p.id === selectedPresetId) || PERSONA_PRESETS[0];

  const [formData, setFormData] = useState<Record<string, string>>({
    name: activePreset.name,
    designation: activePreset.designation,
    role: activePreset.role,
    theater: activePreset.theater,
    objective: activePreset.objective,
    identity: activePreset.tagsSummary.identity || '',
    backstory: activePreset.tagsSummary.backstory || '',
    flaw: activePreset.tagsSummary.flaw || '',
    voice: activePreset.tagsSummary.voice || '',
    triggers: activePreset.tagsSummary.triggers || '',
    limitations: activePreset.tagsSummary.limitations || '',
    format_hint: activePreset.tagsSummary.format_hint || '',
  });

  const [copied, setCopied] = useState<boolean>(false);

  const handlePresetSelect = (preset: PersonaPreset) => {
    playChirp();
    setSelectedPresetId(preset.id);
    setFormData({
      name: preset.name,
      designation: preset.designation,
      role: preset.role,
      theater: preset.theater,
      objective: preset.objective,
      identity: preset.tagsSummary.identity || '',
      backstory: preset.tagsSummary.backstory || '',
      flaw: preset.tagsSummary.flaw || '',
      voice: preset.tagsSummary.voice || '',
      triggers: preset.tagsSummary.triggers || '',
      limitations: preset.tagsSummary.limitations || '',
      format_hint: preset.tagsSummary.format_hint || '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const payload: ReportPayload = useMemo(() => ({
    name: formData.name,
    designation: formData.designation,
    role: formData.role,
    theater: formData.theater,
    objective: formData.objective,
    identity: formData.identity,
    backstory: formData.backstory,
    flaw: formData.flaw,
    voice: formData.voice,
    triggers: formData.triggers,
    limitations: formData.limitations,
    format_hint: formData.format_hint,
    classification,
    thinkingLevel,
    temperature,
    topP,
  }), [formData, classification, thinkingLevel, temperature, topP]);

  const checksum = useMemo(() => computeVectorChecksum(payload), [payload]);
  const generatedReportText = useMemo(() => compileReportDocument(payload, checksum), [payload, checksum]);

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generatedReportText);
    playConfirmed();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    playConfirmed();
    const filename = `Doc_Eng-Prompt_LLMs_${formData.name.replace(/\s+/g, '_')}_${checksum}.md`;
    downloadMarkdownReport(generatedReportText, filename);
  };

  const handlePrint = () => {
    playConfirmed();
    window.print();
  };

  return (
    <section id="generator" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#06090F] tactical-grid">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>MÓDULO IV</span>
            <span aria-hidden="true">·</span>
            <span>SÍNTESE INFORMATIVA ESTRUTURADA</span>
            <span aria-hidden="true">·</span>
            <span>EMISSÃO DE DOSSIÊ EDITORIAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-2">
            IV. GERADOR DE DOSSIÊ &amp; RELATÓRIO ANALÍTICO
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            Personalize os parâmetros de redação, ajuste o nível de reflexão e gere dossiês analíticos completos, prontos para integração em instruções de sistema ou para leitura e impressão em formato editorial claro e elegante.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="border border-slate-800 bg-[#0B101D] p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Shield className="w-3.5 h-3.5" />
              SELECIONE UM PERFIL DISPONÍVEL OU EDITE AS VARIÁVEIS ANALÍTICAS:
            </span>
            <span className="text-xs font-mono text-slate-500">
              HASH DO DOSSIÊ: <strong className="text-cyan-300">0x{checksum}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PERSONA_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold font-display uppercase tracking-wide text-slate-100 mb-1">
                    {preset.name}
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400/90 truncate mb-1">
                    {preset.designation}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">
                    {preset.role}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Modular Split: Parameters & Vectors (Left) vs Dossier Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Hyperparameters & Vector Inputs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <HyperparametersPanel
              classification={classification}
              thinkingLevel={thinkingLevel}
              temperature={temperature}
              topP={topP}
              onClassificationChange={setClassification}
              onThinkingLevelChange={setThinkingLevel}
              onTemperatureChange={setTemperature}
              playBlip={playBlip}
            />

            <VectorFormEditor
              formData={formData}
              onInputChange={handleInputChange}
              onReset={() => handlePresetSelect(activePreset)}
            />
          </div>

          {/* Right Column: Dossier Viewer & Exporter (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <DossierViewer
              reportText={generatedReportText}
              checksum={checksum}
              copied={copied}
              onCopy={handleCopyReport}
              onDownload={handleDownloadMarkdown}
              onPrint={handlePrint}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
