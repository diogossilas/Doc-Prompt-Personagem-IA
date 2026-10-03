import React, { useState } from 'react';
import { Zap, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { ScenarioSimulation } from '../../types/report';

export const SCENARIOS: ScenarioSimulation[] = [
  {
    id: 'trigger_override',
    name: 'Cenário 1: Impacto de Gatilho Traumático (Triggers ──> Resposta Controlada)',
    stimulus: 'O interlocutor utiliza a expressão sensível "danos colaterais calculados" durante a entrevista.',
    flowChain: [
      { node: 'triggers', flowOperator: '──>', description: 'Identificação imediata da expressão crítica no texto de entrada', state: 'active' },
      { node: 'voice', flowOperator: '──> [Contenção]', description: 'Suspensão da cadência oratória habitual e adoção de tom econômico', state: 'inhibited' },
      { node: 'mannerisms', flowOperator: '──>', description: 'Manifestação de reação física reflexa (rotação contínua da arruela de titânio)', state: 'active' },
      { node: 'objective', flowOperator: '──', description: 'O objetivo final se mantém firme, priorizando a proteção dos dados essenciais', state: 'enforced' },
      { node: 'scene_sample', flowOperator: '──>', description: 'Pausa reflexiva de cinco segundos seguida de resposta sucinta e rigorosa', state: 'active' },
    ],
    terminalOutput: 'A estabilidade da análise é preservada: o analista interrompe a concessão de detalhes e exige alinhamento conceitual prévio antes de avançar.'
  },
  {
    id: 'deontological_veto',
    name: 'Cenário 2: Conflito Ético e Princípios Deontológicos (Beliefs ──> Flaw ──> Objective)',
    stimulus: 'Ordem superior solicita envio imediato de dados criptográficos com alto risco de impacto civil.',
    flowChain: [
      { node: 'rules', flowOperator: '──>', description: 'Consulta direta às normas institucionais e aos tratados vigentes', state: 'active' },
      { node: 'internal_conflict', flowOperator: '──>', description: 'Dilema entre a obrigação de hierarquia e o princípio de proteção a não-combatentes', state: 'active' },
      { node: 'flaw', flowOperator: '──>', description: 'A desconfiança metódica em relação a relatos não verificados intensifica a cautela', state: 'active' },
      { node: 'objective', flowOperator: '──> [Pausa Crítica]', description: 'Interrupção temporária do envio de dados até que a verificação ética seja concluída', state: 'inhibited' },
      { node: 'format_hint', flowOperator: '──>', description: 'Estruturação do parecer técnico com fundamentação jurídica clara e evidências auditáveis', state: 'enforced' },
    ],
    terminalOutput: 'Publicação de relatório de avaliação fundamentado em diretrizes éticas e documentação técnica verificável.'
  },
  {
    id: 'limitations_enforcement',
    name: 'Cenário 3: Respeito a Limites Físicos e Reais (Limitations ──> Consistência Analítica)',
    stimulus: 'Solicitação para processar descriptografia quântica sem conexão com o dispositivo ótico dedicado.',
    flowChain: [
      { node: 'limitations', flowOperator: '──> [Filtro Realista]', description: 'Identificação da barreira material: impossibilidade física confirmada', state: 'inhibited' },
      { node: 'important_system_limitations', flowOperator: '──> [Filtro Editorial]', description: 'Eliminação de clichês evasivos e respostas automatizadas sem substância', state: 'inhibited' },
      { node: 'skills', flowOperator: '──>', description: 'Apresentação de explicação técnica e objetiva sobre o gargalo de infraestrutura', state: 'active' },
      { node: 'theater', flowOperator: '──', description: 'Preservação da coerência com a estrutura física e as limitações do ambiente', state: 'enforced' },
      { node: 'voice', flowOperator: '──>', description: 'Comunicação sóbria e transparente do impedimento operacional sem desculpas protocolares', state: 'active' },
    ],
    terminalOutput: 'O analista relata objetivamente a restrição material e explica a necessidade do equipamento adequado, mantendo total rigor técnico.'
  }
];

interface ScenarioSimulatorProps {
  playBlip: () => void;
  playChirp: () => void;
  onSelectTag: (tag: string) => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  playBlip,
  playChirp,
  onSelectTag,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('trigger_override');
  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    playChirp();
    setActiveScenarioId(id);
  };

  return (
    <div className="border border-slate-800 bg-[#090E18] p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>SIMULADOR DE COLISÃO DE VETORES COGNITIVOS</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold font-display text-white">
            Resolução de Conflitos em Tempo de Execução
          </h3>
        </div>

        {/* Scenario buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SCENARIOS.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => handleScenarioChange(scen.id)}
              className={`px-3 py-1.5 min-h-[36px] text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                activeScenarioId === scen.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Cenário 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stimulus display */}
      <div className="p-3 bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 mb-4 flex items-start gap-2">
        <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-amber-400 font-bold uppercase mr-1">ESTÍMULO EXTERNO DISPARADO:</span>
          <span>{activeScenario.stimulus}</span>
        </div>
      </div>

      <div className="text-xs font-mono text-slate-400 mb-2 uppercase">
        CADEIA DE ENCADEAMENTO ANALÍTICO:
      </div>

      {/* Step by step flow chain */}
      <div className="space-y-2.5 mb-5">
        {activeScenario.flowChain.map((step, idx) => {
          const isFilter = step.flowOperator.includes('Filtro') || step.flowOperator.includes('Contenção') || step.flowOperator.includes('Pausa');
          const isArrow = step.flowOperator === '──>';

          return (
            <div
              key={idx}
              className="p-3 border border-slate-800/80 bg-[#0B101D] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-slate-500 tabular-nums">0{idx + 1}.</span>
                <button
                  onClick={() => {
                    playBlip();
                    onSelectTag(step.node);
                  }}
                  className="px-2 py-0.5 bg-slate-900 border border-cyan-900/60 text-cyan-300 font-semibold hover:border-cyan-400 transition-colors cursor-pointer"
                >
                  &lt;{step.node}&gt;
                </button>
                <span
                  className={`px-1.5 py-0.5 font-bold ${
                    isArrow
                      ? 'text-cyan-400'
                      : isFilter
                      ? 'text-amber-400'
                      : 'text-blue-400'
                  }`}
                >
                  {step.flowOperator}
                </span>
                <span className="text-slate-300">
                  {step.description}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono border ${
                    step.state === 'active'
                      ? 'border-cyan-800 bg-cyan-950/40 text-cyan-300'
                      : step.state === 'inhibited'
                      ? 'border-amber-800 bg-amber-950/40 text-amber-300'
                      : 'border-blue-800 bg-blue-950/40 text-blue-300'
                  }`}
                >
                  {step.state === 'active' ? 'ESTADO: ATIVO' : step.state === 'inhibited' ? 'ESTADO: EM CONTENÇÃO' : 'ESTADO: REFORÇADO'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Result */}
      <div className="p-3.5 sm:p-4 bg-[#05080E] border border-cyan-950/80 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 font-bold">
            SAÍDA RESULTANTE (ESTABILIDADE COMPORTAMENTAL GARANTIDA)
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {activeScenario.terminalOutput}
          </p>
        </div>
      </div>
    </div>
  );
};
