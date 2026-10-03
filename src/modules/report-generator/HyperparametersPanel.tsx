import React from 'react';
import { Sliders } from 'lucide-react';

interface HyperparametersPanelProps {
  classification: string;
  thinkingLevel: number;
  temperature: number;
  topP: number;
  onClassificationChange: (val: string) => void;
  onThinkingLevelChange: (val: number) => void;
  onTemperatureChange: (val: number) => void;
  playBlip: () => void;
}

export const HyperparametersPanel: React.FC<HyperparametersPanelProps> = ({
  classification,
  thinkingLevel,
  temperature,
  onClassificationChange,
  onThinkingLevelChange,
  onTemperatureChange,
  playBlip,
}) => {
  return (
    <div className="border border-slate-800 bg-[#0B101D]/80 p-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5 uppercase">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          Ajuste de Parâmetros de Redação
        </span>
        <span className="text-[10px] font-mono text-slate-500">MÓDULO EDITORIAL</span>
      </div>

      <div className="space-y-3 text-xs font-mono">
        {/* Classification dropdown */}
        <div>
          <label className="block text-slate-400 mb-1 uppercase text-[11px]">
            Classificação do Documento:
          </label>
          <select
            value={classification}
            onChange={(e) => {
              playBlip();
              onClassificationChange(e.target.value);
            }}
            className="w-full bg-[#080C14] border border-slate-800 text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
          >
            <option value="RELATÓRIO PÚBLICO // ANÁLISE DE PERSONA">RELATÓRIO PÚBLICO // ANÁLISE DE PERSONA</option>
            <option value="DOCUMENTO EDITORIAL // USO TÉCNICO">DOCUMENTO EDITORIAL // USO TÉCNICO</option>
            <option value="DOSSIÊ INVESTIGATIVO // ANÁLISE APROFUNDADA">DOSSIÊ INVESTIGATIVO // ANÁLISE APROFUNDADA</option>
            <option value="RESERVADO // ANÁLISE DE ROTEIRO & NARRATIVA">RESERVADO // ANÁLISE DE ROTEIRO & NARRATIVA</option>
          </select>
        </div>

        {/* Thinking Level */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Profundidade Analítica (Thinking Level):</span>
            <span className="text-cyan-400 font-bold tabular-nums">{thinkingLevel} / 5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={thinkingLevel}
            onChange={(e) => onThinkingLevelChange(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer min-h-[32px]"
          />
        </div>

        {/* Temperature */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Temperatura (Criatividade &amp; Variação):</span>
            <span className="text-cyan-400 font-bold tabular-nums">{temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.8"
            step="0.05"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer min-h-[32px]"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0.0 (Sóbrio / Preciso)</span>
            <span>0.8 (Criativo)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
